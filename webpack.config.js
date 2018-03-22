const path = require("path");
const isDev = process.env.NODE_ENV === "development";
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");


const config = {
	target: "web",
	entry: path.join(__dirname,"src/index.js"),
	output: {
		filename: "bundle.js",
		path: path.join(__dirname,"dist")
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader"
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: isDev ? ' "development" ': ' "production" '
			}
		}),
		new HTMLPlugin()
	]
}

if(isDev) {
	config.devServer = {
		port: "8000",
		host: "0.0.0.0",
		overlay: {
			errors: true
		}
	}
}

module.exports = config;
