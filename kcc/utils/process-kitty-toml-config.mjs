import { readdir, readFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import toml from "toml";
import process from "node:process";
import writeKittyConfigFile from "./write-kitty-config-file.mjs";
import chalk from "chalk";

const processKittyTomlConfig = (kittyDirectoryPath) => {

  if (kittyDirectoryPath !== path.join(os.homedir(), ".config/kitty")) {
    const origKittyDirectoryPath = path.join(os.homedir(), ".config/kitty");
    const failStatus = chalk.redBright("[status:fail]");
    const hintStatus = chalk.greenBright("[status:hint]");
    const hintMesg = chalk.cyanBright(`Navigate to kitty directory using 'cd ${origKittyDirectoryPath}'`);
    const failStatusMesg = chalk.cyanBright(`Please use the 'kcc' tool in '${origKittyDirectoryPath}'`);
    console.error(`${failStatus} ${failStatusMesg}\n${hintStatus} ${hintMesg}`);
    process.exit(0);
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
      const failStatus = chalk.redBright("[status:fail]");
      const failStatusMesg = chalk.cyanBright(` 'TOML' file doesnt exist in '${kittyDirectoryPath}'`);
      console.log(`${failStatus} ${failStatusMesg}`);
      process.exit(0);
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
