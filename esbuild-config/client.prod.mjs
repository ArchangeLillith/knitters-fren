import * as esbuild from 'esbuild';

try {
	await esbuild.build({
		entryPoints: ['src/client/index.tsx'],
		bundle: true,
		sourcemap: true,
		minify: true,
		outfile: 'public/static/bundle.js',
		define: {
			'process.env.NODE_ENV': "'production'",
			//This is important! keyword: deploy
			'process.env.ROOT_URL':
				"'https://arias-server-4642dbc777af.herokuapp.com'",
		},
	});

	console.log('Client bundled successfully for production!');
} catch (error) {
	console.error('An error occurred during bundling:', error);
	process.exit(1);
}
