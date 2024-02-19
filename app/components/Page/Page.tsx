import type { PropsWithChildren } from 'react';

export function Page({ children }: PropsWithChildren) {

	return (
		<div className="page region-xl">
			{children}
			<div style={{ clear: 'both' }} />
		</div>
	);
}
