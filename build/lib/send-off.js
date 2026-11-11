/**
 * Decides whether the final "send-off" (the full contents of every built
 * file) should be printed.
 *
 * The send-off exists for the GitHub Actions constructor workflow, where the
 * log is the only place the maintainer can see the output. Local runs are
 * quiet by default. Either default can be overridden:
 *
 *   --send-off      always print the send-off
 *   --no-send-off   never print the send-off
 *
 * GitHub Actions sets GITHUB_ACTIONS=true, which is what enables the
 * send-off there.
 */
export const shouldSendOff = (
	argv = process.argv.slice(2),
	env = process.env
) => {
	if (argv.includes('--no-send-off')) return false;
	if (argv.includes('--send-off')) return true;
	return env.GITHUB_ACTIONS === 'true';
};

/**
 * Prints the final send-off: every constructed file, for eyeballing.
 * Object contents (package.json etc.) are pretty-printed as JSON.
 */
export const printSendOff = files => {
	console.log('Done!');
	console.log(' ===== Final Code Output ===== ');
	const arrowSize = 5;
	for (const [filename, content] of Object.entries(files)) {
		console.log(`<${'-'.repeat(arrowSize)} ${filename}`);
		console.log(
			typeof content === 'string' ? content : JSON.stringify(content, null, 4)
		);
		console.log(`${'-'.repeat(arrowSize)}>`);
	}
};
