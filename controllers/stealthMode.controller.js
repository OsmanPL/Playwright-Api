const rotationBrowsers = require('../controllers/rotationBrowsers.controller')

const arrayBrowsers = ['chromium', 'firefox', 'webkit', 'edge', 'brave'];

exports.stealthModeRotationBrowsers = async (req, res) => {
    const { url, options, browser } = req.body;
    const selectBrowser = browser || arrayBrowsers[Math.floor(Math.random() * arrayBrowsers.length)];
    let result = await rotationBrowsers[selectBrowser](url, options);
    res.send(result);
};
