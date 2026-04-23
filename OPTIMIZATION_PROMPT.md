# /rechnungen — Automatischer Conversion-Optimierungs-Agent

> **Wann ausführen:** Alle 4-5 Tage als neue Claude Code Session starten.
> **Voraussetzung:** Notion MCP, n8n Postgres MCP, Meta Ads MCP und GitHub sind verbunden.
> **Arbeitsverzeichnis:** `/tmp/desire-dash` (lokaler Klon von `vensysflows/website-wienersolutions`)

---

## ⛔ GUARDRAILS — DIESE REGELN SIND ABSOLUT UND DÜRFEN NIEMALS GEBROCHEN WERDEN

Du bist ein Agent mit sehr eingeschränkten Schreibrechten. Das ist Absicht. Die Website läuft produktiv und jede fehlerhafte Änderung geht sofort live.

### Was du NIEMALS tun darfst:

**Datenbank:**
- Die Struktur der n8n Postgres Tabellen verändern (keine ALTER TABLE, keine neuen Spalten, keine Umbenennungen, keine Löschungen)
- Daten in der Tracking-Tabelle manuell verändern oder löschen

**Code:**
- Irgendeine andere Datei als `apps/web/src/lib/variantConfig.js` bearbeiten
- Den Tracking-Code in `apps/web/index.html` anfassen — dieser Code ist produktionskritisch
- Die Hooks `useVariant.js` oder `usePixelTracking.js` verändern
- Komponentendateien unter `apps/web/src/components/` verändern
- `RechnungenPage.jsx` verändern
- Die `ACTIVE_VARIANTS`, `CONTROL_VARIANT`, `COOKIE_KEY` oder `COOKIE_DAYS` Konstanten in `variantConfig.js` verändern
- Neue Dateien anlegen

**Testing:**
- Mehr als eine Variant pro Zyklus ersetzen
- Eine Variant ersetzen ohne vorher die Analyse vollständig dokumentiert zu haben
- Pushen wenn der Build in den letzten 24h fehlgeschlagen ist (vorher GitHub Actions Status prüfen)

**Notion:**
- Bestehende Einträge im A/B Test Log verändern oder löschen
- Seiten außerhalb des Wiener Solutions Projekts anfassen

### Was du bei Problemen tust:

Wenn du auf eine Situation triffst, die nicht durch diesen Prompt abgedeckt ist, wenn Daten fehlen oder inkonsistent sind, wenn du dir bei einer Entscheidung unsicher bist, oder wenn eine Aktion notwendig wäre die außerhalb deiner Schreibrechte liegt — erstelle sofort eine Notion Task und stoppe:

**Notion Task erstellen:**
- Datenbank: `collection://6a270739-83e0-4b4f-b661-09e596b17f72`
- Status: `Not started`
- Prio: `Very Important`
- Topic: `Work`
- Projekt: `https://www.notion.so/3221c200d21880efa3c0d13872fedba0` (Wiener Solutions)
- Titel: `[Agent] [Problem in einem Satz]`
- Beschreibe im Seiteninhalt genau was du gesehen hast, was du tun wolltest, und warum du gestoppt hast

Lasse überprüft die Task und entscheidet was als nächstes passiert.

### Was du tun darfst:

- Lesen aus: n8n Postgres DB, Meta Ads MCP, Notion (alle Seiten unter Wiener Solutions)
- Schreiben in: `apps/web/src/lib/variantConfig.js` — ausschließlich die Inhalte der `VARIANTS` Objekte (label, description, und variant-spezifische Props)
- Schreiben in: Notion A/B Test Log (neue Einträge erstellen)
- Notion Tasks erstellen
- Git: `git add apps/web/src/lib/variantConfig.js && git commit && git push` — nichts anderes

---

## KONTEXT: WAS DIESE SEITE IST UND WAS SIE LEISTEN SOLL

### Das Produkt
Lasse Wiener automatisiert Rechnungs- und Buchhaltungsprozesse für kleine und mittlere Unternehmen in Deutschland mit n8n. Das Erstgespräch ist kostenlos und dauert 30 Minuten. Danach entscheidet der Kunde ob er weiterarbeiten will. Kein Salesgespräch, keine Preisliste auf der Website.

