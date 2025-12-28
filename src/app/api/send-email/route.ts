import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import xss from 'xss';
import { rateLimit, RateLimitConfig } from '@/lib/ratelimit';

// Lazy-load Resend client to avoid build-time errors
function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: Prevent email spam
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'anonymous';
    const { success, remaining } = await rateLimit(
      `email:${ip}`,
      RateLimitConfig.EMAIL.limit,
      RateLimitConfig.EMAIL.windowMs
    );

    if (!success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many email requests. Please try again in a minute.',
          retryAfter: 60
        },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Remaining': '0'
          }
        }
      );
    }

    const { email, motivation } = await req.json();

    // Validate input
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (!motivation) {
      return NextResponse.json(
        { error: 'No motivation content to send' },
        { status: 400 }
      );
    }

    // Validate that motivation.parsed exists
    if (!motivation.parsed) {
      return NextResponse.json(
        { error: 'Invalid motivation content: missing parsed property' },
        { status: 400 }
      );
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured - email not sent');
      return NextResponse.json(
        {
          error: 'Email service not configured. Please add RESEND_API_KEY to your .env file.',
          details: 'Get your API key from https://resend.com/api-keys'
        },
        { status: 503 }
      );
    }

    // Sanitize all user-generated content to prevent XSS attacks
    // Using xss library with strict options (no HTML tags allowed)
    const xssOptions = {
      whiteList: {}, // No HTML tags allowed
      stripIgnoreTag: true,
      stripIgnoreTagBody: ['script', 'style']
    };

    const sanitizedQuote = motivation.parsed.quote
      ? xss(motivation.parsed.quote, xssOptions)
      : '';
    const sanitizedMovieScene = motivation.parsed.movieScene
      ? xss(motivation.parsed.movieScene, xssOptions)
      : '';
    const sanitizedDeepMeaning = motivation.parsed.deepMeaning
      ? xss(motivation.parsed.deepMeaning, xssOptions)
      : '';
    const sanitizedActionablePath = motivation.parsed.actionablePath
      ? xss(motivation.parsed.actionablePath, xssOptions)
      : '';
    const sanitizedAffirmation = motivation.parsed.affirmation
      ? xss(motivation.parsed.affirmation, xssOptions)
      : '';

    // Send email using Resend
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'My Brain doctor <onboarding@resend.dev>',
      to: email,
      subject: 'Your Personalized Motivation from My Brain doctor',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .section { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; border-left: 4px solid #059669; }
              .section-title { font-size: 18px; font-weight: bold; color: #059669; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
              .section-content { color: #4b5563; }
              .quote { font-style: italic; color: #6b7280; }
              .affirmation { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: bold; margin-top: 20px; }
              .footer { text-align: center; margin-top: 30px; color: #9ca3af; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>✨ Your Personalized Motivation</h1>
              <p>Powered by Movie Wisdom</p>
            </div>
            <div class="content">
              ${sanitizedQuote ? `
                <div class="section">
                  <div class="section-title"><span>💬</span> Inspiring Quote</div>
                  <div class="section-content quote">${sanitizedQuote}</div>
                </div>
              ` : ''}

              ${sanitizedMovieScene ? `
                <div class="section">
                  <div class="section-title"><span>🎬</span> Movie Scene</div>
                  <div class="section-content">${sanitizedMovieScene}</div>
                </div>
              ` : ''}

              ${sanitizedDeepMeaning ? `
                <div class="section">
                  <div class="section-title"><span>💡</span> Deep Meaning</div>
                  <div class="section-content">${sanitizedDeepMeaning}</div>
                </div>
              ` : ''}

              ${sanitizedActionablePath ? `
                <div class="section">
                  <div class="section-title"><span>✨</span> Actionable Path</div>
                  <div class="section-content">${sanitizedActionablePath}</div>
                </div>
              ` : ''}

              ${sanitizedAffirmation ? `
                <div class="affirmation">
                  🌟 ${sanitizedAffirmation}
                </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>Sent from My Brain doctor - Your AI-powered motivational companion</p>
              <p>Keep this motivation handy whenever you need a boost!</p>
            </div>
          </body>
        </html>
      `
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      message: `Motivation sent to ${email}!`
    });

  } catch (error: any) {
    console.error('Send email error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
