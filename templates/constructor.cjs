const fs = require('fs');
const synchronizedPrettier = require('@prettier/sync');
const path = require('path');
const { cwd } = require('process');

// get templates and filler
const moduleTemplate = fs.readFileSync(
	path.join(__dirname, 'protoplus.template.mjs'),
	'utf8'
);
const webTemplate = fs.readFileSync(
	path.join(__dirname, 'protoplus.template.js'),
	'utf8'
);
const templateFiller = fs.readFileSync(
	path.join(__dirname, 'protoplus.filler.js'),
	'utf8'
);

// construct filled code
const moduleFilled = webTemplate.replace(
	'// protoplus goes here',
	templateFiller
);
const webFilled = webTemplate.replace('// protoplus goes here', templateFiller);
// format code (using Prettier)
const prettierRules = JSON.parse(
	fs.readFileSync(path.join(__dirname, '../.prettierrc.json'), 'utf8')
);
const modulePretty = synchronizedPrettier.format(moduleFilled, {
	parser: 'babel',
	...prettierRules,
});
const webPretty = synchronizedPrettier.format(webFilled, { parser: 'babel' });
fs.writeFileSync(path.join(__dirname, '../protoplus.mjs'), modulePretty);
fs.writeFileSync(path.join(__dirname, '../protoplus.js'), webPretty);

// update version number in package.json
const packageJson = JSON.parse(
	fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
);
packageJson.version = templateFiller.match(/(['"]?)version\1: "([^"]+)"/)[2];
fs.writeFileSync(
	path.join(__dirname, '../package.json'),
	JSON.stringify(packageJson, null, 2)
);
