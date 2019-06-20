import Driver from '../helpers/myDriver';
import LISTAM from './list.amConstants';
//import { By, until } from 'selenium-webdriver';

export default class List_am {
	constructor () {
		this.myDriver = new Driver();
	}

    async openPage () {
        await this.myDriver.goto('https://list.am');
	}
	async login() {
		await this.myDriver.click(LISTAM.LOGIN_PAGE.SELECTORS.MY_ACCOUNT);
		await this.myDriver.type(LISTAM.LOGIN_PAGE.SELECTORS.INPUT_EMAIL, 'schaparian@yahoo.com');
		await this.myDriver.type(LISTAM.LOGIN_PAGE.SELECTORS.INPUT_PASSWORD, 'Aram050182!');
		await this.myDriver.click(LISTAM.LOGIN_PAGE.SELECTORS.SUBMIT);
	}
    async getTitle () {
        return await this.myDriver.getTitle();
	}
}