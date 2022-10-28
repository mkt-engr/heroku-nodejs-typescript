import express, { Request, Response } from "express";
import puppeteer from "puppeteer";

const router = express.Router();

//CSVをダウンロードして中身を解析したい
router.get("/csvtest", async (req: Request, res: Response) => {
  // 1. CSVをダウンロード
  const LAUNCH_OPTION =
    process.env.ENV === "LOCAL"
      ? { headless: false }
      : { args: ["--no-sandbox", "--disable-setuid-sandbox"] };
  const browser = await puppeteer.launch(LAUNCH_OPTION);
  const page = await browser.newPage();
  // CSVダウンロードサイトへいく
  await page.goto("https://www.sample-videos.com/download-sample-csv.php");

  const element = await page.waitForSelector(
    "a[href='csv/Sample-Spreadsheet-10-rows.csv']",
    { visible: true }
  );
  const cdpSession = await page.target().createCDPSession();
  console.log(__dirname, "__dirname in csv_test01");
  await cdpSession.send("Browser.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: __dirname,
    eventsEnabled: true,
  });

  //TODO:ファイル名を決めるにはレスポンスをインターセプトしてファイル名を変更する必要がある。

  //   cdpSession.send("Fetch.enable", {
  //     patterns: [{ urlPattern: "*", requestStage: "Response" }],
  //   });
  //   cdpSession.on("Fetch.requestPaused", async (requestEvent) => {
  //     const resHeaders = (requestEvent.responseHeaders || []).filter(
  //       (v: { name: string }) => v.name !== "content-disposition"
  //     );
  //     const { requestId } = requestEvent;
  //     if (requestEvent.responseStatusCode == 200) {
  //       // inject Content-Disposition header
  //       resHeaders.push({
  //         name: "content-disposition",
  //         value: `attachment; filename="makito.csv"`,
  //       });
  //       const response = await cdpSession.send("Fetch.getResponseBody", {
  //         requestId: requestId,
  //       });
  //       await cdpSession.send("Fetch.fulfillRequest", {
  //         requestId,
  //         responseCode: 200,
  //         responseHeaders: resHeaders,
  //         body: response.body,
  //       });
  //     } else {
  //       await cdpSession.send("Fetch.continueRequest", { requestId });
  //     }
  //   });
  //要素クリック
  await element!.click();
  //ブラウザ閉じる
  await browser.close();

  // 2. ダウンロードしたCSVを解析
  // 3. DBにデータ追加したい
  res.status(200).send({
    message: "download_csv_test01",
  });
});

export { router as downloadCsvTest01Router };
