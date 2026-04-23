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
 *
 * PROPS CONSUMED BY COMPONENTS (must be wired up in each component):
 * - RechnungsRechner:  rechnerBadgeText, rechnerHeadline, rechnerSubline,
 *                      rechnerResultCTAText, rechnerTrustSignal1/2/3
 * - ProblemSection2:   problemCards (array of { icon, title, description })
 * - FinalCTASection:   finalHeadline, finalSubline, finalCTAText
 */

export const ACTIVE_VARIANTS = ['v1', 'v2', 'v3'];

export const CONTROL_VARIANT = 'v1';

export const VARIANTS = {
  v1: {
    label: 'Control — Baseline',
    description: 'Original version — identical to the hardcoded defaults. All other variants are measured against this.',

    // RechnungsRechner
    rechnerBadgeText: 'Ø Kunde spart 8 Stunden pro Woche',
    rechnerHeadline: 'Wie viel Zeit verschwendest du gerade für Rechnungen?',
    rechnerSubline: 'Berechne deine Zeitersparnis in 60 Sekunden.',
    rechnerResultCTAText: 'Jetzt kostenlos automatisieren lassen',
    rechnerTrustSignal1: 'Kostenloses Setup in 7 Tagen',
    rechnerTrustSignal2: 'Zeitersparnis-Garantie',
    rechnerTrustSignal3: 'DSGVO-konform',

    // ProblemSection2
    problemCards: [
      {
        icon: 'Clock',
        title: 'Einen Arbeitstag pro Woche für Buchhaltung.',
        description: 'Erstellen, versenden, nachverfolgen. Alles manuelle Arbeit für die Mitarbeiter gebraucht werden.',
      },
      {
        icon: 'XCircle',
        title: 'Mahnungen werden vergessen.',
        description: 'Wer verfolgt, welche Rechnung seit 30 Tagen offen ist? Meistens niemand.',
      },
      {
        icon: 'FolderOpen',
        title: 'Der Steuerberater wartet wieder auf Belege.',
        description: 'Monatliche Belegvorbereitung ist unsichtbare Arbeit — die immer Freitagabend passiert.',
      },
    ],

    // FinalCTASection
    finalHeadline: 'Deine Rechnungen schreiben sich nicht von selbst.',
    finalSubline: 'Lass uns in 30 Minuten herausfinden, was bei dir möglich ist.',
    finalCTAText: 'Kostenlosen Termin buchen',
  },

  v2: {
    label: 'Handwerker-Spezifität',
    description: 'Message-Match zum Handwerker-Hook der neuesten Meta Ads ("Als Handwerker hörst du um 17 Uhr auf. Deine Rechnungen sollten das auch."). Testet ob Zielgruppen-Spezifität die Calculator Completion und CTA Rate erhöht.',

    // RechnungsRechner
    rechnerBadgeText: 'Handwerker sparen Ø 6 Stunden pro Woche',
    rechnerHeadline: 'Als Handwerker: Wie viele Stunden verlierst du wöchentlich für Rechnungen?',
    rechnerSubline: 'In 60 Sekunden berechnen — danach weißt du genau, was dich das kostet.',
    rechnerResultCTAText: 'Jetzt Rechnungsprozess automatisieren lassen',
    rechnerTrustSignal1: 'Setup komplett kostenlos',
    rechnerTrustSignal2: 'Du zahlst nur, wenn es läuft',
    rechnerTrustSignal3: 'DSGVO-konform',

    // ProblemSection2
    problemCards: [
      {
        icon: 'Clock',
        title: 'Nach einem langen Arbeitstag fängst du erst mit Rechnungen an.',
        description: 'Du hörst auf zu arbeiten — aber die Buchhaltung fängt dann erst an. Das kostet dich Abende, Wochenenden, Energie.',
      },
      {
        icon: 'XCircle',
        title: 'Mahnungen passieren zu spät oder gar nicht.',
        description: 'Wer erinnert sich an jede offene Rechnung? Geld bleibt liegen, weil niemand konsequent nachfasst.',
      },
      {
        icon: 'FolderOpen',
        title: 'Belege sammeln, sortieren, einreichen — jeden Monat.',
        description: 'Belegvorbereitung für den Steuerberater ist unsichtbare Arbeit, die immer Freitagabend passiert.',
      },
    ],

    // FinalCTASection
    finalHeadline: 'Deine Rechnungen halten dich vom Handwerk ab. Nicht mehr.',
    finalSubline: 'Lass uns in 30 Minuten deinen kompletten Rechnungsprozess automatisieren.',
    finalCTAText: 'Kostenlosen Termin buchen',
  },

  v3: {
    label: 'Direkter Einstieg — kein Rechner',
    description: 'Kein Calculator. Direkte Hook-Section mit sofortigem CTA. Social Proof kommt vor Problem Section für frühen Vertrauensaufbau. ValueStack entfällt für kürzeren Funnel. Testet ob ein direkterer Pfad ohne Calculator-Hürde mehr Buchungen erzeugt.',

    // Layout-Flags
    showCalculator: false,
    showValueStack: false,
    socialProofFirst: true,

    // Hero-Section (ersetzt den Rechner)
    rechnerBadgeText: 'Spart 12 Std/Woche — Setup in 5 Tagen',
    rechnerHeadline: 'Du hast heute gearbeitet. Warum tippst du jetzt noch Rechnungen?',
    rechnerSubline: 'Ich automatisiere deinen kompletten Rechnungsprozess — Erstellung, Versand, Mahnung, Zahlungsabgleich. Einmal einrichten, danach läuft es.',
    rechnerResultCTAText: 'Kostenloses Erstgespräch buchen →',
    rechnerTrustSignal1: 'Setup komplett kostenlos',
    rechnerTrustSignal2: 'Du zahlst nur, wenn es läuft',
    rechnerTrustSignal3: 'DSGVO-konform',

    // ProblemSection2
    problemCards: [
      {
        icon: 'Clock',
        title: 'Jeden Abend Rechnungen statt Feierabend.',
        description: 'Erstellen, versenden, nachverfolgen — das passiert immer dann, wenn eigentlich Schluss ist. Abende, Wochenenden, Urlaub.',
      },
      {
        icon: 'XCircle',
        title: 'Mahnungen, die niemand schickt.',
        description: 'Offene Rechnungen fallen durchs Raster. Kein System, das automatisch nachfasst — also bleibt Geld liegen.',
      },
      {
        icon: 'FolderOpen',
        title: 'Belegchaos kurz vor dem Steuerberater-Termin.',
        description: 'Jeden Monat die gleiche Panik: Belege suchen, sortieren, einreichen. Unsichtbare Arbeit die sich aufstaut.',
      },
    ],

    // FinalCTASection
    finalHeadline: 'Einmal einrichten. Nie mehr anfassen.',
    finalSubline: 'In 30 Minuten zeige ich dir, wie dein Rechnungsprozess dauerhaft auf Autopilot geht.',
    finalCTAText: 'Kostenloses Erstgespräch buchen →',
  },
};

export const COOKIE_KEY = 'ws_variant';
export const COOKIE_DAYS = 30;
