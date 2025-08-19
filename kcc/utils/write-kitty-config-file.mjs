import { writeFileSync } from "node:fs";
import { logStatus } from "./helpers/log-status.mjs";
import { kittyConfigProperty } from "./settings/properties/kitty-config-property.mjs";

export const writeKittyConfigFile = (
	kittyOutputConfigFileName,
	kittyParsedTomlData,
) => {
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
		writeFileSync(kittyOutputConfigFileName, kittyConfigFileData, {
			encoding: "utf8",
		});
		logStatus([
			"[status:pass]",
			`configuration has been written to '${kittyOutputConfigFileName}'`,
		]);
		process.exit(0);
	} catch (kittyWriteError) {
		logStatus([
			"[status:fail]",
			`failed to write configuration to ${kittyOutputConfigFileName}: ${kittyWriteError.message}`,
		]);
		process.exit(1);
	}
};
