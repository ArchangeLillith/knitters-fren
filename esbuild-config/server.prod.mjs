import * as esbuild from 'esbuild';
import path from 'path';

const outputFilePath = path.resolve('src/server/dist/server.js'); // Correct relative path resolution

(async () => {
	// Wrap in an async IIFE to allow await usage
	try {
		await esbuild.build({
			entryPoints: ['src/server/server.ts'],
			bundle: true,
			sourcemap: true,
			minify: true,
			platform: 'node',
			target: ['node20'], // Ensure your node version is compatible
			packages: 'external',
			define: {
				'process.env.NODE_ENV': "'production'",
			},
			outfile: outputFilePath,
		});

		console.log('Server built once, ready!');
	} catch (error) {
		console.error('An error occurred during bundling:', error);
		process.exit(1); // Ensure the process exits if there's an error
	}
})();
