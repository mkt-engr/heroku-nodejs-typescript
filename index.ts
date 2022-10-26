import express, { Request, Response } from "express";
import path from "path";
import { puppeteerTest01Router } from "./routes/puppeteer_test01";

const PORT = process.env.PORT || 5001;
const app = express();

app
  .use(express.static(path.join(__dirname, "../public")))
  .set("views", path.join(__dirname, "../views"))
  .set("view engine", "ejs")
  .get("/", (req: Request, res: Response) => res.render("pages/index"))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use(puppeteerTest01Router);
