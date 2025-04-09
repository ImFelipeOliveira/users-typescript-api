import express, { Request, Response } from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUsersRepository } from "./repositories/create-users/mongo-create-users";
import { CreateUserController } from "./controllers/create-users/create-users";

const main = async () => {
  config();
  const app = express();

  app.use(express.json());
  const port = process.env.PORT || 8000;

  await MongoClient.connect();

  app.get("/users", async (req: Request, res: Response) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { statusCode, body } = await getUsersController.handler();
    res.status(statusCode).send(body);
  });

  app.post("/users", async (req: Request, res: Response) => {
    const mongoCreateUserRepository = new MongoCreateUsersRepository();
    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { statusCode, body } = await createUserController.handler({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

main();
