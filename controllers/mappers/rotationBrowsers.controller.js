const config = require("../../config/config");

const { webkit } = require("playwright");
const { chromium, firefox } = require("playwright-extra");
const stealth = require("puppeteer-extra-plugin-stealth")();
chromium.use(stealth);
firefox.use(stealth);

exports.launchBrowser = async (browserType, url, options) => {
  console.log("Use mapper rotationBrowsers")
  let result;
  let newOptions = options;

  let launchBrowser;

  if (browserType === 'edge' || browserType === 'brave') {
    newOptions.executablePath = browserType === 'edge' ? config.edge : config.brave;
    launchBrowser = chromium;
  }

  if (browserType === 'chromium') {
    launchBrowser = chromium;
  }

  if (browserType === 'webkit') {
    launchBrowser = webkit;
  }

  if (browserType === 'firefox') {
    launchBrowser = firefox;
  }


 await launchBrowser
    .launch(newOptions)
    .then(async (browser) => {
      try {
        const page = await browser.newPage({ ignoreHTTPSErrors: false });
        await page.setDefaultTimeout(3600000);
        await page.goto(url);
        result = await page.innerHTML("*", { waitUntil: "networkidle" });
        await page.close();
        await browser.close();
        console.log(`browser ${browserType}`);
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

