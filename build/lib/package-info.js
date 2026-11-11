import fs from 'node:fs';
import path from 'node:path';

import { ROOT_DIR } from './resources.js';

/**
 * Syncs the given version into package.json and package-lock.json
 * (including the lockfile's root package entry).
 */
export const syncPackageVersion = (version, packageJSON, packageLockJSON) => {
	packageJSON.version = version;
	fs.writeFileSync(
		path.join(ROOT_DIR, 'package.json'),
		JSON.stringify(packageJSON, null, 4)
	);

	packageLockJSON.version = version;
	packageLockJSON.packages[''].version = version;
	fs.writeFileSync(
		path.join(ROOT_DIR, 'package-lock.json'),
		JSON.stringify(packageLockJSON, null, 4)
	);
};
