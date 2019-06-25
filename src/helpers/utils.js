import args from 'minimist';

const argumentS = args(process.argv.slice(2));
const runWithTestRail = argumentS._.includes('TestRail') ? true : false;
console.log(argumentS._);
let argsListWithTrueFalseNaN = argumentS._.map((arg) => isNaN(arg));
let thereIsNumber = argsListWithTrueFalseNaN.includes(false);

const numFromArgs = argsListWithTrueFalseNaN.indexOf(false);
const runIDFromArgs = argumentS._[numFromArgs];

export default class Utils {

	async addResultForCase(testRailApi, runID, caseID) {
		if (runWithTestRail) {
			await testRailApi.addResultForCase(runID,caseID,1);
		}
	}
	async addRunWithType(testRailApi, projectID, typeID) {
		let runID;
		if (runWithTestRail) {
			if (!thereIsNumber) {
				runID = await testRailApi.addRunWithType(projectID, typeID);
			} else {
				runID = runIDFromArgs;
			}
		return runID;
		}
	}

}
