import type { LoaderFunctionArgs } from '@remix-run/cloudflare';

export const loader = ({ context }: LoaderFunctionArgs) => {
	if (context.env.ROBOTS === 'true') {
		return new Response('User-agent: *\nDisallow: /\n', {
			headers: {
				'cache-control': 'public, s-maxage=300',
				'content-type': 'text/plain',
			},
		});
	}

	throw new Response('robots.txt not enabled', { status: 404 })
};
