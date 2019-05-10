import { Builder, By, until } from 'selenium-webdriver';
import launchPuppeteer from '../../settings_puppeteer/launchPuppeteer';
import * as puppeteerSettings from '../../settings_puppeteer/puppeteerSettings';
import chromeOptions from '../../settings_selenium/chromeOptions';
import firefoxOptions from '../../settings_selenium/firefoxOptions';
import args from 'minimist';
const argumentS = args(process.argv.slice(2));
const fremworkFromArgument = argumentS._[1];

let browser, driver, capabilities;

export default class Driver {

    async runDriver() {
        if (fremworkFromArgument === 'selenium_chrome') {
            driver = new Builder().forBrowser('chrome')
            .setChromeOptions(chromeOptions).build();
            capabilities = await driver.getCapabilities();
            console.log('Selenium -', await capabilities.get('browserName'), await capabilities.get('version'));
        } else if (fremworkFromArgument === 'selenium_firefox') {
            driver = new Builder().forBrowser('firefox')
            .withCapabilities(firefoxOptions).build();
            capabilities = await driver.getCapabilities();
            console.log('Selenium -',await capabilities.getBrowserName(), await capabilities.getBrowserVersion());
        } else if (fremworkFromArgument === 'puppeteer') {
            browser = await launchPuppeteer();
            driver = await browser.newPage();
            await driver.setViewport(puppeteerSettings.viewport);
            console.log('Puppeteer -', await browser.version());
        }
    }

    async closeDriver() {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await driver.sleep(1000);
            await driver.quit();
        } else if (fremworkFromArgument === 'puppeteer') {
            await browser.close();
        }
    }

    async getTitle () {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            return await driver.getTitle();
        } else if (fremworkFromArgument === 'puppeteer') {
            return await driver.title();
        }
    }

    async goto (url) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await driver.get(url);
        } else if (fremworkFromArgument === 'puppeteer') {
            await driver.goto(url);
        }
    }

    async type (selector, text) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            await this.clear(selector);
            await driver.findElement(By.css(selector)).sendKeys(text);
        } else if (fremworkFromArgument === 'puppeteer') {
            await this.waitFor(selector);
            await this.clear(selector);
            await driver.type(selector, text);
        }
    }

    async select (selector, text) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            await driver.findElement(By.css(selector)).sendKeys(text);
        } else if (fremworkFromArgument === 'puppeteer') {
            await this.waitFor(selector);
            await driver.type(selector, text);
        }
    }

	async wait(time) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await driver.sleep(time);
        } else if (fremworkFromArgument === 'puppeteer') {
            await driver.waitFor(time);
        }
    }

	async waitFor(selector, waitingTime = 10000) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await driver.wait(until.elementLocated(By.css(selector)), waitingTime);
        } else if (fremworkFromArgument === 'puppeteer') {
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
        } else if (fremworkFromArgument === 'puppeteer') {
            await this.waitFor(selector);
            await driver.click(selector);
        }
    }

    async getText(selector) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            let element = await driver.findElement(By.css(selector));
            return await element.getText();
        } else if (fremworkFromArgument === 'puppeteer') {
            await this.waitFor(selector);
            return await driver.$eval(selector, (text) => text.innerText);
        }
    }

    async getURL() {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            return await driver.getCurrentUrl();
        } else if (fremworkFromArgument === 'puppeteer') {
            return await driver.url();
        }
    }

    async clear(selector) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            await driver.findElement(By.css(selector)).clear();
        } else if (fremworkFromArgument === 'puppeteer') {
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
        } else if (fremworkFromArgument === 'puppeteer') {
            return await driver.$$eval(selector, items => items.length);
        }
	}
    async selectorExist(selector) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            return await driver.findElements(By.css(selector)) === null;
        } else if (fremworkFromArgument === 'puppeteer') {
            return await driver.$(selector) !== null;
        }
	}

	// async reload() {
	// 	await this.driver.navigate().refresh();
	// 	await this.driver.sleep(1000);
	// }


}