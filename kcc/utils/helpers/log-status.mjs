import chalk from "chalk";

export const logStatus = (status = ["[status:pass]", ""]) => {
	let [statusName, statusMesg] = [undefined, undefined];

	if (status[0] === "[status:pass]" || status[0] === "[status:hint]") {
		statusName = chalk.greenBright(status[0]);
		statusMesg = chalk.cyanBright(status[1]);
		console.log(`${statusName} ${statusMesg}`);
	}

	if (status[0] === "[status:fail]") {
		statusName = chalk.redBright(status[0]);
		statusMesg = chalk.cyanBright(status[1]);
		console.error(`${statusName} ${statusMesg}`);
	}
};
