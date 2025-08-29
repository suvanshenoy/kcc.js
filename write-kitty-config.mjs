import { writeFileSync } from "node:fs";
import { logStatus } from "./log-status.mjs";
import { kittyConfigProperty } from "./properties/kitty-config-property.mjs";

export function writeKittyConfigFile(
	kittyOutputConfigFile,
	kittyParsedTomlData,
) {
	const kittyData = {};
	for (const [kittyKey, kittyProp] of Object.entries(kittyConfigProperty)) {
		let kittyValue = kittyParsedTomlData;
		for (const kittyPart of kittyProp.split(".")) {
			kittyValue = kittyValue[kittyPart];
			if (kittyValue === undefined) break;
		}
		if (kittyValue !== undefined) {
			kittyData[kittyKey] = kittyValue;
		}
	}

	let kittyConfigFileData = "";
	for (const [kittyProperty, kittyPropertyValue] of Object.entries(kittyData)) {
		kittyConfigFileData += `${kittyProperty} ${kittyPropertyValue}\n`;
	}

	try {
		writeFileSync(kittyOutputConfigFile, kittyConfigFileData, {
			encoding: "utf8",
		});
		logStatus([
			"[status:pass]",
			`configuration has been written to '${kittyOutputConfigFile}'`,
		]);
		process.exit(0);
	} catch (kittyWriteError) {
		logStatus([
			"[status:fail]",
			`failed to write configuration to ${kittyOutputConfigFile}: ${kittyWriteError.message}`,
		]);
		process.exit(1);
	}
}
