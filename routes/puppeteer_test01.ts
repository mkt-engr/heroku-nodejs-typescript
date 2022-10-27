import express, { Request, Response } from "express";
import puppeteer from "puppeteer";

const router = express.Router();

router.get("/puptest", async (req: Request, res: Response) => {
  console.log(
    process.env.MORI,
    process.env.ENV,
    "これでheroku環境か判別できる？"
  );
  const LAUNCH_OPTION =
    process.env.ENV === "LOCAL"
      ? { headless: false }
      : { args: ["--no-sandbox", "--disable-setuid-sandbox"] };

  let searchResults;
  try {
    const browser = await puppeteer.launch(LAUNCH_OPTION);
    // const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Googleページを開く
    await page.goto("https://www.google.com/");
    // 検索boxに`puppeteer`を入力
    await page.type('input[name="q"]', "puppeteer");
    // 「Enter」ボタン押下
    await page.keyboard.press("Enter");
    // 検索結果要素の表示まで待機
    await page.waitForSelector(".LC20lb", { visible: true });
    // 検索結果のタイトル・リンク一覧取得
    searchResults = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLAnchorElement>(".LC20lb")].map(
        (element) => {
          const ppp = element.parentElement as HTMLAnchorElement;
          return {
            link: element.href || ppp.href || "何もなかった",
            title: element.innerText,
          };
        }
      )
    );
    console.log(searchResults);
    await browser.close();
  } catch (error) {
    console.error(error);
  }

  res.status(200).send({
    message: searchResults,
  });
});

export { router as puppeteerTest01Router };
