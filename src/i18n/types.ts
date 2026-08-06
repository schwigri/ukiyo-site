import type { ENGLISH_STRINGS } from "./constants";

export type UIString = keyof typeof ENGLISH_STRINGS;

export type UITranslationPart = string | { rb: string; rt: string };

export type UITranslation = string | ReadonlyArray<UITranslationPart>;
