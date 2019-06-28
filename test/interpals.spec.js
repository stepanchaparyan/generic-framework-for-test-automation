import { expect } from 'chai';
import Driver from '../src/helpers/myDriver';
import Interpals from '../src/interpals/interpalsPage';

let myDriver, driver, interpals;

describe('Interpals Test Examples', () => {
	before(async () => {
		myDriver = new Driver();
		driver = await myDriver.runDriver();
		interpals = new Interpals(driver);
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

