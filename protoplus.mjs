const now =
	typeof globalThis.performance?.now === 'function'
		? () => Math.trunc(performance.now()) // use performance.now when available
		: Date.now;

const snapshots = {};
// protoplus goes here

export default protoplus;
export { protoplus };

console.log(`proto+ v${protoplus.version} loaded!`);
