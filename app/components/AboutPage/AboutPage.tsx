import { getLanguage, translate } from '~/services/i18n';
import { useLocation, useParams } from '@remix-run/react';
import { Page } from '../Page';

export function AboutPage() {
	const lang = getLanguage(useParams(), useLocation());

	let content = null;

	switch (lang) {
		case 'de':
			content = (
				<>
					<p>Hoi! Ich bin Griffen, ein Designer und Entwickler, der sich leidenschaftlich für Zugänglichkeit sowie Internationalisierung einsetzt und das Web zu einem schöneren und offeneren Ort macht. Wenn ich nicht arbeite, lerne ich wahrscheinlich eine Fremdsprache oder spiele Klavier.</p>

					<p>Momentan bin ich Front-End-Ingenieur bei Amazon und arbeite mit Sponsored Brands.</p>
				</>
			);
			break;

		case 'ja':
			content = (
				<>
					<p>はじめまして。私はグリフィンと申します。私はアクセシビリティーと国際化を大切にしているデザイナー・デベロッパーとしてインターネットをもっと美しくてインクルーシブにしようと存じます。仕事以外は、外国語を勉強したり、ピアノを弾いたりする可能性が高いです。</p>

					<p>現在、Amazon の広告部にフロントエンドエンジニアとして勤めております。</p>
				</>
			);
			break;

		default:
			content = (
				<>
					<p>
						Hi! I’m Griffen Schwiesow, a designer and developer passionate about accessibility, internationalization, and making the web a more beautiful and inclusive space. When I’m not working, I’m likely studying a foreign language or playing piano.
					</p>

					<p>
						Currently, I’m a front-end engineer at Amazon working with Sponsored Brands.
					</p>
				</>
			);
	}

	return (
		<Page>
			<div className="wrapper">
				<h1>{translate(lang, 'About me')}</h1>

				<picture>
					<source
						height="528"
						media="(min-width: 900px)"
						src="/zermatt-396.jpeg"
						srcSet="/zermatt-396.jpg, /zermatt-792.jpg 2x, /zermatt-1188.jpg 3x"
						width="396"
					/>

					<source
						height="auto"
						media="(min-width: 397px) and (max-width: 899px)"
						src="/zermatt-840.jpg"
						srcSet="/zermatt-840.jpg, /zermatt-1680.jpg 2x, /zermatt-2520.jpg 3x"
						width="100%"
					/>

					<source
						height="auto"
						media="(max-width: 396px)"
						src="/zermatt-396.jpg"
						srcSet="/zermatt-396.jpg, /zermatt-792.jpg 2x, /zermatt-1188.jpg 3x"
						width="100%"
					/>

					<img
						alt={translate(lang, 'Me, skiing in front of the Matterhorn')}
						className="about-image"
						src="/zermatt.jpeg"
					/>
				</picture>

				{content}

				<p>
					<a
						className="link"
						href="https://www.linkedin.com/in/griffens"
						rel="noopener noreferrer"
					>
						LinkedIn
					</a> / <a
						className="link"
						href="https://github.com/schwigri"
						rel="noopener noreferrer"
					>
						GitHub
					</a>
				</p>
			</div>
		</Page>
	);
}
