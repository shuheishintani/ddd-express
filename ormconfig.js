module.exports = {
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "postgres",
  ssl: process.env.NODE_ENV === "development" ? false : true,
  extra:
    process.env.NODE_ENV === "development"
      ? null
      : {
          ssl: {
            rejectUnauthorized: false,
          },
        },
  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.{js,ts}"],
  migrations: ["src/migrations/*.{js,ts}"],
  subscribers: ["src/subscribers/**/*.{js,ts}"],
};