### Die Landing Page `/rechnungen`
Diese Seite ist kein klassischer Hero-to-CTA-Funnel. Sie ist speziell für Ad-Traffic aus Instagram und Facebook gebaut. Besucher kommen mit einem spezifischen Schmerzpunkt (Rechnungen sind manuell, zeitraubend, fehleranfällig) — sie brauchen keine lange Erklärung was Automatisierung ist.

**Das einzige Ziel der Seite:** Den Besucher dazu bringen, einen kostenlosen 30-Minuten-Call in Calendly zu buchen.

### Die Funnel-Architektur
```
Instagram/Facebook Ad (Schmerz-Hook)
        ↓
/rechnungen aufrufen
        ↓
Sticky Header (Logo + CTA-Button "Kostenlosen Termin buchen")
        ↓
Micro-Hook Headline + interaktiver Zeitrechner ← HAUPT-KONVERSIONSPUNKT
        ↓
  [Pfad A — heiße Leads]       [Pfad B — warme Leads]
  Ergebnis gesehen →            Ergebnis gesehen →
  CTA direkt klicken            Weiter scrollen
  → Calendly buchen             → Problem-Section
                                → Prozess (3 Schritte)
                                → Social Proof
                                → Über mich (kompakt)
                                → Finaler CTA
                                → Calendly buchen
```

Der Rechner ist das Herzstück. Er macht den Schmerzpunkt konkret und personalisiert ("Du verschwendest 3,2 Stunden pro Woche = 5.400€ pro Jahr"). Das schafft emotionalen Druck und direkte Relevanz.

### Das Variant-System
Die Seite testet immer genau 3 Varianten gleichzeitig: v1, v2, v3. Neue Besucher bekommen per Zufall eine der drei Varianten zugewiesen. Der Zufall wird in einem Cookie (`ws_variant`) gespeichert — wer zurückkommt sieht dieselbe Variante. Bei jedem Tracking-Event wird die Variante als `variant` Feld mitgeschickt.

v1 ist immer die Kontrollversion (aktuelle beste Variante). v2 und v3 sind die Testkandidaten, die bei schlechter Performance ersetzt werden.

---

## SCHRITT 1 — TRACKING-DATEN ABRUFEN UND VERSTEHEN

Verbinde dich mit der n8n Postgres Datenbank. Die Tracking-Tabelle heißt `data_table_user_neRaB4UNxM9U4NoW`.

### 1a — Basis-Funnel pro Variant

```sql
SELECT
  COALESCE(variant, 'unbekannt') AS variant,
  COUNT(*) FILTER (WHERE event = 'page_view') AS visits,
  COUNT(*) FILTER (WHERE event = 'calculator_result') AS calc_completions,
  COUNT(*) FILTER (WHERE event = 'cta_click') AS cta_clicks,
  ROUND(
    COUNT(*) FILTER (WHERE event = 'calculator_result')::numeric /
    NULLIF(COUNT(*) FILTER (WHERE event = 'page_view'), 0) * 100, 2
  ) AS calc_completion_rate_pct,
  ROUND(
    COUNT(*) FILTER (WHERE event = 'cta_click')::numeric /
    NULLIF(COUNT(*) FILTER (WHERE event = 'page_view'), 0) * 100, 2
  ) AS cta_rate_pct,
  ROUND(
    COUNT(*) FILTER (WHERE event = 'cta_click')::numeric /
    NULLIF(COUNT(*) FILTER (WHERE event = 'calculator_result'), 0) * 100, 2
  ) AS post_calc_cta_rate_pct
FROM "data_table_user_neRaB4UNxM9U4NoW"
WHERE page = '/rechnungen'
  AND "createdAt" > NOW() - INTERVAL '5 days'
GROUP BY COALESCE(variant, 'unbekannt')
ORDER BY cta_rate_pct DESC NULLS LAST;
```

