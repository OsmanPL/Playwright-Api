const rotationBrowsers = require('../controllers/rotationBrowsers.controller')

exports.stealthModeRotationBrowsers = async (req, res) => {
    const { url, options, browser } = req.body;
    let result = await rotationBrowsers[browser](url, options);
    res.send(result);
};
