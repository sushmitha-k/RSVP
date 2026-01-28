import pg from "pg";
import env from "dotenv";

env.config();

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});
db.connect();

db.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export const query = (text, params) => db.query(text, params);
