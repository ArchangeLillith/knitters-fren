import * as esbuild from "esbuild";
import path from "path";

const outputFilePath = path.resolve("/src/server/dist/server.js");

try {
	await esbuild.build({
		entryPoints: ["src/server/server.ts"],
		bundle: true,
		sourcemap: true,
		minify: true,
		platform: "node",
		target: ["node20"],
		packages: "external",
		define: {
			"process.env.NODE_ENV": "'production'",
		},
		outfile: outputFilePath,
	});

	console.log("Server built once, ready!");
} catch (error) {
	console.error("An error occurred during bundling:", error);
	process.exit(1);
}
