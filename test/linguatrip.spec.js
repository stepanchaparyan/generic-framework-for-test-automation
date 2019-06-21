import { expect } from 'chai';
import Driver from '../src/helpers/myDriver';
import LinguaTrip from '../src/linguatrip/linguatrip';

let myDriver, linguatrip;

describe('LinguaTrip Test Examples', () => {
	myDriver = new Driver();
	linguatrip = new LinguaTrip();

	before(async () => {
		await myDriver.runDriver();
		await linguatrip.openPage();
		await myDriver.wait(1000);
	});

	after(async () => {
		await myDriver.closeDriver();
	});

	it('getTitle', async () => {
		expect(await linguatrip.getTitle()).is.equal('LinguaTrip - official webpage. Language courses abroad. Widest selection of accredited schools. Lowest price guarantee!');
	});
	it('getTitle2', async () => {
		expect(await linguatrip.getTitle()).is.equal('LinguaTrip - official webpage. Language courses abroad. Widest selection of accredited schools. Lowest price guarantee!');
	});
	it('getTitleFromHigherEduPage', async () => {
        expect(await linguatrip.getTitleFromHigherEduPage()).include('international presence');
	});

});
