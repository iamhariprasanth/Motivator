import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";

// Note: authOptions moved to @/lib/auth-options to fix Next.js build error
// The authOptions configuration is now imported from lib/auth-options.ts

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

