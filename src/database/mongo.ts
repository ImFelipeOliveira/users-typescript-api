import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const mongoConfig = {
      url: process.env.MONGODB_URL || "localhost:27017",
      username: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD,
    };

    const requiredFields = ["url", "username", "password"];
    for (const field of requiredFields) {
      if (!mongoConfig[field as keyof typeof mongoConfig]) {
        throw new Error(
          `MongoDB ${field} not provided in environment variables`
        );
      }
    }

    const client = new Mongo(mongoConfig.url, {
      auth: { username: mongoConfig.username, password: mongoConfig.password },
    });
    const db = client.db("users-db");

    this.client = client;
    this.db = db;
  },
};
