import * as esbuild from "esbuild";
import { promises as fs } from "fs";
import path from "path";

let ctx;
const outputFilePath = path.resolve("/src/server/dist/server.js");

try {
	ctx = await esbuild.context({
		entryPoints: ["src/server/server.ts"],
		bundle: true,
		sourcemap: true,
		minify: false,
		platform: "node",
		target: ["node20"],
		packages: "external",
		define: {
			"process.env.NODE_ENV": "'development'",
		},
		outfile: outputFilePath,
	});

	await ctx.watch();

	console.log("ESBuild watching server on 3000...");

	// Check the modification time of the output file
	let lastModified = 0;

	setInterval(async () => {
		try {
			const stats = await fs.stat(outputFilePath);
			const modifiedTime = stats.mtimeMs;

			if (modifiedTime !== lastModified) {
				console.log("Recompiled:", outputFilePath);
				lastModified = modifiedTime;
			}
		} catch (err) {
			console.error("Error checking file:", err);
		}
	}, 1000); // Check every second
} catch (error) {
	console.error("An error occurred:", error);
	process.exit(1);
}
