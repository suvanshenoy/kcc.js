import { writeFileSync } from "node:fs";
import chalk from "chalk";

const writeKittyConfigFile = (kittyOutputConfigFileName, kittyParsedTomlData) => {
  const kittyPropertyMap = {
    font_family: "font.family",
    font_size: "font.size",
    background_opacity: "window.background_opacity",
    hide_window_decorations: "window.hide_window_decorations",
    background: "colors.background",
    foreground: "colors.foreground",
    cursor_color: "colors.cursor_color"
  };

  let kittyData = {};

  for (const [kittyKey, kittyPath] of Object.entries(kittyPropertyMap)) {
    let kittyValue = kittyParsedTomlData;
    for (const kittyPart of kittyPath.split('.')) {
      kittyValue = kittyValue[kittyPart];
      if (kittyValue === undefined) break;
    }
    if (kittyValue !== undefined) {
      kittyData[kittyKey] = kittyValue;
    }
  }

  let kittyConfigFileData = '';
  for (const [kittyProperty, kittyPropertyValue] of Object.entries(kittyData)) {
    kittyConfigFileData += `${kittyProperty} ${kittyPropertyValue}\n`;
  }

  try {
    writeFileSync(kittyOutputConfigFileName, kittyConfigFileData, { encoding: 'utf8' });
    const passStatus = chalk.greenBright("[status:pass]");
    const passStatusMesg = chalk.cyanBright(`configuration has been written to '${kittyOutputConfigFileName}'`);
    console.log(`${passStatus} ${passStatusMesg}`);
  } catch (kittyWriteError) {
    throw kittyWriteError;
  }
}

export default writeKittyConfigFile;