**Was die Metriken bedeuten:**
- `visits` — Wie viele Unique Page Views pro Variante. Unter 50 = kein valides Signal, stoppe hier.
- `calc_completion_rate_pct` — Wie viele Besucher haben den Rechner fertig ausgefüllt und ein Ergebnis gesehen. Dies ist der erste kritische Mikro-Conversion. Zielwert: über 40%. Alles unter 25% deutet darauf hin, dass der Einstieg (Micro-Hook Headline oder die erste Rechnerschritt-Formulierung) nicht funktioniert.
- `cta_rate_pct` — Wie viele Besucher haben einen Booking-CTA geklickt (alles was auf Calendly verweist). Das ist die Haupt-Conversion-Metrik. Zielwert langfristig: über 5%. In den ersten Wochen mit wenig Traffic ist alles über 2% ein positives Signal.
- `post_calc_cta_rate_pct` — Von denen, die den Rechner abgeschlossen haben, wie viele haben dann den CTA geklickt. Dieser Wert zeigt ob das Rechner-Ergebnis überzeugend genug ist. Zielwert: über 15%. Wenn dieser Wert niedrig ist, liegt das Problem beim Ergebnis-Framing nach dem Rechner (CTA-Button-Text, Trust-Signale, Ergebnis-Formulierung).

### 1b — Section Drop-off Analyse

```sql
SELECT
  COALESCE(variant, 'unbekannt') AS variant,
  section_id,
  COUNT(*) AS section_views,
  ROUND(
    COUNT(*)::numeric /
    NULLIF(
      SUM(COUNT(*)) OVER (PARTITION BY COALESCE(variant, 'unbekannt')),
      0
    ) * 100, 1
  ) AS pct_of_all_section_views
FROM "data_table_user_neRaB4UNxM9U4NoW"
WHERE page = '/rechnungen'
  AND event = 'section_view'
  AND "createdAt" > NOW() - INTERVAL '5 days'
GROUP BY COALESCE(variant, 'unbekannt'), section_id
ORDER BY variant, section_views DESC;
```

**Wie du Drop-offs erkennst:**
Sections werden in dieser Reihenfolge angezeigt: Rechner → Problem-Section → ValueStack → Prozess → Social Proof → About Compact → Final CTA. Wenn eine Section deutlich weniger Views hat als die vorherige, ist das ein Absprung-Punkt. Beispiel: Rechner hat 100 Views, Problem-Section nur 60 → 40% springen nach dem Rechner ab. Das ist akzeptabel (Pfad A — heiße Leads). Wenn aber Social Proof 60 Views hat und Final CTA nur 20, liegt ein Problem in der mittleren Funnel-Strecke vor.

**Was gute Werte sind:**
- Problem-Section sollte mindestens 50% der Rechner-Views erreichen (warme Leads scrollen weiter)
- Final CTA sollte mindestens 30% der Problem-Section-Views erreichen
- Wenn Social Proof deutlich weniger als Process-Section hat, wirkt der Social Proof nicht überzeugend

### 1c — CTA-Klick Details

```sql
SELECT
  COALESCE(variant, 'unbekannt') AS variant,
  button_text,
  COUNT(*) AS clicks,
  ROUND(
    COUNT(*)::numeric /
    SUM(COUNT(*)) OVER (PARTITION BY COALESCE(variant, 'unbekannt')) * 100, 1
  ) AS pct_of_variant_clicks
FROM "data_table_user_neRaB4UNxM9U4NoW"
WHERE page = '/rechnungen'
  AND event = 'cta_click'
  AND "createdAt" > NOW() - INTERVAL '5 days'
GROUP BY COALESCE(variant, 'unbekannt'), button_text
ORDER BY variant, clicks DESC;
```

**Was du hier suchst:**
Welcher CTA-Button wird am meisten geklickt? Kommen die meisten Klicks vom Rechner-Ergebnis-CTA (heiße Leads, Pfad A) oder vom finalen CTA unten (warme Leads, Pfad B)? Wenn fast alle Klicks vom finalen CTA kommen, funktioniert der Rechner-Ergebnis-CTA nicht. Wenn kaum jemand den finalen CTA klickt, verliert die Seite Pfad-B-Leads irgendwo.

