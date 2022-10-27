const { join } = require("path");
const os = require("os");
/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // cacheDirectory: join(__dirname, ".cache", "puppeteer"),
  cacheDirectory: process.env.MORI
    ? join(os.homedir(), ".cache", "puppeteer")
    : join(__dirname, ".cache", "puppeteer"),
};
