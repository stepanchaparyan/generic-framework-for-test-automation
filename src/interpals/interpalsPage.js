import INTERPALS from './interpalsConstants';
import Actions from '../helpers/actions';

export default class InterpalsPage {
	constructor (driver) {
		this.actions = new Actions(driver);
	}

    async openPage () {
        await this.actions.goto('https://www.interpals.net/');
	}
    async getTitle () {
        return await this.actions.getTitle();
	}
	async goToAboutPage () {
		await this.actions.click(INTERPALS.FIRST_PAGE.SELECTORS.ABOUT);
		let text = await this.actions.getText(INTERPALS.FIRST_PAGE.SELECTORS.ABOUT_TEXT);
		return await text;
	}

}