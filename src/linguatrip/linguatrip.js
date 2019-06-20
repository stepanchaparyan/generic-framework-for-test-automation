import Driver from '../helpers/myDriver';
import LINGUATRIP from './linguatripConstants';

export default class List_am {
	constructor () {
		this.myDriver = new Driver();
	}
    async openPage () {
        await this.myDriver.goto('https://linguatrip.com/en/');
	}
    async getTitle () {
        return await this.myDriver.getTitle();
	}
	async getTitleFromHigherEduPage () {
        await this.myDriver.click(LINGUATRIP.MAIN_PAGE.SELECTORS.HIGHER_EDUCATION);
        return await this.myDriver.getText(LINGUATRIP.HIGHER_EDUCATION_PAGE.SELECTORS.INTERNATIONAL_PRESENCE);
    }
}