import { Builder, By, until } from 'selenium-webdriver';
import launchPuppeteer from '../../settings_puppeteer/launchPuppeteer';
import * as puppeteerSettings from '../../settings_puppeteer/puppeteerSettings';
import chromeOptions from '../../settings_selenium/chromeOptions';
import args from 'minimist';
const argumentS = args(process.argv.slice(2));
const fremworkFromArgument = argumentS._[1];

let browser, driver;
let selector = '#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input';

export default class Driver {
   
    async runDriver() {
        if (fremworkFromArgument == 'selenium') {
            driver = new Builder().forBrowser('chrome')
            .setChromeOptions(chromeOptions).build();
        } else if (fremworkFromArgument == 'puppeteer') {
            browser = await launchPuppeteer();
            driver = await browser.newPage();
            await driver.setViewport(puppeteerSettings.viewport);
        } else {
            throw new Error('Please provide framework name, i.e. selenium or puppeteer');
        }        
    }	

    async closeDriver() {
        if (fremworkFromArgument == 'selenium') { 
            await driver.quit();
        } else if (fremworkFromArgument == 'puppeteer') {
            await browser.close();
        }
    }

    async getTitle () {
        if (fremworkFromArgument === 'selenium') {
            return await driver.getTitle();
        } else if (fremworkFromArgument === 'puppeteer') {
            return await driver.title();
        }
    }

    async goto (url) {
        if (fremworkFromArgument === 'selenium') {
            await driver.get(url);
        } else if (fremworkFromArgument === 'puppeteer') {
            await driver.goto(url);
        }
    }

    async type (selector, text) {
        if (fremworkFromArgument === 'selenium') {
            await driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
            await driver.findElement(By.css(selector)).sendKeys(text);
        } else if (fremworkFromArgument === 'puppeteer') {
            await driver.waitFor(selector);
            await driver.type(selector, text);
        }
    }

	async wait(time) {
        if (fremworkFromArgument === 'selenium') {
            await driver.sleep(time);
        } else if (fremworkFromArgument === 'puppeteer') {
            await driver.waitFor(time);
        }
    }

    async click(selector) {
        if (fremworkFromArgument === 'selenium') {
            await driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the element within the time specified');
            await driver.findElement(By.css(selector)).click();
        } else if (fremworkFromArgument === 'puppeteer') {
            await driver.waitFor(selector);
            await driver.click(selector);
        }
    }

    async getText(selector) {
        if (fremworkFromArgument === 'selenium') {
            await driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
            let element = await driver.findElement(By.css(selector));
            let text = await element.getText();
            return await text;
        } else if (fremworkFromArgument === 'puppeteer') {
            await driver.waitForSelector(selector, {visible: true});
            const text = await driver.$eval(selector, (text) => text.innerText);
            return await text;
        }
    }

    // async clear(selector) {
    //     await this.driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
    //     await this.driver.findElement(By.css(selector)).clear();
    // }

    // async getElementsLength(selector) {
    //     const length = await this.driver.findElements(By.css(selector)).then(bots => bots.length);
    //     return await length;
	// }

	// async reload() {
	// 	await this.driver.navigate().refresh();
	// 	await this.driver.sleep(1000);
	// }



}