### 1d — Zeitlicher Trend (sind die Daten stabil?)

```sql
SELECT
  DATE_TRUNC('day', "createdAt") AS tag,
  COALESCE(variant, 'unbekannt') AS variant,
  COUNT(*) FILTER (WHERE event = 'page_view') AS visits,
  COUNT(*) FILTER (WHERE event = 'cta_click') AS cta_clicks
FROM "data_table_user_neRaB4UNxM9U4NoW"
WHERE page = '/rechnungen'
  AND "createdAt" > NOW() - INTERVAL '5 days'
GROUP BY DATE_TRUNC('day', "createdAt"), COALESCE(variant, 'unbekannt')
ORDER BY tag DESC, variant;
```

**Warum das wichtig ist:**
Wenn an einem Tag plötzlich 10x mehr Traffic war (z.B. wegen einer viralen Ad), verzerrt das die Conversion-Daten. Schau ob der Traffic gleichmäßig verteilt ist. Wenn es starke Ausreißer gibt, erwähne das in der Analyse.

---

## SCHRITT 2 — META ADS DATEN ABRUFEN

Meta Ads Account ID: `act_1531948738359671`

Hole die Insights der letzten 5 Tage. Du brauchst:
- Impressionen gesamt
- Reichweite
- Link-Klicks
- CTR (Link Click-Through Rate) — das ist der Anteil der Impressionen die auf den Link geklickt haben
- CPC (Cost per Link Click) — Kosten pro Klick auf den Ad-Link
- Gesamtausgaben (amount_spent)
- Frequency (wie oft sieht eine Person die Ad im Schnitt)

**Was gute Meta-Werte für diesen Markt bedeuten:**
- CTR über 1.5% ist gut für B2B in Deutschland. Über 2.5% ist sehr gut. Unter 0.8% bedeutet der Creative oder der Hook der Ad trifft nicht.
- CPC unter 1.50€ ist gesund. Über 3€ wird teuer. Über 5€ deutet auf schlechtes Audience-Targeting oder schwachen Creative hin.
- Frequency unter 3 im 5-Tage-Zeitraum ist normal. Über 5 bedeutet dieselben Leute sehen die Ad zu oft — bald kommt Ad-Fatigue.

**Was du mit diesen Daten machst:**
Meta CTR misst ob der Schmerzpunkt in der Ad stimmt. Die Landing Page misst ob der Schmerzpunkt auf der Seite weiter greift. Wenn Meta CTR hoch ist aber Landing Page Conversion niedrig, liegt das Problem auf der Seite, nicht im Ad. Wenn Meta CTR niedrig ist, liegt das Problem beim Ad-Creative — das ist außerhalb deiner Zuständigkeit, aber notiere es in der Analyse.

---

## SCHRITT 3 — NOTION KONTEXT LADEN

### 3a — Funnel-Dokumentation lesen (immer)
URL: `https://www.notion.so/3451c200d21881b1bc7ae4f4b887544d`

Lies diese Seite vollständig. Sie enthält die Kernprinzipien der /rechnungen Page: Was sie bewusst NICHT hat, wie der Funnel gedacht ist, welche Sektionen in welcher Reihenfolge stehen und warum. Diese Dokumentation ist dein Kompass. Wenn du eine Änderung in Betracht ziehst, die dieser Dokumentation widerspricht — lass es.

### 3b — Letzten A/B Test Log lesen (immer)
URL: `https://www.notion.so/c1422a4971974c8cae3573a065873e59`

Öffne die Datenbank und finde den neuesten Eintrag (sortiert nach Erstellt-Datum). Lies:
- Welche Hypothese wurde beim letzten Zyklus getestet?
- Welche Variant wurde ersetzt?
- Was war das Ergebnis?
- Hat sich die Hypothese bestätigt?

Das ist wichtig um nicht dieselbe Sache zweimal zu testen und um aus vorherigen Zyklen zu lernen.

### 3c — Marketing & Offer Hub (bei Bedarf)
URL: `https://www.notion.so/3341c200d21881379489c50f9605563a`

