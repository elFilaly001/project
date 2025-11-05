import NextAuth from "next-auth";
// ...existing code...

// If you have an auth options file, import it. Adjust path if needed.
// import authOptions from "@/lib/auth/options";

// Export dynamic mode so this route is treated as dynamic (helps when not using static export)
export const dynamic = "force-dynamic";

// When building with output: "export", Next requires generateStaticParams for dynamic routes.
// Return an empty array (no pre-rendered params) to satisfy the requirement.
export async function generateStaticParams() {
    return [];
}

// Default NextAuth handler. Replace or adapt to your authOptions / setup.
export default async function handler(req: Request) {
    // If you use NextAuth with the App Router, prefer the NextAuth exported handler:
    // return await NextAuth(req as any, authOptions);

    // Fallback: respond with a 404 so static export doesn't break the build — replace with real handler if available.
    return new Response("Not implemented", { status: 404 });
}