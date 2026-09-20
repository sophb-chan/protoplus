(async (
	options = {
		preexpand: false,
		silent: false,
		override: true,
		skipProtos: false,
		skipClasses: false,
		skipGlobals: false,
	}
) => {
	// innards
	const now =
		typeof globalThis.performance?.now === 'function'
			? () => Math.trunc(performance.now()) // Use performance.now when available
			: Date.now;
	const snapshots = {};

	// protoplus goes here

	if (options.preexpand) protoplus.expand(options);

	globalThis.protoplus = protoplus;

	if (!silent) console.log(`proto+ v${protoplus.version} loaded!`);
	return protoplus;
})({
	preexpand: false,
	silent: true,
});
