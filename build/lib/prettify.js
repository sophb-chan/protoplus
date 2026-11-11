import synchronizedPrettier from '@prettier/sync';

/**
 * Formats constructed source with the repo's Prettier rules.
 */
export const prettify = (code, prettierRules, parser = 'babel') =>
	synchronizedPrettier.format(code, { parser, ...prettierRules });
