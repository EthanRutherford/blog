const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function template({template}, _, {componentName, props, jsx}) {
	return template.ast`
		import React from "react";
		const ${componentName} = (${props}) => ${jsx};
		export default ${componentName};
	`;
}

module.exports = (env) => ({
	entry: "./src/main.jsx",
	output: {publicPath: "/dist/"},
	mode: env === "prod" ? "production" : "development",
	devtool: env === "prod" ? "" : "eval-cheap-module-source-map",
	devServer: {open: true, publicPath: "/dist", port: 8088},
	plugins: [
		new MiniCssExtractPlugin({filename: "styles.css"}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"cache-loader",
					{
						loader: "css-loader", options: {
							localsConvention: "camelCaseOnly",
							modules: {
								localIdentName: "[name]__[local]--[hash:base64:5]",
							},
						},
					},
				],
			}, {
				test: /\.png$/,
				use: [
					{
						loader: "file-loader",
						options: {
							publicPath: "/dist",
						},
					},
				],
			}, {
				test: /.svg$/,
				use: [
					"cache-loader",
					{
						loader: "@svgr/webpack",
						options: {
							template,
						},
					},
				],
			}, {
				test: /\.(list)$/,
				use: [
					"cache-loader",
					"babel-loader",
					path.resolve("./tools/article-loader.js"),
				],
			}, {
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					"cache-loader",
					"babel-loader",
				],
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".json", ".css", ".svg"],
	},
});
