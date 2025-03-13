import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
// import authRouter from "./auth/route";
// import transactionRouter from "./transaction/route";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Expense Tracker API is live");
});

// app.use("/auth", authRouter);
// app.use("/transaction", transactionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
