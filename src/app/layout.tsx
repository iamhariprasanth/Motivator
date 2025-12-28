import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Brain Doctor - AI Motivational Coach | Mental Health Support & Inspiration",
  description: "Get personalized AI-powered motivational coaching through powerful movie scenes. Mental health support, life coaching, depression help, anxiety relief, and career guidance. Your struggle is your strength.",
  keywords: [
    // Core Services
    "motivational coach", "AI life coach", "mental health support", "online therapy alternative",
    "depression help", "anxiety relief", "stress management", "emotional support",

    // AI & Technology
    "AI therapist", "AI counselor", "GPT-4 coaching", "artificial intelligence therapy",
    "ChatGPT therapy", "AI mental health", "virtual therapist", "online counseling",

    // Mental Health
    "mental wellness", "emotional wellbeing", "mental health app", "self-help app",
    "mindfulness app", "meditation guidance", "positive psychology", "cognitive therapy",

    // Life Coaching
    "life coach online", "personal development", "self improvement", "goal setting",
    "confidence building", "motivation quotes", "inspirational guidance", "life advice",

    // Career & Success
    "career counseling", "job rejection support", "interview anxiety", "imposter syndrome",
    "career change guidance", "professional development", "workplace stress", "burnout recovery",

    // Relationships
    "relationship advice", "breakup support", "dating confidence", "social anxiety help",
    "communication skills", "emotional intelligence", "conflict resolution",

    // Movie & Entertainment
    "movie therapy", "cinematic wisdom", "motivational movies", "inspirational film quotes",
    "movie scene analysis", "film psychology", "storytelling therapy",

    // Specific Issues
    "overcoming fear", "dealing with failure", "self-doubt help", "procrastination cure",
    "decision making help", "finding purpose", "life transition support", "grief counseling",

    // Features
    "personalized motivation", "daily affirmations", "actionable advice", "mental health coach",
    "free therapy alternative", "24/7 support", "anonymous counseling", "private therapy"
  ],
  authors: [{ name: "My Brain Doctor Team" }],
  creator: "My Brain Doctor",
  publisher: "My Brain Doctor",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mybraindoctor.com",
    title: "My Brain Doctor - AI Motivational Coach & Mental Health Support",
    description: "Transform your struggles into strength with AI-powered motivational coaching through powerful movie scenes. Get personalized mental health support, life coaching, and emotional guidance.",
    siteName: "My Brain Doctor",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "My Brain Doctor - AI Motivational Coaching"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "My Brain Doctor - AI Motivational Coach",
    description: "Get personalized AI coaching through powerful movie scenes. Mental health support, life guidance, and emotional wellness.",
    images: ["/og-image.png"]
  },
  alternates: {
    canonical: "https://mybraindoctor.com"
  },
  category: "Health & Wellness"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#059669" />
        <link rel="canonical" href="https://mybraindoctor.com" />

        {/* Structured Data for Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "My Brain Doctor",
              "url": "https://mybraindoctor.com",
              "description": "AI-powered motivational coaching using powerful movie scenes for mental health support and life guidance",
              "applicationCategory": "HealthApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              },
              "creator": {
                "@type": "Organization",
                "name": "My Brain Doctor",
                "url": "https://mybraindoctor.com"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
