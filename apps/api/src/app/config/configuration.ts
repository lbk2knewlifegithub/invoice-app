export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    // host: process.env.DATABASE_HOST,
    // port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    url: parseInt(process.env.DATABASE_URL, 10) || 27017,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
