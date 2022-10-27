import express, { Request, Response } from "express";
import puppeteer from "puppeteer";

const router = express.Router();

//CSVをダウンロードして中身を解析したい
router.get("/csvtest", async (req: Request, res: Response) => {
  // 1. CSVをダウンロード
  // 2. ダウンロードしたCSVを解析
  res.status(200).send({
    message: "download_csv_test01",
  });
});

export { router as downloadCsvTest01Router };
