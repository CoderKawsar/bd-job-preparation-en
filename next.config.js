/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ibb.co", "tecdn.b-cdn.net", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// module.exports = {
//   // output: "export",
//   experimental: {
//     reactMode: "concurrent",
//     clientComponents: true,
//   },
//   images: {
//     domains: ["i.ibb.co", "tecdn.b-cdn.net", "res.cloudinary.com"],
//   },
// };