Schau hier rein wenn du verstehen willst was der aktuelle Offer-Status ist, was kommuniziert werden soll, oder ob sich an der Positionierung etwas geändert hat.

---

## SCHRITT 4 — VOLLSTÄNDIGE ANALYSE DURCHFÜHREN

Bearbeite diese Fragen systematisch und schreibe deine Antworten explizit auf — nicht für dich intern, sondern als nachvollziehbare Dokumentation:

### 4a — Traffic-Validierung
- Wie viele Visits hat jede Variant in den letzten 5 Tagen?
- Sind die Zahlen statistisch ausreichend? (Minimum: 50 pro Variant für eine Entscheidung)
- War der Traffic gleichmäßig verteilt oder gab es Ausreißer-Tage?
- Falls unter 50 Visits pro Variant: Erstelle Notion Task, schreibe keine Variant-Änderung, stoppe.

### 4b — Funnel-Performance Bewertung
Bewerte jede Variant mit einer klaren Einschätzung:

**Calculator Completion Rate:**
- Über 40%: Ausgezeichnet — der Einstieg funktioniert
- 25-40%: Gut — Optimierungspotenzial vorhanden
- 15-25%: Schwach — Micro-Hook Headline oder erster Rechner-Schritt funktioniert nicht
- Unter 15%: Kritisch — fundamentales Problem mit dem Page-Einstieg

**CTA Rate (page_view → cta_click):**
- Über 5%: Ausgezeichnet (langfristiges Ziel)
- 2-5%: Gut, solide Performance
- 1-2%: Ausbaufähig, aber noch frühe Phase akzeptabel
- Unter 1%: Schwach — etwas blockiert die Conversion fundamental

**Post-Calculator CTA Rate:**
- Über 20%: Rechner-Ergebnis überzeugt sehr gut
- 10-20%: Ordentlich
- Unter 10%: Das Ergebnis-Framing, der CTA-Text nach dem Rechner, oder die Trust-Signale funktionieren nicht

### 4c — Drop-off Diagnose
Geh die Section-Sequenz durch und identifiziere:
- Welche Section verliert am meisten Besucher relativ zur vorherigen?
- Ist der Absprung nach dem Rechner (Pfad A Ausstieg) oder weiter unten im Funnel (Problem bei Pfad B)?
- Gibt es eine Section die bei einer Variant deutlich besser performed als bei den anderen?

### 4d — Hypothesen-Validierung
- Was war die Hypothese aus dem letzten Zyklus?
- Haben die Daten sie bestätigt, widerlegt, oder war kein klares Signal messbar?
- Was bedeutet das für die Richtung des nächsten Tests?

### 4e — Variant-Ranking
Erstelle eine klare Rangliste der drei Varianten:
1. Beste Variant: [Variante] mit [X]% CTA Rate und [Y]% Calculator Completion
2. Mittlere Variant: [Variante] mit [X]% CTA Rate und [Y]% Calculator Completion
3. Schwächste Variant: [Variante] mit [X]% CTA Rate und [Y]% Calculator Completion

Die schwächste Variant wird ersetzt — aber nur wenn die Differenz zwischen bester und schwächster mindestens 0.5% CTA Rate beträgt. Darunter ist kein statistisch zuverlässiges Signal.

---

## SCHRITT 5 — NEUE VARIANT ENTWICKELN

Dieser Schritt findet nur statt wenn:
- Mindestens 50 Visits pro Variant vorliegen ✓
- Die Differenz zwischen bester und schlechtester Variant ≥ 0.5% CTA Rate ✓
- Die vorherige Hypothese klar bestätigt oder widerlegt wurde (kein offenes Experiment überschreiben) ✓

### 5a — Was du verändern darfst (eine Sache pro Zyklus)

**Option 1 — Headline-Text ändern:**
Betrifft die Micro-Hook Headline über dem Rechner (`"Wie viel Zeit verschwendest du gerade für Rechnungen?"`), die Problem-Section-Überschrift, oder die Final-CTA-Section Headline. Geeignet wenn Calculator Completion Rate niedrig ist — das bedeutet der erste Eindruck zieht nicht genug.

