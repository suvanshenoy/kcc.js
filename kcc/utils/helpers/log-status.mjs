import chalk from "chalk";
import process from "node:process";

export const logStatus = (status = ["[status:pass]", ""]) => {
	if (!Array.isArray(status)) {
		logStatus(["[status:fail]", "'status' is not of type 'array'"]);
		logStatus([
			"[status:hint]",
			`Pass an 'array' instead of '${typeof status}'`,
		]);
		process.exit(1);
	}

	if (typeof status[0] !== "string") {
		logStatus(["[status:fail]", "'status[0]' is not of type 'string'"]);
		logStatus([
			"[status:hint]",
			`Pass an 'string' instead of '${typeof status}'`,
		]);
		process.exit(1);
	}

	if (typeof status[1] !== "string") {
		logStatus(["[status:fail]", "'status[1]' is not of type 'string'"]);
		logStatus([
			"[status:hint]",
			`Pass an 'string' instead of '${typeof status}'`,
		]);
		process.exit(1);
	}

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
