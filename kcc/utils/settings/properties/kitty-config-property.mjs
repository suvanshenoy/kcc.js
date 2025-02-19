import fontProperty from "./font-property.mjs";
import textCursorProperty from "./text-cursor-property.mjs";
import scrollBackProperty from "./scrollback-property.mjs";
import mouseProperty from "./mouse-property.mjs";
import performanceTuningProperty from "./performance-tuning-property.mjs";
import terminalBellProperty from "./terminal-bell-property.mjs";
import windowLayoutProperty from "./window-layout-property.mjs";
import tabBarProperty from "./tab-bar-property.mjs";
import colorSchemeProperty from "./color-scheme-property.mjs";
import advancedProperty from "./advanced-property.mjs";
import osProperty from "./os-property.mjs";
import keyboardShortcutProperty from "./keyboard-shortcut-property.mjs";

const kittyConfigProperty = {
	...fontProperty,
	...textCursorProperty,
	...scrollBackProperty,
	...mouseProperty,
	...performanceTuningProperty,
	...terminalBellProperty,
	...windowLayoutProperty,
	...tabBarProperty,
	...colorSchemeProperty,
	...advancedProperty,
	...osProperty,
	...keyboardShortcutProperty,
};

export default kittyConfigProperty;