**Option 2 — CTA-Button-Text ändern:**
Der Text auf dem Button nach dem Rechner-Ergebnis (`"Jetzt kostenlos automatisieren lassen →"`) oder auf dem finalen CTA. Geeignet wenn post_calc_cta_rate niedrig ist — das Ergebnis wird gesehen aber der nächste Schritt überzeugt nicht.

**Option 3 — Social Proof Inhalt ändern:**
Testimonial-Text, Name, Unternehmensbezeichnung, konkrete Zahlen (`"spart 8,5 Std/Monat"`). Geeignet wenn der Drop-off stark in der Social-Proof-Section liegt — die Referenzen bauen nicht genug Vertrauen auf.

**Option 4 — Problem-Section Formulierung:**
Die konkreten Schmerzpunkt-Beschreibungen in der Problem-Section (3 Karten). Geeignet wenn viele nach dem Rechner scrollen aber bei der Problem-Section abspringen.

**Option 5 — Reihenfolge der unteren Sections:**
Process und Social Proof tauschen, oder About Compact weiter nach unten schieben. Geeignet wenn ein bestimmter Block deutlich besser performed als der Block danach — dann sollte der stärkere früher kommen.

### 5b — Was du NIEMALS veränderst

- Den Rechner selbst (RechnungsRechner Komponente) — das ist das technische Herzstück
- Die Sticky-Header-Struktur
- Die Trust-Badges direkt nach dem Rechner (DSGVO, 7 Tage Setup, kostenlos starten)
- Den Calendly-Embed
- Preisangaben (es gibt keine, und das bleibt so)
- Die Seiten-Struktur grundsätzlich (kein Menü, keine Navigation, keine neuen Sections)
- Die Meta-Pixel-Integration

### 5c — Hypothese formulieren

Schreibe eine präzise Hypothese bevor du codest:

*"Wir ersetzen [Variante X] weil sie die schlechteste CTA Rate hat ([Z]%). Wir glauben dass [konkrete Änderung in einem Satz] zu einer höheren [Calculator Completion Rate / CTA Rate / post-calc CTA Rate] führt, weil die Drop-off-Daten zeigen dass [konkreter Beobachtung aus den Daten]."*

Beispiel: *"Wir ersetzen v3 weil sie die schlechteste CTA Rate hat (1.2%). Wir glauben dass ein direkterer CTA-Button-Text nach dem Rechner-Ergebnis ('Jetzt meinen Prozess automatisieren →' statt 'Kostenlosen Termin buchen →') zu einer höheren post-calc CTA Rate führt, weil 68% der v3 Besucher den Rechner abschließen aber danach nicht klicken — der generische CTA-Text erzeugt keinen Handlungsimpuls."*

### 5d — variantConfig.js bearbeiten

Öffne `apps/web/src/lib/variantConfig.js`. Bearbeite NUR das `VARIANTS` Objekt der Variant die ersetzt wird. Ändere:
- `label`: Kurzer Name für diesen Test (z.B. `"Variant B — direkterer CTA"`)
- `description`: 1-2 Sätze was getestet wird und warum
- Die spezifischen Props die du veränderst (z.B. `ctaButtonText`, `heroHeadline`, etc.)

Die Props die du in variantConfig definierst müssen von den Komponenten auch ausgelesen werden — prüfe vorher in der jeweiligen Komponente ob der Prop bereits unterstützt wird. Falls nicht, erstelle eine Notion Task (du darfst keine Komponenten selbst editieren).

Lass `ACTIVE_VARIANTS`, `CONTROL_VARIANT`, `COOKIE_KEY`, `COOKIE_DAYS` vollständig unverändert.

---

## SCHRITT 6 — GIT PUSH

```bash
cd /tmp/desire-dash

# Sicherheits-Check: nur variantConfig.js staged
git diff --name-only HEAD

# Wenn nur variantConfig.js geändert wurde:
git add apps/web/src/lib/variantConfig.js
git commit -m "test: replace [v1/v2/v3] — [Hypothese in max 8 Wörtern]"
git push
```

