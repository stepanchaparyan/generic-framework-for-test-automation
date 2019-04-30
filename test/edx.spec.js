import { expect } from 'chai';
import Driver from '../src/helpers/myDriver';
import EDX from '../src/edx/edxPage';

let myDriver, edx;

describe('Test Examples', () => {
	myDriver = new Driver();
	edx = new EDX();

	before(async () => {
		await myDriver.runDriver();
		await edx.openPage();
	});

	after(async () => {
		await myDriver.closeDriver();
	});


	it('getTitle', async () => {
		expect(await edx.getTitle()).is.equal('edX | Free Online Courses by Harvard, MIT, & more');
	});
	it('changeLanguage', async () => {
		const spanishWord = await edx.changeLanguage();
		expect(spanishWord).is.equal('Enviar');
	});
	it('goToAboutPage', async () => {
		const aboutPageURL = await edx.goToAboutPage();
		expect(aboutPageURL).is.equal('https://www.edx.org/about-us');
	});
	it('search', async () => {
		const anyTextFromResultPage = await edx.search();
		expect(anyTextFromResultPage).is.equal('Viewing');
	});
});
