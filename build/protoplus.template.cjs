const now =
	typeof globalThis.performance?.now === "function"
		? () => Math.trunc(performance.now()) // Use performance.now when available
		: Date.now;

const snapshots = {};
// protoplus goes here

const options = {
	silent: true,
};

module.exports = protoplus;
if (!options.silent) console.log(`proto+ v${protoplus.version} loaded!`);
