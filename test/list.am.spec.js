import { expect } from 'chai';
import Driver from '../src/helpers/myDriver';
import LISTAM from '../src/list.am/list.amPage';

let myDriver, listam;

describe('LIST.AM Test Examples', () => {
	myDriver = new Driver();
	listam = new LISTAM();

	before(async () => {
		await myDriver.runDriver();
		await listam.openPage();
		await listam.login();
		await myDriver.wait(1000);
	});

	after(async () => {
		await myDriver.closeDriver();
	});

	it('getTitle', async () => {
		expect(await listam.getTitle()).is.equal('List.am - Հայաստանի հայտարարություններ');
	});

});
