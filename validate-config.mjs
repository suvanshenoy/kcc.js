import { readFileSync, statSync } from "node:fs";
import { logStatus } from "./log-status.mjs";

export const checkIfEmpty = (kittyTomlConfigFile) => {
	if (typeof kittyTomlConfigFile !== "string") {
		logStatus([
			"[status:fail]",
			`${kittyTomlConfigFile} is not of type 'string'`,
		]);
		logStatus([
			"[status:hint]",
			`Pass an 'string' instead of '${typeof kittyTomlConfigFile}'`,
		]);
		process.exit(1);
	}

	const kittyTomlConfigData = readFileSync(kittyTomlConfigFile, {
		encoding: "utf8",
	});

	if (
		!statSync(kittyTomlConfigFile).size ||
		!kittyTomlConfigData.length ||
		!Number.isNaN(Number(kittyTomlConfigData)) ||
		kittyTomlConfigData.toString().includes("#")
	) {
		logStatus(["[status:fail]", `'${kittyTomlConfigFile}' is empty`]);
		process.exit(1);
	}

	return kittyTomlConfigData;
};
