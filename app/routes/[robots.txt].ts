export const loader = () => {
	if (process.env.NODE_ENV !== 'test') {
		return new Response('User-agent: *\nDisallow: /\n', {
			headers: {
				'Cache-Control': 'public, s-maxage=300',
				'Content-Type': 'text/plain',
			},
			status: 200,
		});
	}

	throw new Response('robots.txt not enabled', { status: 404 });
}
