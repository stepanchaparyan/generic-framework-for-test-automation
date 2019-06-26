import { expect } from 'chai';
import Driver from '../src/helpers/myDriver';
import LinguaTrip from '../src/linguatrip/linguatrip';

import Utils from '../src/helpers/utils';
import args from 'minimist';
import * as testRailCreds from '../settings_testrail/testRailSettings';
import TestRailAPI from 'api-testrail';

let testRailApi, runID, caseID;
const argumentS = args(process.argv.slice(2));
const runWithTestRail = argumentS._.includes('TestRail') ? true : false;
let myDriver, utils, linguatrip;

describe('LinguaTrip Test Examples', () => {
	myDriver = new Driver();
	linguatrip = new LinguaTrip();
	utils = new Utils();

	before(async () => {
		await myDriver.runDriver();
		await linguatrip.openPage();
		await myDriver.wait(1000);
		if (runWithTestRail) {
			testRailApi = new TestRailAPI(testRailCreds.host,testRailCreds.username, testRailCreds.password);
			// set runID provided argument2 (if exist) or create new run
			runID = await utils.addRunWithType(testRailApi,1,3);
		}
	});

	afterEach(async () => {
		if (runWithTestRail) {
			if (await testRailApi.getResultForCase(runID,caseID) !== 1) {
				await testRailApi.addResultForCase(runID,caseID,5);
			}
		}
	});

	after(async () => {
		await myDriver.closeDriver();
	});

	it('C12  getTitle', async function () {
		// get test ID
		caseID = this.test.title.substr(1,3).trim();
		// run tests
		expect(await linguatrip.getTitle()).is.equal('LinguaTrip - official webpage. Language courses abroad. Widest selection of accredited schools. Lowest price guarantee!');
		// update TestRail if corresponding argument(TestRail) is provided
		await utils.addResultForCase(testRailApi, runID, caseID);
	});
	it('C13  getTitleFromHigherEduPage', async function () {
		// get test ID
		caseID = this.test.title.substr(1,3).trim();
		// run tests
        expect(await linguatrip.getTitleFromHigherEduPage()).include('international presence');
		// update TestRail if corresponding argument(TestRail) is provided
		await utils.addResultForCase(testRailApi, runID, caseID);
	});

});
