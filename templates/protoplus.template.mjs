const now =
	typeof globalThis.performance?.now === "function"
		? () => Math.trunc(performance.now()) // use performance.now when available
		: Date.now;

const snapshots = {};
// protoplus goes here

globalThis.protoplus = protoplus;

console.log(`proto+ v${protoplus.version} loaded!`);
