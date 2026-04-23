import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const DatenschutzPage = () => {
  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <Helmet>
        <title>Datenschutz - Wiener Solutions</title>
        <meta name="description" content="Datenschutzerklärung der Wiener Solutions." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-3xl p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Datenschutzerklärung</h1>
          
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-lg font-medium text-foreground mb-2">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn du diese Website besuchst. Personenbezogene Daten sind alle Daten, mit denen du persönlich identifiziert werden kannst.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="text-lg font-medium text-foreground mb-2">Datenschutz</h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz deiner persönlichen Daten sehr ernst. Wir behandeln deine personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
              <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Hinweis zur verantwortlichen Stelle</h3>
              <p>
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
                Wiener Solutions<br />
                Inh. Lasse Wiener<br />
                Cuvrystraße 39<br />
                10997 Berlin<br />
                E-Mail: kontakt@wienersolutions.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Datenerfassung auf dieser Website</h2>
              <h3 className="text-lg font-medium text-foreground mb-2">Cookies</h3>
              <p>
                Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf deinem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf deinem Endgerät gespeichert.
              </p>
              <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Kontaktformular / E-Mail-Kontakt</h3>
              <p>
                Wenn du uns per E-Mail oder über ein Kontaktformular Anfragen zukommen lässt, werden deine Angaben aus der Anfrage inklusive der von dir dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne deine Einwilligung weiter.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Plugins und Tools</h2>
              <h3 className="text-lg font-medium text-foreground mb-2">Calendly</h3>
              <p>
                Auf unserer Website haben wir den Dienst Calendly eingebunden, um dir eine einfache Terminvereinbarung zu ermöglichen. Anbieter ist die Calendly LLC, 271 17th St NW, 10th Floor, Atlanta, Georgia 30363, USA.
              </p>
              <p className="mt-2">
                Wenn du das Terminbuchungs-Tool nutzt, werden deine eingegebenen Daten (z.B. Name, E-Mail-Adresse, Zeitpunkt des Termins) an Calendly übertragen und dort auf den Servern von Calendly gespeichert. Die Nutzung von Calendly erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an einer möglichst unkomplizierten Terminvereinbarung mit Kunden und Interessenten.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Deine Rechte</h2>
              <p>
                Du hast jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck deiner gespeicherten personenbezogenen Daten zu erhalten. Du hast außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz kannst du dich jederzeit an uns wenden.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DatenschutzPage;