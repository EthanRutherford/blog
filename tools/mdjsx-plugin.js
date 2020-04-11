const markdown = require("markdown-it")({xhtmlOut: true, linkify: true});
const checkInitialIndent = /^\s*?(\t*)\S/m;

function fillPinholes(node, pins) {
	for (let i = 0; i < node.children.length; i++) {
		const child = node.children[i];
		if (
			child.type === "JSXExpressionContainer" &&
			child.expression.type === "Identifier" &&
			child.expression.name.startsWith("mdjsxPinhole")
		) {
			const pin = pins[child.expression.name.slice(12)];
			if (
				node.type === "JSXElement" &&
				node.openingElement.name.name === "p" &&
				node.children.length === 1
			) {
				return pin;
			}

			node.children[i] = pin;
		} else if (child.children) {
			node.children[i] = fillPinholes(child, pins);
		}
	}

	return node;
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
				const parsed = babel.parse(
					`<>${markdown.render(text)}</>`,
					{presets: ["@babel/preset-react"]},
				).program.body[0].expression;

				path.node.children = fillPinholes(parsed, pins).children;
			},
		},
	};
};
