import LINGUATRIP from './linguatripConstants';
import Actions from '../helpers/actions';

export default class LinguaTrip {
	constructor (driver) {
        this.actions = new Actions(driver);
	}
    async openPage () {
        await this.actions.goto('https://linguatrip.com/en/');
	}
    async getTitle () {
        return await this.actions.getTitle();
	}
	async getTitleFromHigherEduPage () {
        await this.actions.click(LINGUATRIP.MAIN_PAGE.SELECTORS.HIGHER_EDUCATION);
        return await this.actions.getText(LINGUATRIP.HIGHER_EDUCATION_PAGE.SELECTORS.INTERNATIONAL_PRESENCE);
    }
}