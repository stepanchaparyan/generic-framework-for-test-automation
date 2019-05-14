import Driver from '../helpers/myDriver';
import INTERPALS from './interpalsConstants';
//import { By, until } from 'selenium-webdriver';

export default class InterpalsPage {
	constructor () {
		this.myDriver = new Driver();
	}

    async openPage () {
        await this.myDriver.goto('https://www.interpals.net/');
	}
    async getTitle () {
        return await this.myDriver.getTitle();
	}
	async goToAboutPage () {
		await this.myDriver.click(INTERPALS.FIRST_PAGE.SELECTORS.ABOUT);
		let text = await this.myDriver.getText(INTERPALS.FIRST_PAGE.SELECTORS.ABOUT_TEXT);
		return await text;
	}

}