import express, { Express, Request, Response } from "express";
import ItemRouter from "./routes/item.routes";

const app: Express = express();
app.use(express.json());

app.use("/api/items", ItemRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
