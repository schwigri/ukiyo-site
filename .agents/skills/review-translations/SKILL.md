---
name: review-translations
description: Reviews translations against style guide. Use when user asks to review translations.
---

## Purpose

When writing, editing, translating, or reviewing website copy, prioritize:

1. Natural, native-sounding language
2. Preservation of Griffen's personal voice
3. Semantic accuracy
4. Consistency across languages
5. Accessibility and clarity
6. Concise, modern web copy

Do **not** optimize for literal translation at the expense of natural language.

The goal is not for every language to have identical sentence structure. The goal is for each language to feel like it was written naturally by Griffen.

## English voice

The English site should feel:

- Friendly
- Personal
- Intelligent
- Understated
- Slightly playful
- Professional without being corporate
- Confident without being boastful
- Human rather than marketing-driven

Prefer conversational language over corporate jargon.

Avoid:

- Excessive enthusiasm
- Marketing clichés
- Generic personal-brand language
- Stiff/formal phrasing
- Unnecessary adjectives
- Corporate buzzwords
- Over-explaining simple ideas

The site should sound like a thoughtful designer/developer talking directly to another person.

## Localization philosophy

Translations should be **localized, not mechanically translated**.

For every translation, ask:

> "Would a native speaker naturally write this if this were originally their website?"

Do not ask only:

> "Is this grammatically correct?"

A sentence can be grammatically correct while still sounding translated.

However, do not "fix" something merely because it is unconventional. Personal writing can be distinctive.

Before changing an unusual phrase, determine whether it is:

1. Actually unnatural
2. Grammatically valid but stylistically unusual
3. An intentional expression of personality
4. An intentional design/typographic choice

Only #1 should normally be corrected automatically.

### Preserve intentional personality

The following characteristics are intentional and should generally be preserved:

- Gentle humor
- Slightly playful phrasing
- Direct address to the visitor
- Occasional informal language
- Short, punchy sentences
- Personification and metaphor when present in the English

Do not turn personal copy into generic corporate prose.

## Japanese

### Overall voice

Japanese should sound like a friendly, competent Japanese-speaking designer/developer talking directly to visitors.

Preferred register:

- Conversational
- Warm
- Personal
- Professional but not corporate
- Generally polite enough for a professional website
- Occasional casual endings are acceptable when they reinforce personality

A mixture of polite and casual language can be intentional.

Do not automatically convert everything to formal business Japanese.

### First person

Use 僕 when appropriate.

`僕` is intentional: it gives the Japanese site a personal, approachable male voice.

Do not automatically replace it with `私` merely because the site is professional.

### Politeness

Prefer natural conversational Japanese over excessive keigo.

Examples of acceptable personal-site language:

- 〜してくれてありがとう
- 〜してみてね
- 〜だよ
- 〜なんだ
- 〜みたい

These are appropriate when they match the surrounding voice.

Avoid unnecessarily formal alternatives such as:

- 〜していただきありがとうございます
- 〜をご覧ください
- 〜しております
- 〜いただければ幸いです

unless the context genuinely calls for them.

### Vocabulary

Prefer contemporary terminology used by Japanese designers/developers.

Examples:

- アクセシビリティ
- 国際化
- フロントエンド開発者
- 職務経歴書
- RSSフィード

Do not replace technical loanwords with awkwardly literal Japanese simply to avoid katakana.

### Naturalness

When reviewing Japanese, distinguish between:

- "This is not something a native speaker would say."
- "A native speaker might phrase this differently."
- "This is perfectly acceptable but has a distinctive personal voice."

Only the first category should normally be treated as a problem.

### Intentional personification

Preserve playful constructions when they accurately reflect the English.

For example, if the English says:

> "it only keeps getting more fun"

the Japanese may preserve the idea that the activity itself is becoming more enjoyable rather than rewriting it as "I increasingly enjoy it."

Naturalness is important, but semantic nuance matters too.

### Link / CTA language

Prefer natural Japanese CTA phrasing rather than literal translations.

Examples:

- 僕のことをもっと知る
- チェックしてみてね
- よかったら、RSSフィードを購読してみて

Avoid unnecessarily formal CTA language.

### Blog empty states

Preserve playful hedging when present in the English.

For example:

> まだ記事がないみたい！でも、今準備中だよ。

