(async ({
    preexpand = false,
    silent = false,
    override = true,
    skipProtos = false,
    skipGlobals = false,
    skipClasses = false
} = {}) => {
    const innards = {
        now: typeof globalThis.performance?.now === "function"
            ? ()=>Math.trunc(performance.now()) // use performance.now when available
            : Date.now,
        snapshots: {},
        version: '1.3.1'
    }
    // protoplus goes here
    if (preexpand) protoplus.expand({
        override,
        skipProtos,
        skipGlobals,
        skipClasses
    });

    globalThis.protoplus = protoplus;

    if (!silent) console.log(`proto+ v${innards.version} loaded!`);

    return innards;
})({
    preexpand: true,
    silent: true
});
