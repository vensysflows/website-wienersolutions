/**
 * Variant System — /rechnungen A/B/C Testing
 *
 * HOW TO ADD A NEW VARIANT:
 * 1. Add an entry to VARIANTS below with the variant key (e.g. "v2")
 * 2. Define which components or props differ from the control ("v1")
 * 3. The variant key maps directly to utm_content in Meta Ads
 *
 * HOW VARIANTS ARE ASSIGNED:
 * - utm_content=v1/v2/v3 in URL → that variant is shown and stored in cookie
 * - No utm_content → random assignment from ACTIVE_VARIANTS, stored in cookie
 * - Return visit without UTM → cookie is read → same variant shown
 *
 * TRACKING:
 * Every tracking event includes { variant } automatically via useVariant hook.
 * The variant value is written to the `variant` column in data_table_user_neRaB4UNxM9U4NoW.
 *
 * OPTIMIZATION ROUTINE:
 * A Claude Code agent runs every 4-5 days (see OPTIMIZATION_PROMPT.md in repo root).
 * It reads conversion data per variant, replaces the worst performer, and
 * documents results in Notion: Wiener Solutions > Website > A/B Test Log.
 */

export const ACTIVE_VARIANTS = ['v1', 'v2', 'v3'];

export const CONTROL_VARIANT = 'v1';

export const VARIANTS = {
  v1: {
    label: 'Control',
    description: 'Original version — baseline for all comparisons',
    /**
     * Add variant-specific props here when building variant v1.
     * Example:
     * heroHeadline: 'Wie viel Zeit verschwendest du gerade für Rechnungen?',
     * ctaText: 'Jetzt kostenlos automatisieren lassen →',
     */
  },

  v2: {
    label: 'Variant B',
    description: 'Placeholder — to be defined by optimization agent',
    /**
     * Add variant-specific props here when building variant v2.
     */
  },

  v3: {
    label: 'Variant C',
    description: 'Placeholder — to be defined by optimization agent',
    /**
     * Add variant-specific props here when building variant v3.
     */
  },
};

export const COOKIE_KEY = 'ws_variant';
export const COOKIE_DAYS = 30;
