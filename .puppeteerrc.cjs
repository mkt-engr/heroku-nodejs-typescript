const { join } = require("path");
const os = require("os");

console.log(
  join(os.homedir(), ".cache", "puppeteer"),
  'join(os.homedir(), ".cache", "puppeteer")'
);

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // cacheDirectory: join(__dirname, ".cache", "puppeteer"),//本番環境でのパス
  cacheDirectory:
    process.env.ENV === "LOCAL"
      ? join(os.homedir(), ".cache", "puppeteer")
      : join(__dirname, ".cache", "puppeteer"),
};
