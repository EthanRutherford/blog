const cleanup = /\r\n/;
const lineParser = /^(?:(\*?)\s*)?(.+)$/gm;

module.exports = (source) => {
	const matches = [...source.replace(cleanup, "\n").matchAll(lineParser)];
	const [defPins, defList] = matches.reduce((results, [, pinned, file]) => {
		results[pinned ? 0 : 1].unshift({file, name: file.replace(/-/g, "")});
		return results;
	}, [[], []]);

	const allDefs = defPins.concat(defList);

	const imps = allDefs.map((d) => `import ${d.name} from "./${d.file}";`);
	const meta = allDefs.map((d) => `${d.name}.id = "${d.file}";`);
	const pins = defPins.map((d) => d.name);
	const list = defList.map((d) => d.name);

	const impsString = `${imps.join("\n")}\n`;
	const metaString = `${meta.join("\n")}\n`;
	const pinsString = `export const pins = [\n\t${pins.join(",\n\t")}\n];\n\n`;
	const listString = `export const list = [\n\t${list.join(",\n\t")}\n];\n\n`;

	return impsString + metaString + pinsString + listString;
};
