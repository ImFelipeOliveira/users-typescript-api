import express, { Request, Response } from "express";
import { createServer } from "node:http";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUsersRepository } from "./repositories/create-user/mongo-create-users";
import { CreateUserController } from "./controllers/create-users/create-users";
import { MongoUpdateUserRepository } from "./repositories/update-user/mongo-update-user";
import { UpdateUserController } from "./controllers/update-user/update-user";
import { MongoDeleteUserRepository } from "./repositories/delete-user/mongo-delete-user";
import { DeleteUserController } from "./controllers/delete-user/delete-user";

const main = async () => {
  config();
  const app = express();
  const server = createServer(app);

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

  app.patch("/users/:userId", async (req: Request, res: Response) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();
    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { statusCode, body } = await updateUserController.handler({
      body: req.body,
      params: { userId: req.params.userId },
    });

    res.status(statusCode).send(body);
  });

  app.delete("/users/:userId", async (req: Request, res: Response) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();
    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository
    );
    const { statusCode, body } = await deleteUserController.handler({
      params: { userId: req.params.userId },
    });
    res.status(statusCode).send(body);
  });

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

main();
