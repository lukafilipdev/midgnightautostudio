import type { Metadata } from "next";
import { LegalDoc } from "../components/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Midnight Auto Studio processes personal data in line with the EU GDPR and the Slovenian ZVOP-2.",
  alternates: {
    canonical: "/privacy",
    languages: {
      "x-default": "/privacy",
      sl: "/privacy",
      en: "/privacy",
      de: "/privacy",
    },
  },
  openGraph: {
    type: "article",
    url: "/privacy",
    title: "Privacy Policy | Midnight Auto Studio",
    description:
      "How Midnight Auto Studio processes personal data in line with the EU GDPR and the Slovenian ZVOP-2.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Midnight Auto Studio",
    description:
      "How Midnight Auto Studio processes personal data in line with the EU GDPR and the Slovenian ZVOP-2.",
  },
  robots: { index: true, follow: true },
};

const CONTACT_EMAIL = "info@midnightautostudio.com";
const COMPANY = "Midnight Auto Studio";

export default function PrivacyPage() {
  return (
    <LegalDoc
      titles={{
        sl: "Politika zasebnosti",
        en: "Privacy Policy",
        de: "Datenschutzerklärung",
      }}
      content={{
        sl: (
          <>
            <p>
              Ta politika zasebnosti pojasnjuje, kako {COMPANY} (v nadaljevanju
              &quot;mi&quot;, &quot;nas&quot;) obdeluje vaše osebne podatke v skladu s Splošno
              uredbo o varstvu podatkov (GDPR) in Zakonom o varstvu osebnih podatkov
              (ZVOP-2).
            </p>

            <h2>1. Upravljavec</h2>
            <p>
              Upravljavec osebnih podatkov je {COMPANY}. Za vsa vprašanja glede
              zasebnosti nas lahko kontaktirate na{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
            <p className="text-white/50">
              <em>
                Opomba: pred javno objavo dopolnite z uradnim nazivom podjetja,
                naslovom sedeža in matično/davčno številko.
              </em>
            </p>

            <h2>2. Kategorije podatkov, ki jih obdelujemo</h2>
            <ul>
              <li>
                <strong>Kontaktni podatki</strong> – ime, e-pošta, telefon, ki nam
                jih posredujete prek obrazca za povpraševanje ali rezervacijo.
              </li>
              <li>
                <strong>Podatki o vozilu</strong> – znamka, model in opis storitve,
                ki jo zahtevate.
              </li>
              <li>
                <strong>Tehnični podatki</strong> – IP naslov (skrajšan), tip
                naprave in brskalnika ter stran, s katere ste prišli; zbrani samo
                ob vaši privolitvi za analitične piškotke.
              </li>
            </ul>

            <h2>3. Namen in pravna podlaga obdelave</h2>
            <ul>
              <li>
                <strong>Odgovor na povpraševanje in izvedba storitve</strong> –
                pravna podlaga: izvajanje pogodbe oziroma predpogodbeni ukrepi
                (čl. 6(1)(b) GDPR).
              </li>
              <li>
                <strong>Analitika obiska spletne strani</strong> – pravna
                podlaga: privolitev (čl. 6(1)(a) GDPR). Privolitev lahko kadarkoli
                prekličete prek nastavitev piškotkov v nogi strani.
              </li>
              <li>
                <strong>Zakonske obveznosti</strong> (npr. računovodske) –
                pravna podlaga: zakonska obveznost (čl. 6(1)(c) GDPR).
              </li>
            </ul>

            <h2>4. Obdobje hrambe</h2>
            <p>
              Kontaktne podatke hranimo do zaključka komunikacije oziroma izvedbe
              storitve, nato največ 3 leta zaradi morebitnih reklamacij. Računi se
              hranijo 10 let skladno z davčno zakonodajo. Analitični podatki se
              hranijo največ 14 mesecev v Google Analytics 4.
            </p>

            <h2>5. Uporabniki podatkov in prenos v tretje države</h2>
            <p>
              Podatkov ne prodajamo in jih ne posredujemo tretjim osebam v
              marketinške namene. Podatke obdelujejo naši pogodbeni obdelovalci:
            </p>
            <ul>
              <li>
                <strong>Google Ireland Limited</strong> (Google Analytics 4) –
                samo ob vaši privolitvi. Google lahko podatke prenese v ZDA pod
                standardnimi pogodbenimi klavzulami in okvirom EU–US Data Privacy
                Framework.
              </li>
              <li>
                Ponudnik gostovanja spletne strani (EU regija).
              </li>
            </ul>

            <h2>6. Vaše pravice</h2>
            <p>V zvezi s svojimi osebnimi podatki imate pravico do:</p>
            <ul>
              <li>dostopa, popravka in izbrisa podatkov,</li>
              <li>omejitve in ugovora obdelavi,</li>
              <li>prenosljivosti podatkov,</li>
              <li>preklica dane privolitve kadarkoli,</li>
              <li>
                pritožbe pri nadzornem organu – Informacijskemu pooblaščencu RS (
                <a href="https://www.ip-rs.si/" rel="noreferrer" target="_blank">
                  ip-rs.si
                </a>
                ).
              </li>
            </ul>

            <h2>7. Piškotki</h2>
            <p>
              Podrobnosti o piškotkih so na voljo v <a href="/cookies">Politiki piškotkov</a>.
              Svojo izbiro lahko kadar koli spremenite prek gumba &quot;Nastavitve
              piškotkov&quot; v nogi strani.
            </p>

            <h2>8. Spremembe politike</h2>
            <p>
              To politiko lahko posodobimo. Aktualna različica je vedno dostopna
              na tej strani.
            </p>
          </>
        ),
        en: (
          <>
            <p>
              This Privacy Policy explains how {COMPANY} (&quot;we&quot;, &quot;us&quot;)
              processes your personal data in accordance with the EU General Data
              Protection Regulation (GDPR) and the Slovenian Personal Data
              Protection Act (ZVOP-2).
            </p>

            <h2>1. Controller</h2>
            <p>
              The data controller is {COMPANY}. For any privacy-related question
              contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
            <p className="text-white/50">
              <em>
                Note: before going live, complete this with the official company
                name, registered address and tax/registration number.
              </em>
            </p>

            <h2>2. Categories of data we process</h2>
            <ul>
              <li>
                <strong>Contact data</strong> — name, email, phone submitted via
                the inquiry or booking form.
              </li>
              <li>
                <strong>Vehicle data</strong> — make, model and the service you
                request.
              </li>
              <li>
                <strong>Technical data</strong> — truncated IP address, device
                and browser type, referring page; collected only with your
                consent to analytics cookies.
              </li>
            </ul>

            <h2>3. Purposes and legal basis</h2>
            <ul>
              <li>
                <strong>Responding to enquiries &amp; delivering services</strong>{" "}
                — basis: performance of a contract / pre-contractual measures
                (Art. 6(1)(b) GDPR).
              </li>
              <li>
                <strong>Website analytics</strong> — basis: consent
                (Art. 6(1)(a) GDPR). You may withdraw consent any time via the
                &quot;Cookie settings&quot; link in the footer.
              </li>
              <li>
                <strong>Legal obligations</strong> (e.g. accounting) — basis:
                legal obligation (Art. 6(1)(c) GDPR).
              </li>
            </ul>

            <h2>4. Retention</h2>
            <p>
              Contact data is kept until your enquiry is resolved / service is
              delivered, and for up to 3 years afterwards for warranty-related
              matters. Invoices are kept for 10 years as required by tax law.
              Analytics data is retained for up to 14 months in Google Analytics
              4.
            </p>

            <h2>5. Recipients and international transfers</h2>
            <p>
              We do not sell your data and do not share it with third parties for
              marketing. Processors acting on our behalf:
            </p>
            <ul>
              <li>
                <strong>Google Ireland Limited</strong> (Google Analytics 4) —
                only with your consent. Google may transfer data to the United
                States under Standard Contractual Clauses and the EU–US Data
                Privacy Framework.
              </li>
              <li>Our website hosting provider (EU region).</li>
            </ul>

            <h2>6. Your rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>access, rectify and erase your data,</li>
              <li>restrict or object to processing,</li>
              <li>data portability,</li>
              <li>withdraw your consent at any time,</li>
              <li>
                lodge a complaint with the supervisory authority — the
                Information Commissioner of the Republic of Slovenia (
                <a href="https://www.ip-rs.si/en/" rel="noreferrer" target="_blank">
                  ip-rs.si
                </a>
                ).
              </li>
            </ul>

            <h2>7. Cookies</h2>
            <p>
              See our <a href="/cookies">Cookie Policy</a> for details. You can
              change your preferences any time via the &quot;Cookie settings&quot;
              link in the footer.
            </p>

            <h2>8. Changes</h2>
            <p>
              We may update this policy. The current version is always available
              on this page.
            </p>
          </>
        ),
        de: (
          <>
            <p>
              Diese Datenschutzerklärung informiert darüber, wie {COMPANY} (&quot;wir&quot;,
              &quot;uns&quot;) personenbezogene Daten gemäß der
              EU-Datenschutz-Grundverordnung (DSGVO) und dem slowenischen
              Datenschutzgesetz (ZVOP-2) verarbeitet.
            </p>

            <h2>1. Verantwortlicher</h2>
            <p>
              Verantwortlicher ist {COMPANY}. Bei Fragen zum Datenschutz erreichen
              Sie uns unter{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
            <p className="text-white/50">
              <em>
                Hinweis: Vor dem Go-Live sind der offizielle Firmenname, die
                Geschäftsadresse sowie USt-ID/Registernummer zu ergänzen.
              </em>
            </p>

            <h2>2. Verarbeitete Datenkategorien</h2>
            <ul>
              <li>
                <strong>Kontaktdaten</strong> – Name, E-Mail, Telefon, die Sie
                über das Anfrage- oder Buchungsformular übermitteln.
              </li>
              <li>
                <strong>Fahrzeugdaten</strong> – Marke, Modell und gewünschte
                Leistung.
              </li>
              <li>
                <strong>Technische Daten</strong> – gekürzte IP-Adresse, Geräte-
                und Browsertyp sowie Referrer; nur mit Ihrer Einwilligung zu
                Analyse-Cookies.
              </li>
            </ul>

            <h2>3. Zwecke und Rechtsgrundlagen</h2>
            <ul>
              <li>
                <strong>Beantwortung von Anfragen und Leistungserbringung</strong>{" "}
                – Rechtsgrundlage: Vertragserfüllung bzw. vorvertragliche
                Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).
              </li>
              <li>
                <strong>Webanalyse</strong> – Rechtsgrundlage: Einwilligung
                (Art. 6 Abs. 1 lit. a DSGVO). Die Einwilligung kann jederzeit
                über den Link &quot;Cookie-Einstellungen&quot; in der Fußzeile
                widerrufen werden.
              </li>
              <li>
                <strong>Gesetzliche Pflichten</strong> (z. B. Buchhaltung) –
                Rechtsgrundlage: rechtliche Verpflichtung
                (Art. 6 Abs. 1 lit. c DSGVO).
              </li>
            </ul>

            <h2>4. Speicherdauer</h2>
            <p>
              Kontaktdaten werden bis zum Abschluss der Anfrage/Leistung und
              anschließend für bis zu 3 Jahre aufbewahrt. Rechnungen werden
              entsprechend den steuerrechtlichen Vorgaben 10 Jahre lang
              aufbewahrt. Analysedaten werden in Google Analytics 4 maximal 14
              Monate gespeichert.
            </p>

            <h2>5. Empfänger und Drittlandübermittlung</h2>
            <p>
              Wir verkaufen Ihre Daten nicht und geben sie nicht für
              Marketingzwecke an Dritte weiter. Auftragsverarbeiter:
            </p>
            <ul>
              <li>
                <strong>Google Ireland Limited</strong> (Google Analytics 4) –
                nur mit Ihrer Einwilligung. Eine Übermittlung in die USA kann auf
                Grundlage von Standardvertragsklauseln und des EU–US Data
                Privacy Framework erfolgen.
              </li>
              <li>Hosting-Anbieter der Website (EU-Region).</li>
            </ul>

            <h2>6. Ihre Rechte</h2>
            <p>Sie haben das Recht auf:</p>
            <ul>
              <li>Auskunft, Berichtigung und Löschung,</li>
              <li>Einschränkung und Widerspruch gegen die Verarbeitung,</li>
              <li>Datenübertragbarkeit,</li>
              <li>jederzeitigen Widerruf Ihrer Einwilligung,</li>
              <li>
                Beschwerde bei der Aufsichtsbehörde – dem Informations-
                beauftragten der Republik Slowenien (
                <a href="https://www.ip-rs.si/en/" rel="noreferrer" target="_blank">
                  ip-rs.si
                </a>
                ).
              </li>
            </ul>

            <h2>7. Cookies</h2>
            <p>
              Details finden Sie in unserer <a href="/cookies">Cookie-Richtlinie</a>.
              Sie können Ihre Auswahl jederzeit über den Link
              &quot;Cookie-Einstellungen&quot; in der Fußzeile anpassen.
            </p>

            <h2>8. Änderungen</h2>
            <p>
              Wir können diese Erklärung aktualisieren. Die aktuelle Fassung ist
              jederzeit auf dieser Seite abrufbar.
            </p>
          </>
        ),
      }}
    />
  );
}
