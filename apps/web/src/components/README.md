# Components — /rechnungen Variant System

Diese Components werden vom /rechnungen Conversion-Optimierungs-Agent verwendet und folgen einer **Append-Only-Convention**.

## Naming Convention

- **Standard-Komponenten** (Default für v1): `<ComponentName>.jsx` — z.B. `HeroSection.jsx`, `ProblemSection.jsx`
- **Variant-spezifische Komponenten:** `<ComponentName>_<inhaltlicherHint>.jsx` — z.B. `HeroSection_painpoint.jsx`, `ProblemSection_handwerker.jsx`

**Erlaubte Hints (Beispiele):** `_handwerker`, `_painpoint`, `_testimonialFirst`, `_directEntry`, `_minimal`
**Verboten:** `_v2`, `_v3`, `_neu`, `_alt`, `_test` — der Hint muss beschreiben *was* die Komponente anders macht.

## Append-Only-Regel

- Bestehende Komponenten werden **niemals gelöscht** und **niemals umbenannt**
- Inhaltliche Änderung an einer bestehenden Komponente nur bei universellen Fixes (Bugs, Accessibility)
- Variant-spezifische Änderung → **neue Komponente** mit Hint-Suffix
- So entsteht eine wachsende Bibliothek wiederverwendbarer Variant-Bausteine

## Wie eine Komponente in einer Variant aktiviert wird

In `apps/web/src/lib/variantConfig.js`:

```js
v3: {
  // ... bestehende Props
  components: {
    hero: 'HeroSection_painpoint',
    problem: 'ProblemSection_handwerker'
    // weggelassene Slots fallen auf Default zurück
  }
}
```

`RechnungenPage.jsx` löst diese Overrides via Component-Map auf bestehende Imports auf. Eine neue Komponente muss in `RechnungenPage.jsx` importiert und in der Component-Map eingetragen werden, sonst findet sie kein Variant.

## Verfügbare Override-Slots

Aktuell unterstützt: `hero`, `problem`, `valueStack`, `process`, `socialProof`, `about`, `finalCTA`.

Neuer Slot? Erst Component-Map in `RechnungenPage.jsx` erweitern, dann hier dokumentieren.
