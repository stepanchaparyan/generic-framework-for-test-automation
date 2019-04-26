import { By, until } from 'selenium-webdriver';
import args from 'minimist';

const argumentS = args(process.argv.slice(2));
const argument = argumentS._[1];

let selector = '#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input';

export default class Utils {
	constructor (driver, ) {
		this.driver = driver;
	}

    async goto (url) {
        if (argument === 'sel') {
            await this.driver.get(url);
        } else if (argument === 'pup') {
            await this.driver.goto(url);
        }
    }

    async type () {
        if (argument === 'sel') {
            console.log(`did type on ${selector}`);
            await this.driver.findElement(By.css(selector)).sendKeys('Selenium');
        } else if (argument === 'pup') {
            await this.driver.type(selector, 'Puppeteer');
        }
    }

	async wait(time) {
        if (argument === 'sel') {
            await this.driver.sleep(time);
        } else if (argument === 'pup') {
            await this.driver.waitFor(time);
        }
    }

    // async click(selector) {
    //     await this.driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
    //     await this.driver.findElement(By.css(selector)).click();
    // }

    // async sendKeys(selector, text) {
    //     await this.driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
    //     await this.driver.findElement(By.css(selector)).sendKeys(text);
    // }
    // async clear(selector) {
    //     await this.driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
    //     await this.driver.findElement(By.css(selector)).clear();
    // }

    // async getElementsLength(selector) {
    //     const length = await this.driver.findElements(By.css(selector)).then(bots => bots.length);
    //     return await length;
	// }

	// async getText(selector) {
	// 	await this.driver.wait(until.elementLocated(By.css(selector)), 10000, 'Could not locate the child element within the time specified');
	// 	let element = await this.driver.findElement(By.css(selector));
	// 	let text = await element.getText();
	// 	return await text;
	// }

	// async reload() {
	// 	await this.driver.navigate().refresh();
	// 	await this.driver.sleep(1000);
	// }



}