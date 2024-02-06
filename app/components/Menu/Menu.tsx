import { NavLink, useLocation, useParams } from '@remix-run/react';
import { getLanguage, translate } from '~/services/i18n';
import { useState } from 'react';

interface MenuProps {
	readonly hasBlog?: boolean;
	readonly hasWork?: boolean;
}

export function Menu({ hasBlog, hasWork }: MenuProps) {
	const lang = getLanguage(useParams(), useLocation());

	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			<button
				aria-controls="menu"
				aria-expanded={menuOpen ? 'true' : 'false'}
				className="menu-toggle until-md"
				onClick={() => setMenuOpen((open) => !open)}
			>
				{translate(lang, 'Menu')}
			</button>

			<div className="menu" id="menu">
				<ul className="row gap-m font-1 bold" role="list">
					<li>
						<NavLink className="menu__link" to={translate(lang, '/about-me')}>
							{translate(lang, 'About me')}
						</NavLink>
					</li>

					{hasWork ? (
						<li>
							<NavLink className="menu__link" to={translate(lang, '/work')}>
								{translate(lang, 'Work')}
							</NavLink>
						</li>
					) : null}

					{hasBlog ? (
						<li>
							<NavLink className="menu__link" to={translate(lang, '/blog')}>
								{translate(lang, 'Blog')}
							</NavLink>
						</li>
					) : null}
				</ul>
			</div>
		</>
	);
}
