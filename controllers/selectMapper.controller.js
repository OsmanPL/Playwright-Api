const amazon2Captcha = require('./mappers/amazon2Captcha.controller');
const rotationBrowsers = require('./mappers/rotationBrowsers.controller');

module.exports = { 
    amazon2Captcha: amazon2Captcha.stealthMode2CaptchaAmazon,
    rotationBrowsers: rotationBrowsers.launchBrowser
}