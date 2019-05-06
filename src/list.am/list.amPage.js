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
	async clickOnReNewButtons () {
        const itemsCount = await this.myDriver.getElementsCount(LISTAM.MY_ACCOUNT_PAGE.SELECTORS.ITEMS);
		for (let i = 1; i < itemsCount+1; i++ ) {
			if (await this.myDriver.selectorExist(`#main > div.tabbody > div > div > div:nth-child(${i}) > div > div:nth-child(3) > div:nth-child(2) > a:nth-child(1) > img`)) {
				await this.myDriver.click(`#main > div.tabbody > div > div > div:nth-child(${i}) > div > div:nth-child(3) > div:nth-child(2) > a:nth-child(1) > img`);
				await this.myDriver.click(LISTAM.MY_ACCOUNT_PAGE.SELECTORS.RENEW_BUTTON_ON_DIALOG);
			}
		}
	}

}