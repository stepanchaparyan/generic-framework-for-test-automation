import { expect } from 'chai';
import Driver from '../src/helpers/myDriver';
import Interpals from '../src/interpals/interpalsPage';

let myDriver, interpals;

describe('Interpals Test Examples', () => {
	myDriver = new Driver();
	interpals = new Interpals();

	before(async () => {
		await myDriver.runDriver();
		await interpals.openPage();
	});
	after(async () => {
		await myDriver.closeDriver();
	});

	it('getTitle', async () => {
		expect(await interpals.getTitle()).is.equal('InterPals: Meet the World. Make friends, travel and learn languages today!');
	});
	it('goToAboutPage', async () => {
		const aboutPageURL = await interpals.goToAboutPage();
		expect(aboutPageURL).is.equal('About InterPals');
	});
});