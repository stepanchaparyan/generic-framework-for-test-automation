import { Builder, By, until } from 'selenium-webdriver';
import puppeteerFirefox from 'puppeteer-firefox';
import puppeteerChrome from 'puppeteer';
import chromePuppeteerOptions from '../../settings_puppeteer/chromePuppeteerOptions';
import firefoxPuppeteerOptions from '../../settings_puppeteer/firefoxPuppeteerOptions';
import * as puppeteerSettings from '../../settings_puppeteer/puppeteerSettings';
import chromeSeleniumOptions from '../../settings_selenium/chromeSeleniumOptions';
import firefoxSeleniumOptions from '../../settings_selenium/firefoxSeleniumOptions';
import args from 'minimist';
const argumentS = args(process.argv.slice(2));
import mailSender from './mailSender';

let browserFromArgument;
let frameworkFromArgument;

if (argumentS._.length === 1) {
    frameworkFromArgument = 'framework:puppeteer';
    browserFromArgument = 'browser:chrome';
} else if (argumentS._.length === 2 && argumentS._[1].startsWith('browser:') ) {
    frameworkFromArgument = 'framework:puppeteer';
    browserFromArgument = argumentS._[1];
} else if (argumentS._.length === 2 && argumentS._[1].startsWith('framework:') ) {
    browserFromArgument = 'browser:chrome';
    frameworkFromArgument = argumentS._[1];
} else if (argumentS._.length === 3) {
    browserFromArgument = argumentS._[1];
    frameworkFromArgument = argumentS._[2];
} else if (argumentS._.length === 4) {
    browserFromArgument = argumentS._[1];
    frameworkFromArgument = argumentS._[2];
}

let browser, driver, capabilities;

export default class Driver {

    async runDriver() {
        if (browserFromArgument === 'browser:chrome' && frameworkFromArgument === 'framework:selenium') {
            driver = new Builder().forBrowser('chrome')
            .setChromeOptions(chromeSeleniumOptions).build();
            capabilities = await driver.getCapabilities();
            console.log(await capabilities.get('browserName'), await capabilities.get('version'),' - Selenium');

        } else if (browserFromArgument === 'browser:firefox' && frameworkFromArgument === 'framework:selenium') {
            driver = new Builder().forBrowser('firefox')
            .withCapabilities(firefoxSeleniumOptions).build();
            capabilities = await driver.getCapabilities();
            console.log(await capabilities.getBrowserName(), await capabilities.getBrowserVersion(),' - Selenium');

        } else if (browserFromArgument === 'browser:chrome' && frameworkFromArgument === 'framework:puppeteer') {
            browser = await puppeteerChrome.launch(chromePuppeteerOptions);
            driver = await browser.newPage();
            await driver.setViewport(puppeteerSettings.viewport);
            console.log(await browser.version(), ' - Puppeteer', );

        } else if (browserFromArgument === 'browser:firefox' && frameworkFromArgument === 'framework:puppeteer') {
            browser = await puppeteerFirefox.launch(firefoxPuppeteerOptions);
            driver = await browser.newPage();
            await driver.setViewport(puppeteerSettings.viewport);
            console.log(await browser.version(),' - Puppeteer');
        } else {
            throw new Error('Wrong parameters: 1-st parameter must be browser:browserType, 2-nd framework:frameworkType, 3-th sendMail or noMail, for example "npm test browser:chrome framework:selenium noMail"');
        }
    }

    async closeDriver() {
        if (frameworkFromArgument === 'framework:selenium') {
            if (argumentS._.length === 4 && argumentS._[3].startsWith('sendMail')) {
                await mailSender(await this.getBrowserVersion());
            }
            await driver.sleep(1000);
            await driver.quit();
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            if (argumentS._.length === 4 && argumentS._[3].startsWith('sendMail')) {
                await mailSender(await this.getBrowserVersion());
            }
            await browser.close();
        }
    }

    async getBrowserVersion () {
        if (frameworkFromArgument === 'framework:selenium' && browserFromArgument === 'browser:chrome') {
            return `Selenium ${await capabilities.get('browserName')} ${await capabilities.get('version')}`;
        } else if (frameworkFromArgument === 'framework:selenium' && browserFromArgument === 'browser:firefox') {
            return `Selenium ${await capabilities.getBrowserName()} ${await capabilities.getBrowserVersion()}`;
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            return `Puppeteer ${await browser.version()}`;
        }
    }

