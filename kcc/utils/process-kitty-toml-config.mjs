import { readdir, readFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import toml from "toml";
import process from "node:process";
import writeKittyConfigFile from "./write-kitty-config-file.mjs";
import chalk from "chalk";
import logStatus from "./helpers/log-status.mjs";

const processKittyTomlConfig = (kittyDirectoryPath) => {

  if (kittyDirectoryPath !== path.join(os.homedir(), ".config/kitty")) {
    const origKittyDirectoryPath = path.join(os.homedir(), ".config/kitty");
    logStatus(["[status:fail]", `Please use the 'kcc' tool in '${origKittyDirectoryPath}'`]);
    logStatus(["[status:hint]", `Navigate to kitty directory using 'cd ${origKittyDirectoryPath}'`]);
    process.exit(1);
  }

  readdir(kittyDirectoryPath, (kittyReadDirError, kittyFiles) => {
    const kittyOutputConfigFileName = path.basename(path.join(kittyDirectoryPath, "kitty.conf"));
    if (kittyReadDirError) {
      throw kittyReadDirError;
    }

    const kittyFileArray = [];
    const extensionFileArray = [];
    for (const kittyFile of kittyFiles) {
      kittyFileArray.push(kittyFile);
      extensionFileArray.push(kittyFile.split('.').at(-1));
    }


    if (!extensionFileArray.filter((file) => !file.startsWith(".")).includes("toml")) {
      logStatus(["[status:fail]", `'TOML' file doesnt exist in '${kittyDirectoryPath}'`]);
      logStatus(["[status:hint]", "Create a toml file using 'touch [file_name].toml'"]);
      process.exit(1);
    }

    for (const kittyFile of kittyFileArray.filter((file) => !file.startsWith("."))) {
      if (kittyFile.split('.').at(-1) === "toml") {
        const kittyTomlFile = kittyFile;
        const kittyTomlConfigData = readFileSync(path.join(kittyDirectoryPath, kittyTomlFile), { encoding: 'utf8' });
        const kittyParsedTomlData = toml.parse(kittyTomlConfigData);
        writeKittyConfigFile(kittyOutputConfigFileName, kittyParsedTomlData);
      }
    }
  });
}

export default processKittyTomlConfig;
