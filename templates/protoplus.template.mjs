const now =
	typeof globalThis.performance?.now === "function"
		? () => Math.trunc(performance.now()) // Use performance.now when available
		: Date.now;

const snapshots = {};
// protoplus goes here

const options = {
	silent: true,
	preexpand: false
};

export default protoplus;
export {
	protoplus
}

console.log(`proto+ v${protoplus.version} loaded!`);
