const rotationBrowsers = require("../controllers/rotationBrowsers.controller");

const defaultBrowsers = ["chromium", "firefox", "webkit", "edge", "brave"];

exports.stealthModeRotationBrowsers = async (req, res) => {
  const { url, options, browsers } = req.body;
  const listBrowsers = browsers||defaultBrowsers;
  const selectBrowser = listBrowsers[Math.floor(Math.random() * listBrowsers.length)];
  let result = await rotationBrowsers[selectBrowser](url, options);
  res.send(result);
};
