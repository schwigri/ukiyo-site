import { NavLink, useLoaderData, useLocation } from '@remix-run/react';
import { c, createPath, defaultLang, t, withLang } from '~/lib/i18n';
import { useEffect, useState } from 'react';
import { LangSwitcher } from '../LangSwitcher';

export function Menu() {
	const lang = withLang();
	const location = useLocation();
	const [pageKey, setPageKey] = useState(location.key);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		if (location.key !== pageKey) {
			setPageKey(location.key);
			setMenuOpen(false);

			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
			}
		}
	}, [pageKey, menuOpen])

	return (
		<>
			<button
				aria-controls="menu"
				aria-expanded={menuOpen ? 'true' : 'false'}
				aria-label={menuOpen ? t(lang)`Close menu` : t(lang)`Open menu`}
				className="menu-toggle until-md row align-center justify-end"
				onClick={() => setMenuOpen((open) => !open)}
			>
				<svg
					className="menu-toggle__icon"
					height="24"
					viewBox="0 0 24 24"
					width="24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
				</svg>
			</button>

			<div className="menu" id="menu">
				<ul className="menu__list row gap-m font-1 bold" role="list">
					<li className="menu__list-item">
						<NavLink className="menu__link" to={createPath(lang, c(lang, 'Slug').t`about-me`)}>
							{t(lang)`About me`}
						</NavLink>
					</li>
				</ul>

				<div className="wrapper font--2 until-md">
					<LangSwitcher />
				</div>
			</div>
		</>
	);
}
