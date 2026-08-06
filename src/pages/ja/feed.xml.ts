import { DOMImplementation, type Element as XMLDOMElement, XMLSerializer } from "@xmldom/xmldom";

const RSS_NS = null;
const ATOM_NS = "http://www.w3.org/2005/Atom";

export async function GET() {
  const document = new DOMImplementation().createDocument(RSS_NS, "rss", null);
  const rss = document.documentElement;
  if (!rss) throw new Error("Unable to get RSS element");
  rss.setAttribute("version", "2.0");
  rss.setAttribute("xmlns:atom", ATOM_NS);

  function addChild(parent: XMLDOMElement, name: string, text?: string) {
    const element = document.createElement(name);
    if (typeof text === "string") element.textContent = text;
    parent.appendChild(element);
    return element;
  }

  const channel = addChild(rss, "channel");
  addChild(channel, "title", "グリフィンのブログ");
  addChild(channel, "link", "https://www.griffen.dev/ja/blog/");
  addChild(channel, "description", "グリフィン・シュヴィーゾーのブログ記事を含むRSSフィード");
  addChild(channel, "language", "ja");
  addChild(channel, "pubDate", "Tue, 04 Aug 2026 07:08:59 GMT");
  addChild(channel, "lastBuildDate", new Date().toUTCString());

  const selfLink = addChild(channel, "atom:link");
  selfLink.setAttribute("href", "https://www.griffen.dev/ja/feed.xml");
  selfLink.setAttribute("rel", "self");
  selfLink.setAttribute("type", "application/rss+xml");

  const englishLink = addChild(channel, "atom:link");
  englishLink.setAttribute("href", "https://www.griffen.dev/feed.xml");
  englishLink.setAttribute("hreflang", "en");
  englishLink.setAttribute("rel", "alternate");
  englishLink.setAttribute("type", "application/rss+xml");

  const koreanLink = addChild(channel, "atom:link");
  koreanLink.setAttribute("href", "https://www.griffen.dev/ko/feed.xml");
  koreanLink.setAttribute("hreflang", "ko");
  koreanLink.setAttribute("rel", "alternate");
  koreanLink.setAttribute("type", "application/rss+xml");

  const serializer = new XMLSerializer();
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n${serializer.serializeToString(document)}`,
    {
      headers: {
        "Content-Type": "application/rss+xml;charset=UTF-8",
      },
    },
  );
}
