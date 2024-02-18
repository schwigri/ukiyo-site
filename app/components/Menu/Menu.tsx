import { NavLink, useLocation, useParams } from '@remix-run/react';
import { getLanguage, translate } from '~/services/i18n';
import { useEffect, useState } from 'react';
import { LangSwitcher } from '../LangSwitcher';

interface MenuProps {
	readonly hasBlog?: boolean;
	readonly hasWork?: boolean;
}

export function Menu({ hasBlog, hasWork }: MenuProps) {
	const location = useLocation();
	const lang = getLanguage(useParams(), location);

	const [menuOpen, setMenuOpen] = useState(false);
	const [pageKey, setPageKey] = useState(location.key);

	// close menu when we change pages, and set tab focus
	useEffect(() => {
		if (location.key !== pageKey) {
			setPageKey(location.key);
			setMenuOpen(false);

			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
			}
		}
	}, [pageKey, location]);

	return (
		<>
			<button
				aria-controls="menu"
				aria-expanded={menuOpen ? 'true' : 'false'}
				aria-label={menuOpen ? translate(lang, 'Close menu') : translate(lang, 'Open menu')}
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
						<NavLink className="menu__link" to={translate(lang, '/about-me')}>
							{translate(lang, 'About me')}
						</NavLink>
					</li>

					{hasWork ? (
						<li className="menu__list-item">
							<NavLink className="menu__link" to={translate(lang, '/work')}>
								{translate(lang, 'Work')}
							</NavLink>
						</li>
					) : null}

					{hasBlog ? (
						<li className="menu__list-item">
							<NavLink className="menu__link" to={translate(lang, '/blog')}>
								{translate(lang, 'Blog')}
							</NavLink>
						</li>
					) : null}
				</ul>

				<div className="wrapper font--2 until-md">
					<LangSwitcher />
				</div>
			</div>
		</>
	);
}
