const config = require("../config/config");

const {webkit} = require("playwright");
const { chromium, firefox } = require("playwright-extra");
const stealth = require("puppeteer-extra-plugin-stealth")();
chromium.use(stealth);
firefox.use(stealth);

browserChromium = async (url, options) => {
  let result;
  await chromium
    .launch(options)
    .then(async (browser) => {
      const page = await browser.newPage({ ignoreHTTPSErrors: false });
      await page.setDefaultTimeout(3600000);
      await page.goto(url);
      result = await page.innerHTML("*", { waitUntil: "networkidle" });
      await page.close();
      await browser.close();
      console.log("browser chromium")
    })
    .catch((error) => {
      result = error;
    });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("<html>" + result + "</html>");
    }, 1500);
  });
};

browserFirefox = async (url, options) => {
  let result;
  await firefox
    .launch(options)
    .then(async (browser) => {
      const page = await browser.newPage({ ignoreHTTPSErrors: false });
      await page.setDefaultTimeout(3600000);
      await page.goto(url);
      result = await page.innerHTML("*", { waitUntil: "networkidle" });
      await page.close();
      await browser.close();
      console.log("browser firefox")
    })
    .catch((error) => {
      result = error;
    });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("<html>" + result + "</html>");
    }, 1500);
  });
};

browserWebkit = async (url, options) => {
  let result;
  await webkit
    .launch(options)
    .then(async (browser) => {
      const page = await browser.newPage({ ignoreHTTPSErrors: false });
      await page.setDefaultTimeout(3600000);
      await page.goto(url);
      result = await page.innerHTML("*", { waitUntil: "networkidle" });
      await page.close();
      await browser.close();
      console.log("browser webkit")
    })
    .catch((error) => {
      result = error;
    });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("<html>" + result + "</html>");
    }, 1500);
  });
};

browserEdge = async (url, options) => {
  let newOptions = options;
  newOptions.executablePath = config.edge;
  let result;
  await chromium
    .launch(options)
    .then(async (browser) => {
      const page = await browser.newPage({ ignoreHTTPSErrors: false });
      await page.setDefaultTimeout(3600000);
      await page.goto(url);
      result = await page.innerHTML("*", { waitUntil: "networkidle" });
      await page.close();
      await browser.close();
      console.log("browser edge")
    })
    .catch((error) => {
      result = error;
    });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("<html>" + result + "</html>");
    }, 1500);
  });
};

browserBrave = async (url, options) => {
  let newOptions = options;
  newOptions.executablePath = config.brave;
  let result;
  await chromium
    .launch(options)
    .then(async (browser) => {
      const page = await browser.newPage({ ignoreHTTPSErrors: false });
      await page.setDefaultTimeout(3600000);
      await page.goto(url);
      result = await page.innerHTML("*", { waitUntil: "networkidle" });
      await page.close();
      await browser.close();
      console.log("browser brave")
    })
    .catch((error) => {
      result = error;
    });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("<html>" + result + "</html>");
    }, 1500);
  });
};

module.exports = {
  chromium: browserChromium,
  firefox: browserFirefox,
  webkit: browserWebkit,
  edge: browserEdge,
  brave: browserBrave,
};
