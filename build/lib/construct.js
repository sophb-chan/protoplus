// Matches the `// protoplus goes here` marker inside a template (either
// comment style), letting extra surrounding slashes be optional.
const FILLER_MARKER =
	/\/\/[\t ]*protoplus goes here(?:[\t ]*\/\/)?|\/\*\s*protoplus goes here\s*\*\//m;

/**
 * Injects the filler into a template at the `protoplus goes here` marker.
 * Throws instead of silently emitting a broken module if the marker is missing.
 */
export const fillTemplate = (template, filler) => {
	if (!FILLER_MARKER.test(template)) {
		throw new Error(
			'Template is missing the "protoplus goes here" marker; refusing to construct.'
		);
	}
	return template.replace(FILLER_MARKER, filler);
};

/**
 * Extracts the version declared in the filler's `version: 'x.y.z'` field.
 * Tolerates quoted or unquoted keys and either quote style.
 */
export const matchFillerVersion = filler => {
	const match = filler.match(/['"]?version['"]?:\s*['"]([^'"]+)['"]/);
	if (!match) {
		throw new Error('Could not find a version declaration in the filler.');
	}
	return match[1];
};
