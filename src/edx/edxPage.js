import Driver from '../helpers/myDriver';
import EDX  from './edxConstants';
import { By, until } from 'selenium-webdriver';

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
		await this.myDriver.type(EDX.FIRST_PAGE.SELECTORS.SELECT_LANGUAGE, 'español');
		await this.myDriver.click(EDX.FIRST_PAGE.SELECTORS.SUBMIT_LANGUAGE);
		return await this.myDriver.getText(EDX.FIRST_PAGE.SELECTORS.SUBMIT_LANGUAGE);
	}
	async goToAboutPage() {
	}
}