    async getTitle () {
        if (frameworkFromArgument === 'framework:selenium') {
            return await driver.getTitle();
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            return await driver.title();
        }
    }

    async goto (url) {
        if (frameworkFromArgument === 'framework:selenium') {
            await driver.get(url);
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            await driver.goto(url);
        }
    }

	async wait(time) {
        if (frameworkFromArgument === 'framework:selenium') {
            await driver.sleep(time);
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            await driver.waitFor(time);
        }
    }

    async waitFor(selector, waitingTime = 10000) {
        if (frameworkFromArgument === 'framework:selenium') {
            await driver.wait(until.elementLocated(By.css(selector)), waitingTime);
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            try {
                await driver.waitFor(selector, { timeout: waitingTime } );
            } catch (error) {
                throw Error (`Timeout Error: Waiting for element to be located By(css selector)', ${selector}, Wait timed out after ${waitingTime}ms`);
            }
        }
    }

    async click(selector) {
        if (frameworkFromArgument === 'framework:selenium') {
            await this.waitFor(selector);
            await driver.findElement(By.css(selector)).click();
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            await this.waitFor(selector);
            await driver.click(selector);
        }
    }

    async getText(selector) {
        if (frameworkFromArgument === 'framework:selenium') {
            await this.waitFor(selector);
            let element = await driver.findElement(By.css(selector));
            return await element.getText();
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            await this.waitFor(selector);
            return await driver.$eval(selector, (text) => text.innerText);
        }
    }

    async type (selector, text) {
        if (frameworkFromArgument === 'selenium_chrome' || frameworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            await this.clear(selector);
            await driver.findElement(By.css(selector)).sendKeys(text);
        } else if (frameworkFromArgument === 'puppeteer_chrome' || frameworkFromArgument === 'puppeteer_firefox') {
            await this.waitFor(selector);
            await this.clear(selector);
            await driver.type(selector, text);
        }
    }

    async select (selector, text) {
        if (frameworkFromArgument === 'selenium_chrome' || frameworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            await driver.findElement(By.css(selector)).sendKeys(text);
        } else if (frameworkFromArgument === 'puppeteer_chrome' || frameworkFromArgument === 'puppeteer_firefox') {
            await this.waitFor(selector);
            await driver.type(selector, text);
        }
    }

    async getURL() {
        if (frameworkFromArgument === 'selenium_chrome' || frameworkFromArgument === 'selenium_firefox') {
            return await driver.getCurrentUrl();
        } else if (frameworkFromArgument === 'puppeteer_chrome' || frameworkFromArgument === 'puppeteer_firefox') {
            return await driver.url();
        }
    }

    async clear(selector) {
        if (frameworkFromArgument === 'selenium_chrome' || frameworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            await driver.findElement(By.css(selector)).clear();
        } else if (frameworkFromArgument === 'puppeteer_chrome' || frameworkFromArgument === 'puppeteer_firefox') {
            await this.waitFor(selector);
            await this.click(selector);
            await driver.keyboard.down('Control');
            await driver.keyboard.press('KeyA');
            await driver.keyboard.up('Control');
            await driver.keyboard.press('Backspace');
        }
    }

    async getElementsCount(selector) {
        if (frameworkFromArgument === 'selenium_chrome' || frameworkFromArgument === 'selenium_firefox') {
            return await driver.findElements(By.css(selector)).then(items => items.length);
        } else if (frameworkFromArgument === 'puppeteer_chrome' || frameworkFromArgument === 'puppeteer_firefox') {
            return await driver.$$eval(selector, items => items.length);
        }
	}
    async selectorExist(selector) {
        if (frameworkFromArgument === 'selenium_chrome' || frameworkFromArgument === 'selenium_firefox') {
            return await driver.findElements(By.css(selector)) === null;
        } else if (frameworkFromArgument === 'puppeteer_chrome' || frameworkFromArgument === 'puppeteer_firefox') {
            return await driver.$(selector) !== null;
        }
	}

	// async reload() {
	// 	await this.driver.navigate().refresh();
	// 	await this.driver.sleep(1000);
	// }


}