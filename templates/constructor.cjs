const fs = require('fs');
const synchronizedPrettier = require('@prettier/sync');
const path = require('path');
const { cwd } = require('process');

// get templates and filler
console.log('[Construct] Getting module templates...');

const moduleTemplate = fs.readFileSync(
	path.join(__dirname, 'protoplus.template.mjs'),
	'utf8'
);
const webTemplate = fs.readFileSync(
	path.join(__dirname, 'protoplus.template.js'),
	'utf8'
);
console.log('[Construct] Getting module filler...');
const templateFiller = fs.readFileSync(
	path.join(__dirname, 'protoplus.filler.js'),
	'utf8'
);

// construct filled code
console.log('[Construct] Constructing modules...');

const moduleFilled = moduleTemplate.replace(
	'// protoplus goes here',
	templateFiller
);
const webFilled = webTemplate.replace('// protoplus goes here', templateFiller);

// format code (using Prettier)
console.log('[Prettify] Getting Prettier rules...');
const prettierRules = JSON.parse(
	fs.readFileSync(path.join(__dirname, '../.prettierrc.json'), 'utf8')
);

console.log('[Prettify] Prettifying modules...');
const modulePretty = synchronizedPrettier.format(moduleFilled, {
	parser: 'babel',
	...prettierRules,
});
const webPretty = synchronizedPrettier.format(webFilled, {
	parser: 'babel',
	...prettierRules,
});
console.log('[Prettify] Saving Prettified modules...');
fs.writeFileSync(path.join(__dirname, '../protoplus.mjs'), modulePretty);
fs.writeFileSync(path.join(__dirname, '../protoplus.js'), webPretty);

// update version number in package.json
console.log('[Package] Updating package.json...');
const packageJson = JSON.parse(
	fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
);
packageJson.version = templateFiller.match(/(['"]?)version\1: "([^"]+)"/)[2];
fs.writeFileSync(
	path.join(__dirname, '../package.json'),
	JSON.stringify(packageJson, null, 4)
);
// update version number in package-lock.json
console.log('[Package] Updating package-lock.json...');
const packageLockJson = JSON.parse(
	fs.readFileSync(path.join(__dirname, '../package-lock.json'), 'utf8')
);
packageLockJson.version = templateFiller.match(/(['"]?)version\1: "([^"]+)"/)[2];
packageLockJson.packages[''].version = templateFiller.match(/(['"]?)version\1: "([^"]+)"/)[2];
fs.writeFileSync(
	path.join(__dirname, '../package-lock.json'),
	JSON.stringify(packageLockJson, null, 4)
);

// copy protoplus to playground page
console.log('[Playground] Copying protoplus to playground page...');
fs.writeFileSync(path.join(__dirname, '../playground/protoplus.js'), webPretty);

console.log('Done!');
