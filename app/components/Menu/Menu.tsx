import { NavLink, useLocation, useParams } from '@remix-run/react';
import { getLanguage, translate } from '~/services/i18n';
import { getPosts } from '~/models/post.server';
import { getWorks } from '~/models/work.server';
import { useState } from 'react';

export function Menu() {
	const lang = getLanguage(useParams(), useLocation());
	const posts = getPosts(lang);
	const works = getWorks(lang);

	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			<button
				aria-controls="menu"
				aria-expanded={menuOpen ? 'true' : 'false'}
				className="menu-toggle until-md"
				onClick={() => setMenuOpen(!menuOpen)}
				type="button"
			>
				{translate(lang, 'Menu')}
			</button>

			<div className="menu" id="menu">
				<ul className="row gap-m font-1 bold" role="list">
					<li>
						<NavLink className="menu__link" to={translate(lang, '/about')}>
							{translate(lang, 'About')}
						</NavLink>
					</li>

					{works.length ? (
						<li>
							<NavLink className="menu__link" to={translate(lang, '/work')}>
								{translate(lang, 'Work')}
							</NavLink>
						</li>
					) : null}

					{posts.length ? (
						<li>
							<NavLink className="menu__link" to={translate(lang, '/blog')}>
								{translate(lang, ('Blog'))}
							</NavLink>
						</li>
					) : null}
				</ul>
			</div>
		</>
	);
}
