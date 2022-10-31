import express, { Request, Response } from "express";
import puppeteer from "puppeteer";

const router = express.Router();

router.get("/pdftest", async (req: Request, res: Response) => {
  const LAUNCH_OPTION =
    process.env.ENV === "LOCAL"
      ? { headless: false }
      : { args: ["--no-sandbox", "--disable-setuid-sandbox"] };
  const browser = await puppeteer.launch(LAUNCH_OPTION);
  const page = await browser.newPage();
  await page.goto("https://example.com", { waitUntil: "networkidle2" });
  await page.screenshot({ path: `${__dirname}example.png` });
  await page.pdf({ path: `${__dirname}/example.png` });
  await browser.close();
  res.status(200).send({
    message: "download_pdf_test01",
  });
});

export { router as downloadPdfTest01Router };
