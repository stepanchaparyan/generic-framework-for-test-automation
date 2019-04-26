import { expect } from 'chai';
import launchPuppeteer from '../settings_puppeteer/launchPuppeteer';
import * as puppeteerSettings from '../settings_puppeteer/puppeteerSettings';
import Utils from '../src/helpers/utils';
import chromeOptions from '../settings_selenium/chromeOptions';
import { Builder } from 'selenium-webdriver';
import args from 'minimist';
const argumentS = args(process.argv.slice(2));
const myArg = argumentS._[1];

let browser, driver, utils;

describe('Puppeteer test', () => {
	before(async () => {
		// getdriver(argumentS) {
		//	if 
		//}
		if (myArg == 'pup') {
			browser = await launchPuppeteer();
			driver = await browser.newPage();
			await driver.setViewport(puppeteerSettings.viewport);
		} else if (myArg == 'sel') {
			driver = new Builder().forBrowser('chrome')
			.setChromeOptions(chromeOptions).build();
		}
		utils = new Utils(driver);
	});
	after(async () => {
		if (myArg == 'pup') { 
			await browser.close();
		} else if (myArg == 'sel') {
			await driver.quit();
		}	
	});

	it('Puppeteer test example', async () => {
		expect(true).to.equal(true);
	});
	it('Google', async () => {
		await utils.goto('https://google.com');
		await utils.wait(1000);
		await utils.type();
		await utils.wait(2000);
	});

});
