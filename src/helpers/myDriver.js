import { Builder, By, until } from 'selenium-webdriver';
import launchPuppeteer from '../../settings_puppeteer/launchPuppeteer';
import * as puppeteerSettings from '../../settings_puppeteer/puppeteerSettings';
import chromeOptions from '../../settings_selenium/chromeOptions';
import firefoxOptions from '../../settings_selenium/firefoxOptions';
import args from 'minimist';
const argumentS = args(process.argv.slice(2));
const fremworkFromArgument = argumentS._[1];

let browser, driver;

export default class Driver {

    async runDriver() {
        if (fremworkFromArgument === 'selenium_chrome') {
            driver = new Builder().forBrowser('chrome')
            .setChromeOptions(chromeOptions).build();
        } else if (fremworkFromArgument === 'selenium_firefox') {
            driver = new Builder().forBrowser('firefox')
            .withCapabilities(firefoxOptions).build();
        } else if (fremworkFromArgument === 'puppeteer') {
            browser = await launchPuppeteer();
            driver = await browser.newPage();
            await driver.setViewport(puppeteerSettings.viewport);
        }
    }

    async closeDriver() {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
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
            await driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
            await this.clear(selector);
            await driver.findElement(By.css(selector)).sendKeys(text);
        } else if (fremworkFromArgument === 'puppeteer') {
            await driver.waitFor(selector);
            await this.clear(selector);
            await driver.type(selector, text);
        }
    }

    async select (selector, text) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
            await driver.findElement(By.css(selector)).sendKeys(text);
        } else if (fremworkFromArgument === 'puppeteer') {
            await driver.waitFor(selector);
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

    async click(selector) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the element within the time specified');
            await driver.findElement(By.css(selector)).click();
        } else if (fremworkFromArgument === 'puppeteer') {
            await driver.waitFor(selector);
            await driver.click(selector);
        }
    }

    async getText(selector) {
        if (fremworkFromArgument === 'selenium_chrome' || fremworkFromArgument === 'selenium_firefox') {
            await driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
            let element = await driver.findElement(By.css(selector));
            return await element.getText();
        } else if (fremworkFromArgument === 'puppeteer') {
            await driver.waitForSelector(selector, {visible: true});
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
            await driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
            await driver.findElement(By.css(selector)).clear();
        } else if (fremworkFromArgument === 'puppeteer') {
            await this.click(selector);
            await driver.keyboard.down('Control');
            await driver.keyboard.press('KeyA');
            await driver.keyboard.up('Control');
            await driver.keyboard.press('Backspace');
        }
    }


    // async getElementsLength(selector) {
    //     const length = await this.driver.findElements(By.css(selector)).then(bots => bots.length);
    //     return await length;
	// }

	// async reload() {
	// 	await this.driver.navigate().refresh();
	// 	await this.driver.sleep(1000);
	// }



}