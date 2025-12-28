import { NextRequest, NextResponse } from 'next/server';
import { generateMotivationalResponse } from '@/lib/ai/ultraDeepMode';
import { parseAIResponse, validateResponse } from '@/lib/ai/validator';
import { prisma } from '@/lib/prisma';
import { rateLimit, RateLimitConfig } from '@/lib/ratelimit';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: Prevent API abuse and excessive OpenAI costs
    const ip = req.ip ?? req.headers.get('x-forwarded-for') ?? 'anonymous';
    const { success, remaining } = await rateLimit(
      `motivate:${ip}`,
      RateLimitConfig.MOTIVATE.limit,
      RateLimitConfig.MOTIVATE.windowMs
    );

    if (!success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again in a minute.',
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

    const { situation, userId } = await req.json();

    // Validate input
    if (!situation || situation.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a detailed situation (at least 10 characters)' },
        { status: 400 }
      );
    }

    // Validate maximum length to prevent abuse
    if (situation.length > 5000) {
      return NextResponse.json(
        { error: 'Situation is too long (maximum 5000 characters)' },
        { status: 400 }
      );
    }

    // For now, we'll skip user authentication and just generate a response
    // In production, you'd verify the userId from the session

    // Get user history if userId is provided
    let userHistory: any[] = [];
    if (userId) {
      const sessions = await prisma.session.findMany({
        where: { userId },
        take: 5,
        orderBy: { createdAt: 'desc' }
      });
      userHistory = sessions;
    }

    // Generate AI response
    const { response, sentiment } = await generateMotivationalResponse(
      situation,
      userHistory
    );

    // Parse and validate
    const parsed = parseAIResponse(response);
    const validationScore = validateResponse(response, situation);

    // Save to database if userId is provided
    let savedSession = null;
    if (userId) {
      savedSession = await prisma.session.create({
        data: {
          userId,
          situation,
          sentiment,
          aiResponse: response,
          movieScene: parsed.movieScene,
          quote: parsed.quote,
          deepMeaning: parsed.deepMeaning,
          actionablePath: parsed.actionablePath,
          affirmation: parsed.affirmation,
          validationScore
        }
      });
    }

    return NextResponse.json({
      id: savedSession?.id,
      response,
      sentiment,
      parsed,
      validationScore,
      success: true
    });

  } catch (error: any) {
    console.error('Motivation API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate motivation',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Test endpoint to verify AI is working
export async function GET() {
  return NextResponse.json({
    status: 'AI Core is ready',
    endpoints: {
      POST: '/api/motivate - Generate motivational response'
    },
    example: {
      situation: "I just got rejected from my dream job for the third time. I'm starting to think I'm not good enough."
    }
  });
}
