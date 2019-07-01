const mailSender = require('./mailSender');
const fs = require('fs');
const {promisify} = require('util');

const readFile = promisify(fs.readFile);
const sendMail = async function () {
	try {
		const report = await readFile('src/helpers/tmp.js', 'utf-8');
		mailSender(report);
		emptyFile();
	} catch (error) {
		throw new Error(error);
	}
};

const writeFile = promisify(fs.writeFile);
const emptyFile = async function () {
	try {
		await writeFile('src/helpers/tmp.js', '');
	} catch (error) {
		throw new Error(error);
	}
};

(async function () {
	try {
		const report = await readFile('src/helpers/tmp.js', 'utf-8');
		if (report.length !== 0) {
			sendMail();
		}

	} catch (error) {
		throw new Error(error);
	}
}());