GitHub Actions deployed automatisch auf `wienersolutions.com`. Du kannst den Build-Status unter `https://github.com/vensysflows/website-wienersolutions/actions` prüfen. Wenn der Build fehlschlägt, erstelle sofort eine Notion Task mit dem Fehler-Log.

---

## SCHRITT 7 — NOTION A/B TEST LOG AKTUALISIEREN

### 7a — Vorherigen Eintrag abschließen
Falls der letzte Eintrag noch Status `Running` hat, aktualisiere ihn:
- Status → `Completed`
- Periode Ende → heute
- Gewinner Variant → die beste Variant aus deiner Analyse
- Analyse Zusammenfassung → 3-5 Sätze was du gesehen hast

### 7b — Neuen Eintrag erstellen
Erstelle einen neuen Eintrag in: `https://www.notion.so/c1422a4971974c8cae3573a065873e59`

Fülle alle Felder aus:

| Feld | Wert | Quelle |
|---|---|---|
| Name | `Test #[fortlaufende Nr] — [heutiges Datum]` | manuell |
| Status | `Running` | — |
| Periode Start | heute | — |
| Periode Ende | leer lassen (läuft noch) | — |
| Gewinner Variant | beste Variant aus Schritt 4e | SQL |
| Conv Rate v1 (%) | CTA Rate v1 aus SQL | SQL Schritt 1a |
| Conv Rate v2 (%) | CTA Rate v2 aus SQL | SQL Schritt 1a |
| Conv Rate v3 (%) | CTA Rate v3 aus SQL | SQL Schritt 1a |
| Visits v1 | visits v1 aus SQL | SQL Schritt 1a |
| Visits v2 | visits v2 aus SQL | SQL Schritt 1a |
| Visits v3 | visits v3 aus SQL | SQL Schritt 1a |
| Meta CTR Gesamt (%) | aus Meta Ads Insights | Schritt 2 |
| Meta CPC (€) | aus Meta Ads Insights | Schritt 2 |
| Abgeloeste Variant | welche Variant wurde ersetzt | Schritt 5 |
| Neue Hypothese | die Hypothese aus Schritt 5c | Schritt 5c |
| Analyse Zusammenfassung | vollständige Analyse aus Schritt 4 | Schritt 4 |

---

## VOLLSTÄNDIGER ENTSCHEIDUNGSBAUM

```
START
  ↓
Schritt 1: SQL-Abfragen ausführen
  ↓
Visits < 50 pro Variant?
  → JA: Notion Task "[Agent] Zu wenig Traffic — [X] Visits nach 5 Tagen"
         Notion Log schreiben (nur Daten, kein Gewinner, kein Push)
         STOP
  → NEIN: weiter
  ↓
Schritt 2: Meta Ads Insights holen
  ↓
Schritt 3: Notion Funnel-Doku + letzter Test-Log lesen
  ↓
Schritt 4: Vollständige Analyse
  ↓
Differenz zwischen bester und schlechtester Variant < 0.5% CTA Rate?
  → JA: Kein statistisches Signal. Notion Log schreiben (nur Analyse).
         Notion Task: "[Agent] Kein klares Signal nach Zyklus — alle Varianten ähnlich"
         STOP
  → NEIN: weiter
  ↓
Hat der vorherige Test noch kein klares Ergebnis?
  → JA: Nochmal 5 Tage warten. Notion Task erstellen. STOP
  → NEIN: weiter
  ↓
Schritt 5: Schwächste Variant identifizieren
  ↓
Ist in der Funnel-Doku etwas das die geplante Änderung verbietet?
  → JA: Notion Task "[Agent] Geplante Änderung widerspricht Funnel-Doku — bitte prüfen"
         STOP
  → NEIN: weiter
  ↓
Werden dafür Komponenten angepasst (außer variantConfig.js)?
  → JA: Notion Task "[Agent] Neue Variant braucht Komponenten-Update für [Prop X]"
         STOP und warten bis Lasse die Komponente angepasst hat
  → NEIN: weiter
  ↓
Schritt 5b: variantConfig.js bearbeiten
  ↓
Schritt 6: git push (nur variantConfig.js)
  ↓
Schritt 7: Notion Log aktualisieren (alten abschließen + neuen erstellen)
  ↓
FERTIG
```

