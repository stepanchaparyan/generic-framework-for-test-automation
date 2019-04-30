import Driver from '../helpers/myDriver';
import EDX from './edxConstants';
//import { By, until } from 'selenium-webdriver';

export default class EDX_ORG {
	constructor () {
		this.myDriver = new Driver();
	}

    async openPage() {
        await this.myDriver.goto('https://edx.org');
	}
    async getTitle() {
        return await this.myDriver.getTitle();
	}
	async changeLanguage() {
		await this.myDriver.select(EDX.FIRST_PAGE.SELECTORS.SELECT_LANGUAGE, 'español');
		await this.myDriver.click(EDX.FIRST_PAGE.SELECTORS.SUBMIT_LANGUAGE);
		let text = await this.myDriver.getText(EDX.FIRST_PAGE.SELECTORS.SUBMIT_LANGUAGE);
		await this.myDriver.select(EDX.FIRST_PAGE.SELECTORS.SELECT_LANGUAGE, 'english');
		await this.myDriver.click(EDX.FIRST_PAGE.SELECTORS.SUBMIT_LANGUAGE);
		return await text;
	}
	async goToAboutPage() {
		await this.myDriver.click(EDX.FIRST_PAGE.SELECTORS.ABOUT);
		let url = await this.myDriver.getURL();
		await this.myDriver.click(EDX.FIRST_PAGE.SELECTORS.LOGO);
		return await url;
	}
	async search() {
		await this.myDriver.type(EDX.FIRST_PAGE.SELECTORS.SEARCH_INPUT, 'CS50');
		await this.myDriver.click(EDX.FIRST_PAGE.SELECTORS.SEARCH_BUTTON);
		let text = await this.myDriver.getText(EDX.SEARCH_PAGE.SELECTORS.VIEWING_RESULT_MATCHING);
		return await text.substr(0,7);
	}
}