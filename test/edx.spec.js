import { expect } from 'chai';
import Driver from '../src/helpers/myDriver';
import EDX from '../src/edx/edxPage';

let myDriver, edx;

describe('Puppeteer test', () => {
	myDriver = new Driver();
	edx = new EDX();

	before(async () => {
		await myDriver.runDriver();
	});

	after(async () => {
		await myDriver.closeDriver();
	});

	it('OpenPage', async () => {
		await edx.openPage();
	});
	it('getTitle', async () => {
		expect(await edx.getTitle()).is.equal('edX | Free Online Courses by Harvard, MIT, & more');
	});
	it('changeLanguage', async () => {
		expect(await edx.changeLanguage()).is.equal('Enviar');
	});
	it('goToRegisterPage', async () => {
		//expect(await edx.goToAboutPage()).is.equal('');
	});
});
