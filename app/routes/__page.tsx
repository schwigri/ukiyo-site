import { Outlet } from '@remix-run/react';

export default function Page() {
	return (
		<div className="page">
			<Outlet />
		</div>
	)
}
