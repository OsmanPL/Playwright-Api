const axios = require("axios");
const config = require("../../config/config");

const { chromium, firefox,webkit } = require("playwright-extra");
const stealth = require("puppeteer-extra-plugin-stealth")();
chromium.use(stealth);

const clientKey = config.clientKey;

exports.stealthMode2CaptchaAmazon = async (browserType, url, options) => {
  console.log("Use mapper amazonMapper");
  let result;
  let newOptions = options;

  let launchBrowser=chromium;

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
    .launch(options)
    .then(async (browser) => {
      try {
        const page = await browser.newPage({ ignoreHTTPSErrors: false });

        page.setDefaultTimeout(3600000);

        await page.route("**/*.svg", (route) => route.abort());
        await page.route("**/*.svg**", (route) => route.abort());
        await page.route("**/*.png", (route) => route.abort());
        await page.route("**/*.png**", (route) => route.abort());
        await page.route("**/*.jpg", (route) => route.abort());
        await page.route("**/*.jpg**", (route) => route.abort());
        await page.route("**/*.jpeg", (route) => route.abort());
        await page.route("**/*.jpeg**", (route) => route.abort());
        await page.route("**/*.gif", (route) => route.abort());
        await page.route("**/*.gif**", (route) => route.abort());
        await page.route("**/*.woff", (route) => route.abort());
        await page.route("**/*.woff**", (route) => route.abort());
        await page.route("**/*.woff2", (route) => route.abort());
        await page.route("**/*.woff2**", (route) => route.abort());
        await page.route("**/*.mp3", (route) => route.abort());
        await page.route("**/*.mp3**", (route) => route.abort());
        await page.route("**/*.mp4", (route) => route.abort());
        await page.route("**/*.mp4**", (route) => route.abort());
        await page.route("**/*.tiff", (route) => route.abort());
        await page.route("**/*.tiff**", (route) => route.abort());
        await page.route("**/*.psd", (route) => route.abort());
        await page.route("**/*.psd**", (route) => route.abort());
        await page.route("**/*.pdf", (route) => route.abort());
        await page.route("**/*.pdf**", (route) => route.abort());
        await page.route("**/*.bmp", (route) => route.abort());
        await page.route("**/*.bmp**", (route) => route.abort());
        await page.route("**/*.eps", (route) => route.abort());
        await page.route("**/*.eps**", (route) => route.abort());
        await page.route("**/*.wmv", (route) => route.abort());
        await page.route("**/*.wmv**", (route) => route.abort());
        await page.route("**/*.avi", (route) => route.abort());
        await page.route("**/*.avi**", (route) => route.abort());
        await page.route("**/*.mpg", (route) => route.abort());
        await page.route("**/*.mpg**", (route) => route.abort());
        await page.route("**/*.mov", (route) => route.abort());
        await page.route("**/*.mov**", (route) => route.abort());
        await page.route("**/*.wav", (route) => route.abort());
        await page.route("**/*.wav**", (route) => route.abort());
        await page.route("**/*.3gp", (route) => route.abort());
        await page.route("**/*.3gp**", (route) => route.abort());
        await page.route("**/*.ttf", (route) => route.abort());
        await page.route("**/*.ttf**", (route) => route.abort());
        await page.route("**/*.awoff", (route) => route.abort());
        await page.route("**/*.awoff**", (route) => route.abort());

        await page.goto(url);
        const existBlock = await page.$("input#captchacharacters");
        if (existBlock != null) {
          var task = "";
          var text = "";

          let image = await page.locator(".a-row img");
          let imageSrc = await image.getAttribute("src");
          let body = await config.imageUrlToBase64(imageSrc);

          await axios
            .post("https://api.2captcha.com/createTask", {
              clientKey: clientKey,
              task: {
                type: "ImageToTextTask",
                body: body,
              },
            })
            .then(function (response) {
              console.log(response.data);
              if (response.data.taskId != null) {
                task = response.data.taskId;
              }
            });

          if (task != "") {
            let solve_Ready = true;
            do {
              await axios
                .post("https://api.2captcha.com/getTaskResult", {
                  clientKey: clientKey,
                  taskId: task,
                })
                .then(function (response) {
                  if (response.data.status != "processing") {
                    console.log(response.data);
                    solve_Ready = false;
                    if (response.data.solution != null) {
                      text = response.data.solution.text;
                    }
                  }
                });
            } while (solve_Ready);

            if (text != "") {
              await page.locator("input#captchacharacters").fill(text);
              config.sleep(5000);
              await page.click(`button[type="submit"]`);
            }
          }
        }
        config.sleep(10000);
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
