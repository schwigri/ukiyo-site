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
  addChild(channel, "title", "그리핀의 블로그");
  addChild(channel, "link", "https://www.griffen.dev/ko/blog/");
  addChild(channel, "description", "그리핀 슈비조의 최신 블로그 게시물을 담은 RSS 피드입니다.");
  addChild(channel, "language", "ko");
  addChild(channel, "pubDate", new Date().toUTCString());
  addChild(channel, "lastBuildDate", new Date().toUTCString());

  const selfLink = addChild(channel, "atom:link");
  selfLink.setAttribute("href", "https://www.griffen.dev/ko/feed.xml");
  selfLink.setAttribute("rel", "self");
  selfLink.setAttribute("type", "application/rss+xml");

  const englishLink = addChild(channel, "atom:link");
  englishLink.setAttribute("href", "https://www.griffen.dev/feed.xml");
  englishLink.setAttribute("hreflang", "en");
  englishLink.setAttribute("rel", "alternate");
  englishLink.setAttribute("type", "application/rss+xml");

  const japaneseLink = addChild(channel, "atom:link");
  japaneseLink.setAttribute("href", "https://www.griffen.dev/ja/feed.xml");
  japaneseLink.setAttribute("hreflang", "ja");
  japaneseLink.setAttribute("rel", "alternate");
  japaneseLink.setAttribute("type", "application/rss+xml");

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
