class NoArgumentsError extends Error {
	constructor(message, code = "NO_ARGS_PROVIDED", details = null) {
		super(message);
		this.name = "NoArgumentsError";
		this.code = code;
		this.details = details;
	}
}

export default NoArgumentsError;
