export const environment = {
  production: false,
  DATABASE_URL: "mongodb://localhost:27017/countries",
  jwt: {
    secret: "banana",
    expiresIn: "3600",
  },
};
