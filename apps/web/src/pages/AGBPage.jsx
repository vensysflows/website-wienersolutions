import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const AGBPage = () => {
  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <Helmet>
        <title>AGB - Wiener Solutions</title>
        <meta name="description" content="Allgemeine Geschäftsbedingungen der Wiener Solutions." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-3xl p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
          
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">§ 1 Geltungsbereich</h2>
              <p>
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, die zwischen Wiener Solutions, Inh. Lasse Wiener, Cuvrystraße 39, 10997 Berlin (nachfolgend "Dienstleister") und dem Kunden (nachfolgend "Kunde") geschlossen werden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">§ 2 Vertragsgegenstand und Leistungen</h2>
              <p>
                Der Dienstleister bietet Beratungs- und Entwicklungsdienstleistungen im Bereich Künstliche Intelligenz und Prozessautomatisierung an. Der genaue Leistungsumfang ergibt sich aus dem jeweiligen individuellen Angebot oder Projektvertrag.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">§ 3 Vertragsschluss</h2>
              <p>
                Ein Vertrag kommt durch die Annahme eines Angebots des Dienstleisters durch den Kunden zustande. Die Annahme kann schriftlich, per E-Mail oder durch schlüssiges Handeln (z.B. Beginn der Leistungserbringung mit Zustimmung des Kunden) erfolgen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">§ 4 Vergütung und Zahlungsbedingungen</h2>
              <p>
                Die Vergütung richtet sich nach dem individuell vereinbarten Angebot. Alle Preise verstehen sich netto zuzüglich der gesetzlichen Mehrwertsteuer. Rechnungen sind, sofern nicht anders vereinbart, innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zahlbar.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">§ 5 Mitwirkungspflichten des Kunden</h2>
              <p>
                Der Kunde verpflichtet sich, den Dienstleister bei der Erbringung der vereinbarten Leistungen angemessen zu unterstützen. Dazu gehört insbesondere die rechtzeitige Bereitstellung notwendiger Informationen, Daten und Zugänge zu Systemen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">§ 6 Haftung</h2>
              <p>
                Der Dienstleister haftet für Vorsatz und grobe Fahrlässigkeit. Für leichte Fahrlässigkeit haftet der Dienstleister nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten). Die Haftung ist in diesem Fall auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">§ 7 Schlussbestimmungen</h2>
              <p>
                Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für alle Streitigkeiten aus dem Vertragsverhältnis ist Berlin, sofern der Kunde Kaufmann, eine juristische Person des öffentlichen Rechts oder ein öffentlich-rechtliches Sondervermögen ist.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AGBPage;