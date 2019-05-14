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
const fremworkFromArgument = argumentS._[1];

let browser, driver, capabilities;

export default class Driver {

    async runDriver() {
        if (fremworkFromArgument === 'selenium_chrome') {
            driver = new Builder().forBrowser('chrome')
            .setChromeOptions(chromeSeleniumOptions).build();
            capabilities = await driver.getCapabilities();
            console.log('Selenium -', await capabilities.get('browserName'), await capabilities.get('version'));
        } else if (fremworkFromArgument === 'selenium_firefox') {
            driver = new Builder().forBrowser('firefox')
            .withCapabilities(firefoxSeleniumOptions).build();
            capabilities = await driver.getCapabilities();
            console.log('Selenium -',await capabilities.getBrowserName(), await capabilities.getBrowserVersion());
        } else if (fremworkFromArgument === 'puppeteer_chrome') {
            browser = await puppeteerChrome.launch(chromePuppeteerOptions);
            driver = await browser.newPage();
            await driver.setViewport(puppeteerSettings.viewport);
            console.log('Puppeteer -', await browser.version());
        } else if (fremworkFromArgument === 'puppeteer_firefox') {
            browser = await puppeteerFirefox.launch(firefoxPuppeteerOptions);
            driver = await browser.newPage();
            await driver.setViewport(puppeteerSettings.viewport);
            console.log('Puppeteer -', await browser.version());
        }
    }

    async closeDriver() {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await driver.sleep(1000);
            await driver.quit();
        } else if (fremworkFromArgument === 'puppeteer_chrome' || fremworkFromArgument === 'puppeteer_firefox') {
            await browser.close();
        }
    }

    async getBrowserVersion () {
        if (fremworkFromArgument === 'selenium_chrome') {
            return `Selenium ${await capabilities.get('browserName')} ${await capabilities.get('version')}`;
        } else if (fremworkFromArgument === 'selenium_firefox') {
            return `Selenium ${await capabilities.getBrowserName()} ${await capabilities.getBrowserVersion()}`;
        } else if (fremworkFromArgument === 'puppeteer_chrome' || fremworkFromArgument === 'puppeteer_firefox') {
            return `Puppeteer ${await browser.version()}`;
        }
    }

    async getTitle () {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            return await driver.getTitle();
        } else if (fremworkFromArgument === 'puppeteer_chrome' || fremworkFromArgument === 'puppeteer_firefox') {
            return await driver.title();
        }
    }

    async goto (url) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await driver.get(url);
        } else if (fremworkFromArgument === 'puppeteer_chrome' || fremworkFromArgument === 'puppeteer_firefox') {
            await driver.goto(url);
        }
    }

    async type (selector, text) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            await this.clear(selector);
            await driver.findElement(By.css(selector)).sendKeys(text);
        } else if (fremworkFromArgument === 'puppeteer_chrome' || fremworkFromArgument === 'puppeteer_firefox') {
            await this.waitFor(selector);
            await this.clear(selector);
            await driver.type(selector, text);
        }
    }

    async select (selector, text) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            await driver.findElement(By.css(selector)).sendKeys(text);
        } else if (fremworkFromArgument === 'puppeteer_chrome' || fremworkFromArgument === 'puppeteer_firefox') {
            await this.waitFor(selector);
            await driver.type(selector, text);
        }
    }

	async wait(time) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await driver.sleep(time);
        } else if (fremworkFromArgument === 'puppeteer_chrome' || fremworkFromArgument === 'puppeteer_firefox') {
            await driver.waitFor(time);
        }
    }

	async waitFor(selector, waitingTime = 10000) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await driver.wait(until.elementLocated(By.css(selector)), waitingTime);
        } else if (fremworkFromArgument === 'puppeteer_chrome' || fremworkFromArgument === 'puppeteer_firefox') {
            try {
                await driver.waitFor(selector, { timeout: waitingTime } );
            } catch (error) {
                throw Error (`Timeout Error: Waiting for element to be located By(css selector)', ${selector}, Wait timed out after ${waitingTime}ms`);
            }
        }
    }

    async click(selector) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            await driver.findElement(By.css(selector)).click();
        } else if (fremworkFromArgument === 'puppeteer_chrome' || fremworkFromArgument === 'puppeteer_firefox') {
            await this.waitFor(selector);
            await driver.click(selector);
        }
    }

    async getText(selector) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            let element = await driver.findElement(By.css(selector));
            return await element.getText();
        } else if (fremworkFromArgument === 'puppeteer_chrome' || fremworkFromArgument === 'puppeteer_firefox') {
            await this.waitFor(selector);
            return await driver.$eval(selector, (text) => text.innerText);
        }
    }

    async getURL() {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            return await driver.getCurrentUrl();
        } else if (fremworkFromArgument === 'puppeteer_chrome' || fremworkFromArgument === 'puppeteer_firefox') {
            return await driver.url();
        }
    }

    async clear(selector) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            await driver.findElement(By.css(selector)).clear();
        } else if (fremworkFromArgument === 'puppeteer_chrome' || fremworkFromArgument === 'puppeteer_firefox') {
            await this.waitFor(selector);
            await this.click(selector);
            await driver.keyboard.down('Control');
            await driver.keyboard.press('KeyA');
            await driver.keyboard.up('Control');
            await driver.keyboard.press('Backspace');
        }
    }

    async getElementsCount(selector) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            return await driver.findElements(By.css(selector)).then(items => items.length);
        } else if (fremworkFromArgument === 'puppeteer_chrome' || fremworkFromArgument === 'puppeteer_firefox') {
            return await driver.$$eval(selector, items => items.length);
        }
	}
    async selectorExist(selector) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            return await driver.findElements(By.css(selector)) === null;
        } else if (fremworkFromArgument === 'puppeteer_chrome' || fremworkFromArgument === 'puppeteer_firefox') {
            return await driver.$(selector) !== null;
        }
	}

	// async reload() {
	// 	await this.driver.navigate().refresh();
	// 	await this.driver.sleep(1000);
	// }


}