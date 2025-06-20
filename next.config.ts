// next.config.ts
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // This is required so middleware works for app routes:
  matcher: ['/admin/:path*']
}

export default nextConfig
