import { readFileSync, statSync } from "node:fs";
import { logStatus } from "./log-status.mjs";

export const checkIfEmpty = (kittyTomlFile) => {
	if (typeof kittyTomlFile !== "string") {
		logStatus([
			"[status:fail]",
			`${kittyDirectoryPath} is not of type 'string'`,
		]);
		logStatus([
			"[status:hint]",
			`Pass an 'string' instead of '${typeof kittyDirectoryPath}'`,
		]);
		process.exit(1);
	}

	if (
		!statSync(kittyTomlFile).size ||
		!readFileSync(kittyTomlFile).length ||
		!Number.isNaN(Number(readFileSync(kittyTomlFile)))
	) {
		logStatus(["[status:fail]", `'${kittyTomlFile}' is empty`]);
		process.exit(1);
	}
};
