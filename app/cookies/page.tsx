import type { Metadata } from "next";
import { LegalDoc } from "../components/LegalDoc";
import { CookieSettingsButton } from "../components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Details of the cookies used on midnightautostudio.com and how to manage your consent.",
  alternates: {
    canonical: "/cookies",
    languages: {
      "x-default": "/cookies",
      sl: "/cookies",
      en: "/cookies",
      de: "/cookies",
    },
  },
  openGraph: {
    type: "article",
    url: "/cookies",
    title: "Cookie Policy | Midnight Auto Studio",
    description:
      "Details of the cookies used on midnightautostudio.com and how to manage your consent.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | Midnight Auto Studio",
    description:
      "Details of the cookies used on midnightautostudio.com and how to manage your consent.",
  },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalDoc
      titles={{
        sl: "Politika piškotkov",
        en: "Cookie Policy",
        de: "Cookie-Richtlinie",
      }}
      content={{
        sl: (
          <>
            <p>
              Piškotki so majhne tekstovne datoteke, ki jih spletna stran shrani
              na vašo napravo. Uporabljamo jih za zagotavljanje osnovnega
              delovanja strani ter – samo z vašo privolitvijo – za merjenje
              obiska s storitvijo Google Analytics 4.
            </p>

            <h2>Kategorije piškotkov</h2>

            <h3>Nujni piškotki (vedno aktivni)</h3>
            <p>
              Potrebni so za delovanje strani in shranjevanje vaše izbire
              piškotkov. Ni jih mogoče izklopiti.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Ime</th>
                  <th>Ponudnik</th>
                  <th>Namen</th>
                  <th>Trajanje</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>mas_consent_v1</code>
                  </td>
                  <td>midnightautostudio.com</td>
                  <td>
                    Shrani vašo izbiro piškotkov (local storage, ni klasičen
                    piškotek).
                  </td>
                  <td>12 mesecev</td>
                </tr>
                <tr>
                  <td>
                    <code>mas_lang</code>
                  </td>
                  <td>midnightautostudio.com</td>
                  <td>Zapomni si izbrani jezik.</td>
                  <td>12 mesecev</td>
                </tr>
              </tbody>
            </table>

            <h3>Analitični piškotki (ob privolitvi)</h3>
            <p>
              Uporabljamo Google Analytics 4. IP je skrajšan, oglasne funkcije
              so onemogočene.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Ime</th>
                  <th>Ponudnik</th>
                  <th>Namen</th>
                  <th>Trajanje</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>_ga</code>
                  </td>
                  <td>Google Ireland Ltd.</td>
                  <td>Razlikovanje med uporabniki.</td>
                  <td>2 leti</td>
                </tr>
                <tr>
                  <td>
                    <code>_ga_&lt;ID&gt;</code>
                  </td>
                  <td>Google Ireland Ltd.</td>
                  <td>Hranjenje stanja seje za GA4 lastnost.</td>
                  <td>2 leti</td>
                </tr>
              </tbody>
            </table>

            <h3>Marketinški piškotki</h3>
            <p>
              Trenutno jih ne uporabljamo. Če bi jih v prihodnosti vključili,
              bodo aktivirani samo ob vaši izrecni privolitvi.
            </p>

            <h2>Upravljanje privolitve</h2>
            <p>
              Ob prvem obisku strani lahko sprejmete vse, zavrnete izbirne ali
              podrobno izberete posamezne kategorije. Svojo izbiro lahko kadar
              koli spremenite:
            </p>
            <p>
              <CookieSettingsButton label="Odpri nastavitve piškotkov" />
            </p>
            <p>
              Piškotke lahko izbrišete tudi neposredno v nastavitvah brskalnika.
              Za Google Analytics lahko uporabite tudi{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                rel="noreferrer"
                target="_blank"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </>
        ),
        en: (
          <>
            <p>
              Cookies are small text files stored on your device. We use them to
              keep this site running and — only with your consent — to measure
              site usage via Google Analytics 4.
            </p>

            <h2>Cookie categories</h2>

            <h3>Strictly necessary (always on)</h3>
            <p>
              Required for the site to work and to remember your cookie choice.
              They cannot be turned off.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Provider</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>mas_consent_v1</code>
                  </td>
                  <td>midnightautostudio.com</td>
                  <td>
                    Stores your cookie choice (local storage, not a classic
                    cookie).
                  </td>
                  <td>12 months</td>
                </tr>
                <tr>
                  <td>
                    <code>mas_lang</code>
                  </td>
                  <td>midnightautostudio.com</td>
                  <td>Remembers your selected language.</td>
                  <td>12 months</td>
                </tr>
              </tbody>
            </table>

            <h3>Analytics (with consent)</h3>
            <p>
              We use Google Analytics 4 with IP truncation and advertising
              features disabled.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Provider</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>_ga</code>
                  </td>
                  <td>Google Ireland Ltd.</td>
                  <td>Distinguishes users.</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>
                    <code>_ga_&lt;ID&gt;</code>
                  </td>
                  <td>Google Ireland Ltd.</td>
                  <td>Keeps session state for the GA4 property.</td>
                  <td>2 years</td>
                </tr>
              </tbody>
            </table>

            <h3>Marketing</h3>
            <p>
              We do not use marketing cookies at this time. If we add them in
              the future, they will only be set after your explicit consent.
            </p>

            <h2>Managing consent</h2>
            <p>
              On your first visit you can accept all, reject optional or pick
              categories individually. You can change your choice any time:
            </p>
            <p>
              <CookieSettingsButton label="Open cookie settings" />
            </p>
            <p>
              You can also delete cookies directly in your browser settings.
              For Google Analytics you may additionally install the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                rel="noreferrer"
                target="_blank"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </>
        ),
        de: (
          <>
            <p>
              Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert
              werden. Wir nutzen sie für den Betrieb der Seite und – nur mit
              Ihrer Einwilligung – zur Reichweitenmessung mit Google Analytics 4.
            </p>

            <h2>Cookie-Kategorien</h2>

            <h3>Notwendig (immer aktiv)</h3>
            <p>
              Erforderlich für den Betrieb der Seite und das Speichern Ihrer
              Cookie-Auswahl. Nicht deaktivierbar.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Anbieter</th>
                  <th>Zweck</th>
                  <th>Dauer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>mas_consent_v1</code>
                  </td>
                  <td>midnightautostudio.com</td>
                  <td>Speichert Ihre Cookie-Auswahl (Local Storage).</td>
                  <td>12 Monate</td>
                </tr>
                <tr>
                  <td>
                    <code>mas_lang</code>
                  </td>
                  <td>midnightautostudio.com</td>
                  <td>Merkt sich die gewählte Sprache.</td>
                  <td>12 Monate</td>
                </tr>
              </tbody>
            </table>

            <h3>Analyse (mit Einwilligung)</h3>
            <p>
              Wir verwenden Google Analytics 4 mit gekürzter IP und
              deaktivierten Werbefunktionen.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Anbieter</th>
                  <th>Zweck</th>
                  <th>Dauer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>_ga</code>
                  </td>
                  <td>Google Ireland Ltd.</td>
                  <td>Unterscheidung von Nutzern.</td>
                  <td>2 Jahre</td>
                </tr>
                <tr>
                  <td>
                    <code>_ga_&lt;ID&gt;</code>
                  </td>
                  <td>Google Ireland Ltd.</td>
                  <td>Sitzungsstatus für die GA4-Property.</td>
                  <td>2 Jahre</td>
                </tr>
              </tbody>
            </table>

            <h3>Marketing</h3>
            <p>
              Derzeit nicht im Einsatz. Sollten sie künftig eingeführt werden,
              erfolgt das ausschließlich nach Ihrer ausdrücklichen Einwilligung.
            </p>

            <h2>Einwilligung verwalten</h2>
            <p>
              Beim ersten Besuch können Sie alle akzeptieren, optionale ablehnen
              oder Kategorien einzeln wählen. Sie können Ihre Auswahl jederzeit
              ändern:
            </p>
            <p>
              <CookieSettingsButton label="Cookie-Einstellungen öffnen" />
            </p>
            <p>
              Cookies können Sie zusätzlich in Ihren Browser-Einstellungen
              löschen. Für Google Analytics steht das{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                rel="noreferrer"
                target="_blank"
              >
                Google Analytics Opt-out Browser Add-on
              </a>{" "}
              zur Verfügung.
            </p>
          </>
        ),
      }}
    />
  );
}
