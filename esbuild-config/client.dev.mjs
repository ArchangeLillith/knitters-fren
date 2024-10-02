import * as esbuild from "esbuild";

let ctx;

try {
	ctx = await esbuild.context({
		entryPoints: ["src/client/index.tsx"],
		bundle: true,
		minify: false,
		sourcemap: true,
		outfile: "public/static/bundle.js",
		//Env variables injection
		define: {
			"process.env.NODE_ENV": "'development'",
			//Setting the ROOT_URL for our backend, this declares the variable within .env that we can then access
			"process.env.ROOT_URL": "'http://localhost:3000'",
		},
	});

	await ctx.watch();
	console.log("ESBuild watching client on 8000...");

	const { host, port } = await ctx.serve({
		servedir: "public",
		fallback: "public/index.html",
		port: 8000, // Explicitly set the frontend to run on port 8000
	});

	console.info(`Hot refresh at http://${host}:${port}`);
} catch (error) {
	console.error("An error occurred:", error);
	process.exit(1);
}
