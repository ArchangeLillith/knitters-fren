const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//This tells webpack where and how to do its job, like where to output the ready-toload file into and if there are some custom pieces of code it should be aware of

//As an example, the rules in the client config show what we need to use to load the files types, and for the css specifically we see we can have multiple loaders that all can interact with each other through the building process of webpack

const clientConfig = {
	//If the enviornment isn't given, we defualt to develop which gives us more verbose errors
	mode: process.env.NODE_ENV || "development",
	entry: "./src/client/index.tsx",
	//Maps dev code to production code to help us find errors and what line they were caused from (I think)
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				//As we're going through all files, find the regex and use this loader for those file extensions
				test: /\.tsx?$/,
				loader: "ts-loader",
				//Don't bundle the node mods!
				exclude: /node_modules/,
				options: {
					//How we can tell this that we're using two different config files
					context: path.resolve(__dirname, "./src/client"),
					configFile: "tsconfig.json",
				},
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				type: 'asset/resource',
		},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	//Telling the bundler where to output the file that is loaded into the browser
	output: {
		filename: "app.js",
		path: path.resolve(__dirname, "public/js"),
	},
	plugins: [new HtmlWebpackPlugin({ template: "public/index.html" })],
};

const serverConfig = {
	mode: process.env.NODE_ENV || "development",
	entry: "./src/server/server.ts",
	module: {
		rules: [
			{
				test: /\.ts?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
				options: {
					context: path.resolve(__dirname, "./src/server"),
					configFile: "tsconfig.json",
				},
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	output: {
		filename: "server.js",
		path: path.resolve(__dirname, "dist"),
	},
	//What language/syntax are we in?
	target: "node",
	node: {
		__dirname: false,
	},
	//What do we need that isn't built in? We need to require these as well as putting them here
	externals: [nodeExternals()],
};

module.exports = [serverConfig, clientConfig];
