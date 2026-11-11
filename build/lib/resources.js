import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const BUILD_DIR = path.dirname(fileURLToPath(import.meta.url));
export const ROOT_DIR = path.join(BUILD_DIR, '..', '..');

const readText = (...segments) =>
	fs.readFileSync(path.join(ROOT_DIR, ...segments), 'utf8');

const readJSON = (...segments) => JSON.parse(readText(...segments));

/**
 * Reads every input resource the constructor needs, exactly once.
 */
export const readResources = () => ({
	esTemplate: readText('build', 'protoplus.template.mjs'),
	cjsTemplate: readText('build', 'protoplus.template.cjs'),
	webTemplate: readText('build', 'protoplus.template.js'),
	filler: readText('build', 'protoplus.filler.js'),
	prettierRules: readJSON('.prettierrc.json'),
	packageJSON: readJSON('package.json'),
	packageLockJSON: readJSON('package-lock.json'),
});
