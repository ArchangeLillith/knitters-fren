import * as esbuild from 'esbuild';

(async () => {
	try {
		await esbuild.build({
			entryPoints: ['src/server/server.ts'],
			bundle: true,
			sourcemap: true,
			minify: true,
			platform: 'node',
			target: ['node20'],
			outfile: 'dist/server.js',
			external: [
				'aws-sdk',
				'mock-aws-s3',
				'nock',
				'@mapbox/node-pre-gyp',
				'sqlite3',
				'bcrypt',
			],
			define: {
				'process.env.NODE_ENV': "'production'",
				'process.env.ROOT_URL':
					"'https://arias-server-4642dbc777af.herokuapp.com'",
			},
		});

		console.log('Server bundled successfully for production!');
	} catch (error) {
		console.error('An error occurred during bundling:', error);
		process.exit(1); // Exit the process on build failure
	}
})();
