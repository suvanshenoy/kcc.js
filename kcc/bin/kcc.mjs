import processKittyTomlConfig from "../utils/process-kitty-toml-config.mjs";
import process from "node:process";
import { Command } from "commander";
import NoArgumentsError from "../errors/no-arguments-error.mjs";
import { existsSync } from "node:fs";
import path from "node:path";

const program = new Command();

program
	.name("kcc")
	.version("0.0.1")
	.description("This tool is a flexible configuration converter for kitty")
	.option("--file <TOML_file_path>", "specify TOML file path");

program.parse(process.argv);

if (!process.argv.slice(2).length) {
	throw new NoArgumentsError(
		"No arguments provided. Please pass at least one option",
		"NO_ARGS_PROVIDED",
		{ hint: "Try runing `kcc --help` or `kcc -h` for usage information." },
	);
}

const options = program.opts();

if (options.file) {
	const filePath = path.resolve(options.file);
	if (!existsSync(filePath)) {
		throw new Error(
			`File '${options.file}' does not exist in '${process.cwd()}'.`,
		);
	}
	processKittyTomlConfig(process.cwd());
}
