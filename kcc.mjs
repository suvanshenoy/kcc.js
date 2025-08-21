import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { Command } from "commander";
import { logStatus } from "./log-status.mjs";
import { processKittyTomlConfig } from "./process-kitty-toml-config.mjs";

const program = new Command();

program
	.name("kcc")
	.version("0.0.1")
	.description("This tool is a flexible configuration converter for kitty")
	.option("--file <TOML_file_path>", "specify TOML file path");

program.parse(process.argv);

if (!process.argv.slice(2).length) {
	logStatus([
		"[status:fail]",
		"No arguments provided. Please pass at least one option",
	]);
	logStatus([
		"[status:hint]",
		"Try running `kcc --help` or `kcc -h` for usage information",
	]);
	process.exit(1);
}

const options = program.opts();

if (options.file) {
	const filePath = path.resolve(options.file);
	if (!existsSync(filePath)) {
		logStatus([
			"[status:fail]",
			`File '${options.file}' does not exist in '${process.cwd()}'`,
		]);
		process.exit(1);
	}
	processKittyTomlConfig(process.cwd());
}
