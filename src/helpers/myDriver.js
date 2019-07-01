import { Builder } from 'selenium-webdriver';
import puppeteerFirefox from 'puppeteer-firefox';
import puppeteerEdge from 'puppeteer-edge';
import puppeteerChrome from 'puppeteer';
import chromePuppeteerOptions from '../../settings/settings_puppeteer/chromePuppeteerOptions';
import firefoxPuppeteerOptions from '../../settings/settings_puppeteer/firefoxPuppeteerOptions';
import * as puppeteerSettings from '../../settings/settings_puppeteer/puppeteerSettings';
import chromeSeleniumOptions from '../../settings/settings_selenium/chromeSeleniumOptions';
import firefoxSeleniumOptions from '../../settings/settings_selenium/firefoxSeleniumOptions';
import edgeSeleniumOptions from '../../settings/settings_selenium/edgeSeleniumOptions';
import fs from 'fs';

import args from 'minimist';
const argumentS = args(process.argv.slice(2));
const sendMail = argumentS._.includes('sendMail') ? true : false;

let browserFromArgument, frameworkFromArgument;
let browser, driver, capabilities;

if (argumentS._.length === 1) {
    frameworkFromArgument = 'framework:puppeteer';
    browserFromArgument = 'browser:chrome';
} else if (argumentS._.length === 2 && argumentS._[1].startsWith('browser:') ) {
    frameworkFromArgument = 'framework:puppeteer';
    browserFromArgument = argumentS._[1];
} else if (argumentS._.length === 2 && argumentS._[1].startsWith('framework:') ) {
    browserFromArgument = 'browser:chrome';
    frameworkFromArgument = argumentS._[1];
} else if (argumentS._.length > 2) {
    browserFromArgument = argumentS._[1];
    frameworkFromArgument = argumentS._[2];
}

const checkSendMailArgumentAndWriteTempFile = function (data) {
    if (sendMail) {
        fs.writeFile('src/helpers/tmp.js', data, function(err) {
            if (err) {
                return console.log(err);
            }
            //console.log('The file was saved!');
        });
    }
};

export default class Driver {

    async runDriver() {
        if (browserFromArgument === 'browser:chrome' && frameworkFromArgument === 'framework:selenium') {
            driver = new Builder().forBrowser('chrome')
            .setChromeOptions(chromeSeleniumOptions).build();
            capabilities = await driver.getCapabilities();
            const data = `${await capabilities.get('browserName')} ${await capabilities.get('version')} - Selenium`;
            console.log(data);
            checkSendMailArgumentAndWriteTempFile(data);

        } else if (browserFromArgument === 'browser:edge' && frameworkFromArgument === 'framework:selenium') {
            driver = new Builder().forBrowser('MicrosoftEdge')
            .withCapabilities(edgeSeleniumOptions).build();
            capabilities = await driver.getCapabilities();
            const data = `${await capabilities.getBrowserName()} ${await capabilities.getBrowserVersion()} - Selenium`;
            console.log(data);
            checkSendMailArgumentAndWriteTempFile(data);

        } else if (browserFromArgument === 'browser:firefox' && frameworkFromArgument === 'framework:selenium') {
            driver = new Builder().forBrowser('firefox')
            .withCapabilities(firefoxSeleniumOptions).build();
            capabilities = await driver.getCapabilities();
            const data = `${await capabilities.getBrowserName()} ${await capabilities.getBrowserVersion()} - Selenium`;
            console.log(data);
            checkSendMailArgumentAndWriteTempFile(data);

        } else if (browserFromArgument === 'browser:edge' && frameworkFromArgument === 'framework:puppeteer') {
            browser = await puppeteerEdge.launch(firefoxPuppeteerOptions);
            driver = await browser.newPage();
            await driver.setViewport(puppeteerSettings.viewport);
            console.log(await browser.version(),' - Puppeteer');
            const data = `${await browser.version()} - Puppeteer`;
            console.log(data);
            checkSendMailArgumentAndWriteTempFile(data);

        } else if (browserFromArgument === 'browser:chrome' && frameworkFromArgument === 'framework:puppeteer') {
            browser = await puppeteerChrome.launch(chromePuppeteerOptions);
            driver = await browser.newPage();
            await driver.setViewport(puppeteerSettings.viewport);
            const data = `${await browser.version()} - Puppeteer`;
            console.log(data);
            checkSendMailArgumentAndWriteTempFile(data);

        } else if (browserFromArgument === 'browser:firefox' && frameworkFromArgument === 'framework:puppeteer') {
            browser = await puppeteerFirefox.launch(firefoxPuppeteerOptions);
            driver = await browser.newPage();
            await driver.setViewport(puppeteerSettings.viewport);
            const data = `${await browser.version()} - Puppeteer`;
            console.log(data);
            checkSendMailArgumentAndWriteTempFile(data);

        } else {
            throw new Error('Wrong parameters: 1-st parameter must be browser:browserType, 2-nd framework:frameworkType, for example "npm test browser:chrome framework:selenium"');
        }
        return driver;
    }

    async closeDriver() {
        if (frameworkFromArgument === 'framework:selenium') {
            if (argumentS._.includes('deleteCookies')) {
                await driver.manage().deleteAllCookies();
            }
            await driver.quit();
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            if (argumentS._.includes('deleteCookies')) {
                if (browserFromArgument === 'browser:chrome') {
                    let cookies = await driver.cookies();
                    await driver.deleteCookie(...cookies);
                    cookies = await driver.cookies();
                    await driver.deleteCookie(...cookies);
                } else if (browserFromArgument === 'browser:firefox') {
                console.log('Delete Cookies not works on puppeteer firefox');
                }
            }
            await browser.close();
        }
    }

}