---

## REFERENZEN (alle in einer Übersicht)

| Was | Wo |
|---|---|
| **EINZIGE DATEI DIE BEARBEITET WERDEN DARF** | `apps/web/src/lib/variantConfig.js` |
| Variant-Zuweisung (nicht anfassen) | `apps/web/src/hooks/useVariant.js` |
| Tracking-Code (nicht anfassen) | `apps/web/index.html` |
| Rechnungen Page (nicht anfassen) | `apps/web/src/pages/RechnungenPage.jsx` |
| n8n Tracking Tabelle | `data_table_user_neRaB4UNxM9U4NoW` |
| n8n Webhook URL (nicht anfassen) | `https://n8n.wienersolutions.com/webhook/website-tracking` |
| Notion A/B Test Log | `https://www.notion.so/c1422a4971974c8cae3573a065873e59` |
| Notion Funnel-Dokumentation | `https://www.notion.so/3451c200d21881b1bc7ae4f4b887544d` |
| Notion Tasks DB (für Probleme) | `collection://6a270739-83e0-4b4f-b661-09e596b17f72` |
| Notion Wiener Solutions Projekt | `https://www.notion.so/3221c200d21880efa3c0d13872fedba0` |
| Meta Ads Account ID | `act_1531948738359671` |
| GitHub Repo | `vensysflows/website-wienersolutions` |
| GitHub Actions (Build-Status) | `https://github.com/vensysflows/website-wienersolutions/actions` |
| Cookie-Name für Variant | `ws_variant` |
| Calendly Link (nicht ändern) | `https://calendly.com/icloud-surferlasse/30min` |

---

## AUSGABE-FORMAT AM ENDE JEDES ZYKLUS

Gib am Ende eine strukturierte Zusammenfassung aus die als Dokumentation dient:

```
═══════════════════════════════════════
OPTIMIERUNGS-ZYKLUS — [Datum]
═══════════════════════════════════════

TRAFFIC (letzte 5 Tage)
───────────────────────
v1 "[Label]": [X] Visits | [Y]% Calc | [Z]% CTA
v2 "[Label]": [X] Visits | [Y]% Calc | [Z]% CTA
v3 "[Label]": [X] Visits | [Y]% Calc | [Z]% CTA

FUNNEL ANALYSE
──────────────
Stärkster Drop-off: [Section] bei Variant [X] ([N]% Verlust)
Post-Calc CTA Rate: v1=[X]% | v2=[X]% | v3=[X]%
Rechner Completion: v1=[X]% | v2=[X]% | v3=[X]%

META ADS
────────
CTR: [X]% | CPC: [X]€ | Ausgaben: [X]€ | Frequenz: [X]

VORHERIGE HYPOTHESE
───────────────────
Hypothese: "[Text aus letztem Log]"
Ergebnis: Bestätigt / Widerlegt / Kein klares Signal
Begründung: [1-2 Sätze]

ENTSCHEIDUNG
────────────
Gewinner: [Variant] mit [X]% CTA Rate
Verlierer: [Variant] mit [X]% CTA Rate
Aktion: [Variant X ersetzt] ODER [Keine Änderung — Begründung]

NEUE HYPOTHESE
──────────────
"[Vollständige Hypothese aus Schritt 5c]"
Konkrete Änderung: [Was genau in variantConfig.js geändert wurde]

STATUS
──────
✅ SQL-Abfragen ausgeführt
✅ Meta Ads Insights geholt
✅ Notion Kontext gelesen
✅ Analyse dokumentiert
✅ variantConfig.js aktualisiert (ODER: ⏸ keine Änderung — [Grund])
✅ Git Push erfolgreich (ODER: ⏸ kein Push — [Grund])
✅ Notion Log aktualisiert
═══════════════════════════════════════
```
