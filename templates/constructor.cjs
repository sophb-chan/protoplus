const fs = require('fs'),
	path = require('path'),
	synchronizedPrettier = require('@prettier/sync');

// =============== Get Required Resources =============== //
// Get templates
console.log('[Construct] Getting module templates...');

const ES6template = fs.readFileSync(
	path.join(__dirname, 'protoplus.template.mjs'),
	'utf8'
);
const webTemplate = fs.readFileSync(
	path.join(__dirname, 'protoplus.template.js'),
	'utf8'
);

// Get filler
console.log('[Construct] Getting module filler...');

const templateFiller = fs.readFileSync(
	path.join(__dirname, 'protoplus.filler.js'),
	'utf8'
);

// =============== Construct =============== //
console.log('[Construct] Constructing modules...');
const protoplusCommentRegex = /\/\/[\t ]*protoplus goes here(?:[\t ]*\/\/)|\/\*\s*protoplus goes here\s*\*\//m;

const ES6constructed = ES6template.replace(protoplusCommentRegex, templateFiller);
const webConstructed = webTemplate.replace(protoplusCommentRegex, templateFiller);

// =============== Prettify =============== //
// Get Prettier rules
console.log('[Prettify] Getting Prettier rules...');
const prettierRules = JSON.parse(
	fs.readFileSync(path.join(__dirname, '../.prettierrc.json'), 'utf8')
);

// Prettify ES6 module
console.log('[Prettify] Prettifying ES6 module...');
const ES6prettified = synchronizedPrettier.format(ES6constructed, {
	parser: 'babel',
	...prettierRules,
});
fs.writeFileSync(path.join(__dirname, '../protoplus.mjs'), ES6prettified);

// Prettify CommonJS module
const webPrettified = synchronizedPrettier.format(webConstructed, {
	parser: 'babel',
	...prettierRules,
});
console.log('[Prettify] Prettifying CommonJS module...');
fs.writeFileSync(path.join(__dirname, '../protoplus.js'), webPrettified);

// =============== Update Package Info =============== //
// Update version number in package.json
console.log('[Package] Updating package.json...');
const packageJSON = JSON.parse(
	fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
);
packageJSON.version = templateFiller.match(/(['"]?)version\1: "([^"]+)"/)[2];
fs.writeFileSync(
	path.join(__dirname, '../package.json'),
	JSON.stringify(packageJSON, null, 4)
);
// Update version number in package-lock.json
console.log('[Package] Updating package-lock.json...');
const packageLockJSON = JSON.parse(
	fs.readFileSync(path.join(__dirname, '../package-lock.json'), 'utf8')
);
packageLockJSON.version = templateFiller.match(/(['"]?)version\1: "([^"]+)"/)[2];
packageLockJSON.packages[''].version = templateFiller.match(/(['"]?)version\1: "([^"]+)"/)[2];
fs.writeFileSync(
	path.join(__dirname, '../package-lock.json'),
	JSON.stringify(packageLockJSON, null, 4)
);

// =============== Update Playground =============== //
// Copy proto+ to playground page
console.log('[Playground] Copying protoplus to playground page...');
fs.writeFileSync(path.join(__dirname, '../playground/protoplus.js'), webPrettified);

// =============== Final Send-off =============== //
console.log('Done!');
// Log final file outputs to console for your viewing pleasure!
const finalFiles = {
	'protoplus.js': webPrettified,
	'protoplus.mjs': ES6prettified,
	'package.json': packageJSON,
	'package-lock.json': packageLockJSON,
};
console.log(' ===== Final Code Output ===== ');
for (const [filename, content] of Object.entries(finalFiles)) {
	const arrowSize = 5;
	// Maybe find a way to make the arrow head connect to its tail?
	console.log(`<${'-'.repeat(arrowSize)} ${filename}`);
	console.log(content);
	console.log(`${'-'.repeat(arrowSize)}>`);
}
