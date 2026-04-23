import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const ImpressumPage = () => {
  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <Helmet>
        <title>Impressum - Wiener Solutions</title>
        <meta name="description" content="Impressum der Wiener Solutions." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-3xl p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Impressum</h1>
          
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Angaben gemäß § 5 TMG</h2>
              <p>
                Wiener Solutions<br />
                Inh. Lasse Wiener<br />
                Cuvrystraße 39<br />
                10997 Berlin
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Kontakt</h2>
              <p>
                E-Mail: kontakt@wienersolutions.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                [USt-IdNr. hier einfügen, falls vorhanden, ansonsten entfernen]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="mt-2">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImpressumPage;