/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare-pages" />
/// <reference types="@cloudflare/workers-types" />

import type { AppLoadContext as OriginalAppLoadContext } from '@remix-run/cloudflare';

declare module '@remix-run/server-runtime' {
	export interface AppLoadContext extends OriginalAppLoadContext {
		env: Record<string, string>;
	}
}
