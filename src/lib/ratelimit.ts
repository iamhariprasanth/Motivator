/**
 * Rate Limiting Configuration
 *
 * Note: For production, use Upstash Redis for distributed rate limiting
 * For development, we use a simple in-memory store
 */

// Simple in-memory rate limiter for development
class InMemoryRateLimiter {
  private requests: Map<string, number[]> = new Map();

  async limit(identifier: string, limit: number, windowMs: number): Promise<{ success: boolean; remaining: number }> {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get existing requests for this identifier
    const userRequests = this.requests.get(identifier) || [];

    // Filter out requests outside the current window
    const recentRequests = userRequests.filter(timestamp => timestamp > windowStart);

    // Check if limit exceeded
    if (recentRequests.length >= limit) {
      this.requests.set(identifier, recentRequests);
      return {
        success: false,
        remaining: 0
      };
    }

    // Add current request
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);

    return {
      success: true,
      remaining: limit - recentRequests.length
    };
  }

  // Clean up old entries periodically (called manually in development)
  cleanup() {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    for (const [identifier, timestamps] of this.requests.entries()) {
      const recent = timestamps.filter(t => t > oneHourAgo);
      if (recent.length === 0) {
        this.requests.delete(identifier);
      } else {
        this.requests.set(identifier, recent);
      }
    }
  }
}

// Singleton instance
const rateLimiter = new InMemoryRateLimiter();

// Cleanup every hour
if (typeof window === 'undefined') {
  setInterval(() => {
    rateLimiter.cleanup();
  }, 60 * 60 * 1000);
}

/**
 * Rate limit helper for API routes
 *
 * @param identifier - Unique identifier (IP address or user ID)
 * @param limit - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns Object with success status and remaining requests
 *
 * @example
 * const { success, remaining } = await rateLimit(ip, 10, 60000); // 10 req/min
 * if (!success) {
 *   return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
 * }
 */
export async function rateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): Promise<{ success: boolean; remaining: number }> {
  // In production, you would use Upstash Redis here:
  // import { Ratelimit } from "@upstash/ratelimit";
  // import { Redis } from "@upstash/redis";
  //
  // const ratelimit = new Ratelimit({
  //   redis: Redis.fromEnv(),
  //   limiter: Ratelimit.slidingWindow(limit, `${windowMs}ms`),
  // });
  //
  // return await ratelimit.limit(identifier);

  return rateLimiter.limit(identifier, limit, windowMs);
}

/**
 * Common rate limit configurations
 */
export const RateLimitConfig = {
  // AI generation endpoint (expensive)
  MOTIVATE: { limit: 10, windowMs: 60 * 1000 }, // 10 requests per minute

  // Email sending (prevent spam)
  EMAIL: { limit: 5, windowMs: 60 * 1000 }, // 5 emails per minute

  // Authentication endpoints
  AUTH: { limit: 5, windowMs: 15 * 60 * 1000 }, // 5 attempts per 15 minutes

  // General API endpoints
  API: { limit: 30, windowMs: 60 * 1000 }, // 30 requests per minute
};
