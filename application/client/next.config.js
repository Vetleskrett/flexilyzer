/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  async redirects() {
    return [
      {
        source: "/courses/:course_id/assignments/:assignment_id",
        destination: "/courses/:course_id/assignments/:assignment_id/team-1", 
        permanent: true,
      },
    ];
  },
};
