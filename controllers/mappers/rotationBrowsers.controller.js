const config = require("../../config/config");

const { chromium, firefox,webkit } = require("playwright-extra");
const stealth = require("puppeteer-extra-plugin-stealth")();
chromium.use(stealth);

exports.launchBrowser = async (browserType, url, options) => {
  console.log("Use mapper rotationBrowsers");
  let result;
  let newOptions = options;

  let launchBrowser = chromium;

  if (browserType === "edge" || browserType === "brave") {
    newOptions.executablePath =
      browserType === "edge" ? config.edge : config.brave;
  }

  if (browserType === "webkit") {
    launchBrowser = webkit;
  }

  if (browserType === "firefox") {
    launchBrowser = firefox;
  }

  var printProxy = "null";
  if(options.proxy != null){
    printProxy = options.proxy.server;
  }
  console.log(
    `Working with browser: ${browserType}, url: ${url} and proxy: ${printProxy}`
  );
  await launchBrowser
    .launch(newOptions)
    .then(async (browser) => {
      try {
        const page = await browser.newPage({ ignoreHTTPSErrors: false });
        await page.setDefaultTimeout(3600000);
        await page.goto(url);
        config.sleep(60000)
        result = await page.innerHTML("*", { waitUntil: "networkidle" });
        await page.close();
        await browser.close();
      } catch (e) {
        result = e;
        console.log(e);
        browser.close();
      }
    })
    .catch((error) => {
      result = error;
      console.log(error);
    });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`<html>${result}</html>`);
    }, 1500);
  });
};
