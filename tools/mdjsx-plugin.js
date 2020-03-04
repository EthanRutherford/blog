const markdown = require("markdown-it")({xhtmlOut: true, linkify: true});
const checkInitialIndent = /^\s*?(\t*)\S/m;

function fillPinholes(nodes, pins) {
	for (let i = 0; i < nodes.length; i++) {
		if (
			nodes[i].type === "JSXExpressionContainer" &&
			nodes[i].expression.type === "Identifier" &&
			nodes[i].expression.name.startsWith("mdjsxPinhole")
		) {
			const pinIndex = nodes[i].expression.name.slice(12);
			nodes[i] = pins[pinIndex];
		} else if (nodes[i].children) {
			fillPinholes(nodes[i].children, pins);
		}
	}

	return nodes;
}

module.exports = (babel) => {
	return {
		visitor: {
			JSXElement(path) {
				if (!path.node.openingElement.attributes.some((attr) =>
					attr.type === "JSXAttribute" && attr.name.name === "mdjsx",
				)) {
					return;
				}

				let textContent = "";
				const pins = [];
				for (const child of path.node.children) {
					if (child.type === "JSXText") {
						textContent += child.value;
					} else {
						textContent += `{mdjsxPinhole${pins.length}}`;
						pins.push(child);
					}
				}

				const indent = textContent.match(checkInitialIndent)[1];
				const regex = new RegExp(indent, "g");
				const text = textContent.replace(regex, "").trim();
				const newChildren = babel.parse(
					`<>${markdown.render(text)}</>`,
					{presets: ["@babel/preset-react"]},
				).program.body[0].expression.children;

				path.node.children = fillPinholes(newChildren, pins);
			},
		},
	};
};
