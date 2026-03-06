/** @type {import('next').NextConfig} */
const repoName = "mcp-servers"; // change this to match your GitHub repo name
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  reactCompiler: true,
  output: "export",
  // When hosted at https://username.github.io/mcp-servers/
  // set basePath and assetPrefix to the repo name.
  // Remove these two lines if using a custom domain or deploying to the root.
  basePath: isGithubActions ? `/${repoName}` : "",
  assetPrefix: isGithubActions ? `/${repoName}/` : "",
  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;
