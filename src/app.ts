import express from "express";
import { Signale } from "signale";

import { userRouter } from "./users/infrastructure/userRouter";

const app = express();

const signale = new Signale();

app.use(express.json());
app.use("/user", userRouter);

app.listen(3000, () => {
  signale.success("Server online in port 3000");
});
