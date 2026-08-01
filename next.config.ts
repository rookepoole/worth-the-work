import type { NextConfig } from "next";

const isGitHubPages = process.env.BUILD_TARGET === "github-pages";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/worth-the-work" : undefined,
  trailingSlash: isGitHubPages,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
