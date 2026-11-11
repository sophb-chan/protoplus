#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

import { readResources, ROOT_DIR } from './lib/resources.js';
import { fillTemplate, matchFillerVersion } from './lib/construct.js';
import { prettify } from './lib/prettify.js';
import { syncPackageVersion } from './lib/package-info.js';
import { shouldSendOff, printSendOff } from './lib/send-off.js';

const main = () => {
	// =============== Get Required Resources =============== //
	console.log('[Construct] Getting module templates...');
	console.log('[Construct] Getting module filler...');
	const {
		esTemplate,
		cjsTemplate,
		webTemplate,
		filler,
		prettierRules,
		packageJSON,
		packageLockJSON,
	} = readResources();

	// =============== Construct =============== //
	console.log('[Construct] Constructing modules...');
	const constructed = {
		mjs: fillTemplate(esTemplate, filler),
		cjs: fillTemplate(cjsTemplate, filler),
		web: fillTemplate(webTemplate, filler),
	};

	// =============== Prettify =============== //
	console.log('[Prettify] Getting Prettier rules...');
	console.log('[Prettify] Prettifying ES6 module...');
	const ES6prettified = prettify(constructed.mjs, prettierRules);
	fs.writeFileSync(path.join(ROOT_DIR, 'protoplus.mjs'), ES6prettified);

	console.log('[Prettify] Prettifying CommonJS module...');
	const CJSprettified = prettify(constructed.cjs, prettierRules);
	fs.writeFileSync(path.join(ROOT_DIR, 'protoplus.cjs'), CJSprettified);

	console.log('[Prettify] Prettifying Web JS module...');
	const webPrettified = prettify(constructed.web, prettierRules);
	fs.writeFileSync(path.join(ROOT_DIR, 'protoplus.js'), webPrettified);

	// =============== Update Package Info =============== //
	const version = matchFillerVersion(filler);
	console.log('[Package] Updating package.json...');
	console.log('[Package] Updating package-lock.json...');
	syncPackageVersion(version, packageJSON, packageLockJSON);

	// =============== Update Playground =============== //
	console.log('[Playground] Copying protoplus to playground page...');
	fs.writeFileSync(path.join(ROOT_DIR, 'playground', 'protoplus.js'), webPrettified);

	// =============== Final Send-off =============== //
	// Printed in the GitHub Actions workflow logs (GITHUB_ACTIONS=true);
	// suppressed on local runs. Use --send-off / --no-send-off to override.
	if (shouldSendOff()) {
		printSendOff({
			'protoplus.js': webPrettified,
			'protoplus.mjs': ES6prettified,
			'protoplus.cjs': CJSprettified,
			'package.json': packageJSON,
			'package-lock.json': packageLockJSON,
		});
	}
};

try {
	main();
} catch (err) {
	console.error(`[Construct] Failed: ${err?.message ?? err}`);
	process.exit(1);
}
