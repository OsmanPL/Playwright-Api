const axios = require("axios");
const config = require("../../config/config");

const { chromium } = require("playwright-extra");
const stealth = require("puppeteer-extra-plugin-stealth")();
chromium.use(stealth);

const clientKey = config.clientKey;

exports.stealthMode2CaptchaAmazon = async (req, res) => {
  const { url, options } = req.body;

  await chromium
    .launch(options)
    .then(async (browser) => {
      const page = await browser.newPage({ ignoreHTTPSErrors: false });
      page.setDefaultTimeout(3600000);
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
                console.log(response.data);
                if (response.data.status != "processing") {
                  solve_Ready = false;
                  if (response.data.solution != null) {
                    text = response.data.solution.text;
                  }
                }
              });
          } while (solve_Ready);

          if (text != "") {
            await page.locator("input#captchacharacters").fill(text);
            sleep(5000);
            await page.click(`button[type="submit"]`);
          }
        }
      }
      const result = await page.innerHTML("*", { waitUntil: "networkidle" });
      await page.close();
      await browser.close();
      res
        .send("<html>" + result.replace(new RegExp("\\n", "g"), "") + "</html>")
        .status(200);
    })
    .catch((error) => {
      res.send({ message: error }).status(500);
    });
};
