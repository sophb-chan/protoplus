const fs = require("fs");
const { synchronizedPrettier } = require("@prettier/sync");
const path = require("path");
const { cwd } = require("process");

// get templates and filler
const moduleTemplate = fs.readFileSync("./protoplus.template.mjs", "utf8");
const webTemplate = fs.readFileSync("./protoplus.template.js", "utf8");
const templateFiller = fs.readFileSync("./protoplus.filler.mjs", "utf8");

// construct filled code and formatted code (using Prettier)
const moduleFilled = webTemplate.replace(
	"// protoplus goes here",
	templateFiller,
);
const webFilled = webTemplate.replace("// protoplus goes here", templateFiller);
const modulePretty = synchronizedPrettier.format(moduleFilled, {
	parser: "babel",
});
const webPretty = synchronizedPrettier.format(webFilled, { parser: "babel" });
fs.writeFileSync(path.join(cwd(), "..", "protoplus.mjs"), modulePretty);
fs.writeFileSync(path.join(cwd(), "..", "protoplus.js"), webPretty);
