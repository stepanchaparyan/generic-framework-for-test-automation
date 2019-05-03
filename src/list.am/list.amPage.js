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
		await this.myDriver.type(LISTAM.LOGIN_PAGE.SELECTORS.INPUT_PASSWORD, 'Aram050182@');
		await this.myDriver.click(LISTAM.LOGIN_PAGE.SELECTORS.SUBMIT);
	}
    async getTitle () {
        return await this.myDriver.getTitle();
	}
	async clickOnReNewButtons () {
        const itemsCount = await this.myDriver.getElementsCount(LISTAM.MY_ACCOUNT_PAGE.SELECTORS.ITEMS);
		console.log(itemsCount);
		for (let i = 1; i < itemsCount+1; i++ ) {
			if (await this.myDriver.selectorExist(`#main > div.tabbody > div > div > div:nth-child(${i}) > div > div:nth-child(3) > div:nth-child(2) > a:nth-child(1) > img`)) {
				await this.myDriver.click(`#main > div.tabbody > div > div > div:nth-child(${i}) > div > div:nth-child(3) > div:nth-child(2) > a:nth-child(1) > img`);
				console.log('ok');
			} else {
				console.log('NOT');
			}
		}
	}

	// async changeLanguage () {
	// 	await this.myDriver.select(EDX.FIRST_PAGE.SELECTORS.SELECT_LANGUAGE, 'español');
	// 	await this.myDriver.click(EDX.FIRST_PAGE.SELECTORS.SUBMIT_LANGUAGE);
	// 	let text = await this.myDriver.getText(EDX.FIRST_PAGE.SELECTORS.SUBMIT_LANGUAGE);
	// 	await this.myDriver.select(EDX.FIRST_PAGE.SELECTORS.SELECT_LANGUAGE, 'english');
	// 	await this.myDriver.click(EDX.FIRST_PAGE.SELECTORS.SUBMIT_LANGUAGE);
	// 	return await text;
	// }
	// async goToAboutPage () {
	// 	await this.myDriver.click(EDX.FIRST_PAGE.SELECTORS.ABOUT);
	// 	let url = await this.myDriver.getURL();
	// 	await this.myDriver.click(EDX.FIRST_PAGE.SELECTORS.LOGO);
	// 	return await url;
	// }
	// async search () {
	// 	await this.myDriver.type(EDX.FIRST_PAGE.SELECTORS.SEARCH_INPUT, 'CS50');
	// 	await this.myDriver.click(EDX.FIRST_PAGE.SELECTORS.SEARCH_BUTTON);
	// 	let text = await this.myDriver.getText(EDX.SEARCH_PAGE.SELECTORS.VIEWING_RESULT_MATCHING);
	// 	return await text.substr(0,7);
	// }
}