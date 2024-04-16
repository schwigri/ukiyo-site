import compression from 'compression';
import { createRequestHandler } from '@remix-run/express';
import express from 'express';
import { installGlobals } from '@remix-run/node';
import morgan from 'morgan';

/** Install globals */
installGlobals();

/** Create dev server if not in production */
const viteDevServer = process.env.NODE_ENV === 'production' ?
	undefined
	: await import('vite').then((vite) => vite.createServer({
		server: { middlewareMode: true },
	}));

/** Create handler using dev server when not in production */
const remixHandler = createRequestHandler({
	build: viteDevServer ?
		() => viteDevServer.ssrLoadModule('virtual:remix/server-build')
		: await import('./build/server/index.js'),
});

/** Initialize the server */
const app = express();

/** Enable deflate/gzip */
app.use(compression());

/** Reduce fingerprinting */
app.disable('x-powered-by');

/** Handle asset requests */
if (viteDevServer) {
	app.use(viteDevServer.middlewares);
} else {
	// We can cache build assets up to a year given they are fingerprinted
	app.use('/assets', express.static('build/client/assets', { immutable: true, maxAge: '1y' }));
}

/** We can cache everything else for a hour */
app.use(express.static('build/client', { maxAge: '1hr' }));

/** Use morgan logging middleware */
app.use(morgan('tiny'));

/** Handle SSR requests */
app.all('*', remixHandler);

/** Start the app */
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Express server listening at http://localhost:${port}`);
});