The `みたい is intentional and should not automatically be changed to a more formal or definitive statement.

### Japanese typography

The Japanese version may intentionally use vertical right-to-left writing and Japanese-specific typographic conventions.

Do not "normalize" Japanese typography to match the English version without considering the design intent.

In particular, **Reiwa dates may be intentional**.

For example:

> 令和八年 © グリフィン・シュヴィーゾー

Do not replace this with `2026` solely because Western-year formatting is more common on English websites.

Evaluate it in the context of the Japanese visual design.

## Korean

### Overall voice

Korean should sound like a friendly, competent Korean-speaking designer/developer.

Preferred register:

- Conversational
- Warm
- Personal
- Professional
- Contemporary
- Not corporate

Use 해요체 as the default conversational register.

Avoid unnecessarily formal business Korean such as:

- 감사합니다
- ~습니다
- ~하시기 바랍니다
- ~해 주시기 바랍니다

when those would make the site feel colder than the English.

### Naturalness over literalness

Translate the meaning and personality, not the English syntax.

For example, English:

> "A designer and developer passionate about accessibility..."

can naturally become:

> 접근성과 국제화를 중요하게 생각하는 디자이너·프론트엔드 개발자.

Do not force Korean into the grammatical structure of the English.

### Vocabulary

Prefer contemporary terminology used by Korean designers/developers.

Examples:

- 접근성
- 국제화
- 프론트엔드 개발자
- 이력서
- RSS 피드
- 포용적

Use technical loanwords when they are normal in contemporary Korean tech/design discourse.

### Casual language

Casual expressions are allowed when intentional.

Examples:

- 감사해요
- 즐거워요
- ~해 보세요
- ~같아요
- 준비 중이에요

Do not make the Korean corporate merely because it is a professional portfolio.

### Hanja / Hangul treatment

The Korean site may use Hanja with Hangul readings as a deliberate visual/typographic feature.

For example:

> 開發者 → 개발자

The Hanja is a visual design element; the canonical textual content is the Hangul.

Do not interpret apparent duplicated text in extracted HTML as automatically being an error.

The accessible/plain-text representation should expose the intended Hangul content to assistive technologies.

When reviewing markup, verify that decorative Hanja/ruby does not create duplicate or confusing accessible text.

## Meta descriptions

Meta descriptions should be concise, natural, and identity-focused.

They do not need to be literal translations.

The English positioning is approximately:

> A designer and developer passionate about accessibility, internationalization and making the web a more beautiful space.

Natural localized versions are preferable to word-for-word translations.

Current Korean style:

> 접근성과 국제화를 중요하게 생각하는 디자이너·프론트엔드 개발자. 웹을 더 아름답고 더 포용적으로.

Current Japanese style:

> アクセシビリティと国際化を大切にするデザイナー・フロントエンド開発者。ウェブをより美しく、よりインクルーシブに。

These demonstrate the desired approach:

- Natural terminology
- Concise fragments are acceptable
- Preserve personality
- Do not force grammatical equivalence
- Contemporary technical vocabulary is preferred

## Accessibility

Copy changes must not compromise accessibility.

When modifying localized content:

- Preserve meaningful accessible text.
- Do not duplicate visible text in screen-reader output.
- Decorative typography should be hidden from assistive technology when appropriate.
- Do not remove visually hidden canonical text merely because it looks duplicated in source.
- Verify punctuation and spacing in the actual accessible text, not only rendered/extracted crawler output.

When working with Hanja/ruby or other decorative typography, distinguish between:

1. Visual presentation
2. DOM text
3. Accessible name / screen-reader output

These may intentionally differ.

## Review procedure

When asked to review copy, evaluate each piece using these categories:

1. Meaning

Does it preserve the intended meaning?

2. Native Naturalness

Would a native speaker naturally write this?

3. Register

Is the level of formality appropriate?

4. Voice

Does it sound like Griffen rather than generic marketing copy?

5. Terminology

Is technical vocabulary contemporary and consistent?

6. Localization

Does it feel written for the target language rather than translated?

7. Accessibility

Does the change preserve clear, usable accessible text?

8. Design Context

Could an unusual choice be intentional because of typography, layout, or visual design?

Use these labels:

🟢 Keep — natural and appropriate
🟡 Polish — understandable and acceptable, but a native writer might improve it
🔴 Rewrite — noticeably unnatural, misleading, or inconsistent

Do not recommend changes simply because another phrasing is possible.

## Consistency

Keep terminology consistent within each language unless there is a deliberate contextual reason to vary it.

English:

- accessibility
- internationalization
- front-end developer
- résumé

Japanese:

- アクセシビリティ
- 国際化
- フロントエンド開発者
- 職務経歴書

Korean:

- 접근성
- 국제화
- 프론트엔드 개발자
- 이력서

Do not introduce competing translations without a reason.

## Final principle

The goal is not:

> "Make every translation maximally formal, conventional, or literal."

The goal is:

> "Make every language sound like Griffen naturally speaks that language."

When in doubt, prefer **natural + personal + intentional over literal + generic + technically perfect**.
