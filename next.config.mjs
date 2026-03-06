/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "mcp-servers"; // change this to match your GitHub repo name

const nextConfig = {
  reactCompiler: true,
  output: "export",
  // When hosted at https://username.github.io/mcp-servers/
  // set basePath and assetPrefix to the repo name.
  // Remove these two lines if using a custom domain or deploying to the root.
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;
