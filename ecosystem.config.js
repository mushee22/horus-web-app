module.exports = {
  apps: [
    {
      name: "nextjs-app",
      script: "yarn",
      args: "start",
      cwd: "/home/ubuntu/horus-web-app",
      env: {
        PORT: 3000,
        NODE_ENV: "production",
      },
    },
  ],
};