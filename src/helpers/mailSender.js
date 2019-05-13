import nodemailer from 'nodemailer';
import creds from './nodemailerCreds';
import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
module.exports = async function (browserVersion) {
	try {
		const report = JSON.parse(await readFile('./mochawesome-report/mochawesome.json', 'utf-8'));
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			port: 587,
			secure: false,
			auth: {
				user: creds.email,
				pass: creds.password
			}
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"Test Automation" <uiautotesting@gmail.com>', // sender address
			to: ' "Customer" chaparyanstepan@gmail.com', // list of receivers
			subject: 'Test results ✔', // Subject line
			html: ` <h1><b>See report for last test <b></h1>					
					<h2><b>Brower Version - ${browserVersion} <b></h2>
					<h2>Tests - <b>${report.stats.tests} <b></h2>
					<p>Pass - <b>${report.stats.passes} <b></p>
              		<p>Pending - <b>${report.stats.pending}<b></p>
					<p>Fail - <b>${report.stats.failures} <b></p> 
					<h3>Test duration - <b>${report.stats.duration}s<b></h3> 
              		`
		});

		console.log('Message sent to: ', info.accepted[0]);
	} catch (error) {
		throw new Error(error);
	}
};
