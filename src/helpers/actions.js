import { By, until } from 'selenium-webdriver';
import args from 'minimist';

const argumentS = args(process.argv.slice(2));
let browserFromArgument, frameworkFromArgument;
let browser, capabilities;

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

export default class Actions {
	constructor (driver) {
        this.driver = driver;
	}
   async getBrowserVersion () {
        if (frameworkFromArgument === 'framework:selenium' && browserFromArgument === 'browser:chrome') {
            return `Selenium ${await capabilities.get('browserName')} ${await capabilities.get('version')}`;
        } else if (frameworkFromArgument === 'framework:selenium' && browserFromArgument === 'browser:firefox') {
            return `Selenium ${await capabilities.getBrowserName()} ${await capabilities.getBrowserVersion()}`;
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            return `Puppeteer ${await browser.version()}`;
        } else if (frameworkFromArgument === 'framework:selenium' && browserFromArgument === 'browser:edge') {
            return `Selenium ${await capabilities.getBrowserName()} ${await capabilities.getBrowserVersion()}`;
        }
    }

    async getTitle () {
        if (frameworkFromArgument === 'framework:selenium') {
            return await this.driver.getTitle();
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            return await this.driver.title();
        }
    }

    async goto (url) {
        if (frameworkFromArgument === 'framework:selenium') {
            await this.driver.get(url);
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            await this.driver.goto(url);
        }
    }

	async wait(time) {
        if (frameworkFromArgument === 'framework:selenium') {
            await this.driver.sleep(time);
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            await this.driver.waitFor(time);
        }
    }

    async waitFor(selector, waitingTime = 10000) {
        if (frameworkFromArgument === 'framework:selenium') {
            await this.driver.wait(until.elementLocated(By.css(selector)), waitingTime);
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            try {
                await this.driver.waitFor(selector, { timeout: waitingTime } );
            } catch (error) {
                throw Error (`Timeout Error: Waiting for element to be located By(css selector)', ${selector}, Wait timed out after ${waitingTime}ms`);
            }
        }
    }

    async click(selector) {
        if (frameworkFromArgument === 'framework:selenium') {
            await this.waitFor(selector);
            await this.driver.findElement(By.css(selector)).click();
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            await this.waitFor(selector);
            await this.driver.click(selector);
        }
    }

    async getText(selector) {
        if (frameworkFromArgument === 'framework:selenium') {
            await this.waitFor(selector);
            let element = await this.driver.findElement(By.css(selector));
            return await element.getText();
        } else if (frameworkFromArgument === 'framework:puppeteer') {
            await this.waitFor(selector);
            return await this.driver.$eval(selector, (text) => text.innerText);
        }
    }

    async type (selector, text) {
        if (frameworkFromArgument === 'selenium_chrome' || frameworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            await this.clear(selector);
            await this.driver.findElement(By.css(selector)).sendKeys(text);
        } else if (frameworkFromArgument === 'puppeteer_chrome' || frameworkFromArgument === 'puppeteer_firefox') {
            await this.waitFor(selector);
            await this.clear(selector);
            await this.driver.type(selector, text);
        }
    }

    async select (selector, text) {
        if (frameworkFromArgument === 'selenium_chrome' || frameworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            await this.driver.findElement(By.css(selector)).sendKeys(text);
        } else if (frameworkFromArgument === 'puppeteer_chrome' || frameworkFromArgument === 'puppeteer_firefox') {
            await this.waitFor(selector);
            await this.driver.type(selector, text);
        }
    }

    async getURL() {
        if (frameworkFromArgument === 'selenium_chrome' || frameworkFromArgument === 'selenium_firefox') {
            return await this.driver.getCurrentUrl();
        } else if (frameworkFromArgument === 'puppeteer_chrome' || frameworkFromArgument === 'puppeteer_firefox') {
            return await this.driver.url();
        }
    }

    async clear(selector) {
        if (frameworkFromArgument === 'selenium_chrome' || frameworkFromArgument === 'selenium_firefox') {
            await this.waitFor(selector);
            await this.driver.findElement(By.css(selector)).clear();
        } else if (frameworkFromArgument === 'puppeteer_chrome' || frameworkFromArgument === 'puppeteer_firefox') {
            await this.waitFor(selector);
            await this.click(selector);
            await this.driver.keyboard.down('Control');
            await this.driver.keyboard.press('KeyA');
            await this.driver.keyboard.up('Control');
            await this.driver.keyboard.press('Backspace');
        }
    }

    async getElementsCount(selector) {
        if (frameworkFromArgument === 'selenium_chrome' || frameworkFromArgument === 'selenium_firefox') {
            return await this.driver.findElements(By.css(selector)).then(items => items.length);
        } else if (frameworkFromArgument === 'puppeteer_chrome' || frameworkFromArgument === 'puppeteer_firefox') {
            return await this.driver.$$eval(selector, items => items.length);
        }
	}
    async selectorExist(selector) {
        if (frameworkFromArgument === 'selenium_chrome' || frameworkFromArgument === 'selenium_firefox') {
            return await this.driver.findElements(By.css(selector)) === null;
        } else if (frameworkFromArgument === 'puppeteer_chrome' || frameworkFromArgument === 'puppeteer_firefox') {
            return await this.driver.$(selector) !== null;
        }
	}

}