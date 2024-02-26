const selectMapper = require("./selectMapper.controller");

const defaultBrowsers = ["chromium", "firefox", "webkit", "edge", "brave"];

const defaultMapper = "rotationBrowsers";

exports.rotationBrowserMapper = async (req, res) => {
  const { url, options, browsers, mapper } = req.body;
  const listBrowsers = browsers||defaultBrowsers;
  const selectBrowser = listBrowsers[Math.floor(Math.random() * listBrowsers.length)];
  const useMapper = mapper||defaultMapper;
  let result = "";
  if (useMapper) {
    result = await selectMapper[useMapper](selectBrowser, url, options);
  }
  res.send(result);
};
