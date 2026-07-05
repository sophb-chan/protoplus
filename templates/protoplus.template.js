(async ({
    preexpand = false,
    silent = false,
    override = true,
    skipProtos = false,
    skipGlobals = false,
    skipClasses = false
} = {}) => {
    // innards
    const now = typeof globalThis.performance?.now === "function"
            ? ()=>Math.trunc(performance.now()) // use performance.now when available
            : Date.now;
    const snapshots = {};

    // protoplus goes here

    if (preexpand) protoplus.expand({
        override,
        skipProtos,
        skipGlobals,
        skipClasses
    });

    globalThis.protoplus = protoplus;

    if (!silent) console.log(`proto+ v${protoplus.version} loaded!`);
    return protoplus;
})({
    preexpand: true,
    silent: true
});
