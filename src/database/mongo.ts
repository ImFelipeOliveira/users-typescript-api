import { MongoClient as Mongo, Db, WithId } from "mongodb";
import { User } from "../models/user";
import { UserNoIdType } from "../@types/user-params";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,
  prepareUser: undefined as unknown as (
    user: WithId<UserNoIdType> | WithId<UserNoIdType>[]
  ) => Promise<User | User[]>,

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

    const prepareUser = async (
      user: WithId<UserNoIdType> | WithId<UserNoIdType>[]
    ): Promise<User | User[]> => {
      if (Array.isArray(user)) {
        return user.map(({ _id, ...rest }) => ({
          id: _id.toString(),
          ...rest,
        }));
      }
      const { _id, ...rest } = user;
      return { id: _id.toString(), ...rest };
    };

    this.client = client;
    this.db = db;
    this.prepareUser = prepareUser;
  },
};
