const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => ({
	entry: "./src/main.jsx",
	output: {filename: "main.js"},
	mode: env === "prod" ? "production" : "development",
	devtool: env === "prod" ? "" : "cheap-eval-source-map",
	devServer: {open: true, publicPath: "/dist", port: 8088},
	plugins: [
		new MiniCssExtractPlugin({filename: "styles.css"}),
	],
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
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
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: "babel-loader",
		}],
	},
	resolve: {extensions: [".js", ".jsx", ".json", ".css"]},
});
