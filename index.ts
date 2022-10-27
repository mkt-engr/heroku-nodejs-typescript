import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express, { Request, Response } from "express";
import path from "path";
import { puppeteerTest01Router } from "./routes/puppeteer_test01";
import { downloadCsvTest01Router } from "./routes/download_csv_test01";

const PORT = process.env.PORT || 5001;
const app = express();

app
  .use(express.static(path.join(__dirname, "../public")))
  .set("views", path.join(__dirname, "../views"))
  .set("view engine", "ejs")
  .get("/", (req: Request, res: Response) => {
    console.log({ __dirname });
    console.log(process.env.MORI, "環境変数を読み込みたい");
    res.render("pages/index");
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use(puppeteerTest01Router);
app.use(downloadCsvTest01Router);
