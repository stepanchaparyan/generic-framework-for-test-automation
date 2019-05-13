import Driver from '../src/helpers/myDriver';
import mailSender from '../src/helpers/mailSender';

let myDriver;

describe('sendMail', () => {
	myDriver = new Driver();

	it('send Mail', async () => {
		await myDriver.runDriver();
		await mailSender(await myDriver.getBrowserVersion());
		await myDriver.closeDriver();
	});

});