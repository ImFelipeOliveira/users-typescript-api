import express, { Request, Response } from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";

config();

const app = express();

const port = process.env.PORT || 8000;

app.get("/users", async (req: Request, res: Response) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const { statusCode, body } = await getUsersController.handler();
  res.send(body).status(statusCode);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
