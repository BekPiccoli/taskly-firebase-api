import express, { json } from "express";
import { routes } from "./routes/index.js";
const port = 3001;
const app = express();
app.use(json());

routes(app);

app.listen(port, () => {
  console.log(`Taskly API on port ${port}`);
});
