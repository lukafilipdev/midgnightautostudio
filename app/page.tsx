"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { WhySection } from "./components/WhySection";
import { ProcessSection } from "./components/ProcessSection";
import { MaterialsSection } from "./components/MaterialsSection";
import { StudioSection } from "./components/StudioSection";
import { FeaturedBuildsSection } from "./components/FeaturedBuildsSection";
import { ConfiguratorSection } from "./components/ConfiguratorSection";
import { ProtectionDemo } from "./components/ProtectionDemo";
import { ServicesSection } from "./components/ServicesSection";
import { PricingSection } from "./components/PricingSection";
import { WindowTintSection } from "./components/WindowTintSection";
import { AssuranceSection } from "./components/AssuranceSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { BookingSection } from "./components/BookingSection";
import { Footer } from "./components/Footer";
import { CookieConsent } from "./components/CookieConsent";
import { Analytics } from "./components/Analytics";
import { useLocalStorageString } from "./components/useLocalStorage";

const ALLOWED_LANGS = ["sl", "en", "de"] as const;

const CONTACT = {
  email: "info@midnightautostudio.com",
  instagram: "https://instagram.com/midnightautostudio.eu",
  whatsapp: "https://wa.me/38640813855",
};

const HERO_VIDEO =
  "https://cdn.coverr.co/videos/coverr-a-car-in-a-showroom-2584/1080p.mp4";

const IMG = {
  m4: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1600&auto=format&fit=crop",
  p911: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
  rs6: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1600&auto=format&fit=crop",
  cfgGloss:
    "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1800&auto=format&fit=crop",
  cfgSatin:
    "https://images.unsplash.com/photo-1517142089942-ba376ce32a0b?q=80&w=1800&auto=format&fit=crop",
  cfgMatte:
    "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1800&auto=format&fit=crop",
  studio:
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop",
  warranty:
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1600&auto=format&fit=crop",
  care: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?q=80&w=1600&auto=format&fit=crop",
  delivery:
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
  certificate:
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1600&auto=format&fit=crop",
};

type Lang = "sl" | "en" | "de";
type Dict = Record<string, string>;

const I18N: Record<Lang, Dict> = {
  sl: {
    brand: "MIDNIGHT AUTO STUDIO",
    book: "REZERVIRAJ",
    request: "POŠLJI POVPRAŠEVANJE",
    viewBuilds: "POGLEJ PROJEKTE",
    limited: "OMEJENA MESEČNA KAPACITETA",
    heroTitleTop: "MIDNIGHT",
    heroTitleBottom: "AUTO STUDIO",
    heroSubtitle:
      "Butični studio zaščite in preobrazbe za BMW M, Audi RS in Porsche.\nVizualizacija pred montažo. Izvedba brez kompromisov.",
    stats1v: "100+",
    stats1l: "Dostavljenih premium vozil",
    stats2v: "€10M+",
    stats2l: "Vrednosti vozil pod zaščito",
    stats3v: "30+",
    stats3l: "Track-ready projektov",
    whyKicker: "STUDIO STANDARD",
    whyTitle: "ZAKAJ MIDNIGHT AUTO STUDIO",
    whySub:
      "Nismo klasičen wrap shop. Delujemo kot butik studio za vozila visoke vrednosti.",
    why1t: "3D vizualizacija pred izvedbo",
    why1d:
      "Pred montažo vidiš končni izgled. Barva, finish in detajli so potrjeni še preden se dotaknemo vozila.",
    why2t: "Omejena kapaciteta, maksimalna natančnost",
    why2d:
      "Sprejmemo omejeno število vozil mesečno. Vsak projekt dobi čas, natančnost in kontrolirano studijsko okolje.",
    why3t: "Specializacija za performance vozila",
    why3d:
      "BMW M, Audi RS in Porsche. Razumemo detajle, linije karoserije in pričakovanja lastnikov teh vozil.",
    processKicker: "PROCESS",
    processTitle: "KAKO POTEKA PROJEKT",
    processSub: "Vsak projekt poteka po strukturiranem studijskem procesu.",
    materialsKicker: "MATERIALS",
    materialsTitle: "PREMIUM MATERIALI",
    materialsSub: "Uporabljamo preverjene materiale vrhunskih proizvajalcev.",
    studioKicker: "STUDIO",
    studioTitle: "KONTROLIRANO STUDIJSKO OKOLJE",
    studioText:
      "Montaža poteka v čistem, kontroliranem prostoru z ustrezno svetlobo in temperaturo. To omogoča popolne robove in maksimalno trajnost folije.",
    selectedKicker: "IZBOR",
    featuredTitle: "IZPOSTAVLJENI PROJEKTI",
    featuredSub:
      "Realni projekti. Premium materiali. Čiste linije.",
    galleryKicker: "CINEMATIC",
    galleryTitle: "GALERIJA PROJEKTOV",
    gallerySub:
      "Swipe na telefonu. Umirjen, natančen, premium občutek — kot konfigurator.",
    cfgKicker: "DESIGN PREVIEW",
    cfgTitle: "3D KONFIGURATOR",
    cfgText:
      "Pred montažo pripravimo 3D vizualizacijo: finish, pokritost in detajli. Hitrejša potrditev, brez presenečenj. Poganja ZENO X / XI3D.",
    cfgB1: "Predogled finisha in pokritosti še pred montažo.",
    cfgB2: "Potrdi detajle, deletese in akcente s 100% gotovostjo.",
    cfgB3: "Proces potrjevanja za vozila visoke vrednosti.",
    cfgCta1: "ZAHTEVAJ 3D PREDOGLED",
    cfgCta2: "POGLEJ PROJEKTE",
    miniCfg: "MINI KONFIGURATOR",
    interactive: "Interaktivno",
    finish: "Finish",
    gloss: "Gloss",
    satin: "Satin",
    matte: "Matte",
    coverage: "Pokritost",
    coverageHint: "Simulacija koliko vozila je zaščitenega (delno → celotno).",
    ppfCoverage: "PPF POKRITOST",
    details: "Detajli",
    accents: "Akcenti / deletes",
    approval: "Potrditev",
    beforeInstall: "Pred montažo",
    demoKicker: "PROTECTION DEMO",
    demoTitle: "LAK BREZ PPF VS ZAŠČITEN LAK",
    demoSub:
      "Kamenčki, sol in umazanija lahko poškodujejo lak. PPF absorbira udarce in zaščiti površino.",
    testimonialsKicker: "CLIENT FEEDBACK",
    testimonialsTitle: "MNENJA STRANK",
    testimonialsSub:
      "Lastniki performance vozil, ki so izbrali Midnight Auto Studio.",
    offerKicker: "OFFER",
    servicesTitle: "STORITVE",
    servicesSub:
      "Fokusirano. Butično. Za premium vozila — PPF, wrap, tint in detailing.",
    s1t: "Paint Protection Film",
    s1d: "Nevidna zaščita pred udarci, ki ohranja lak in vrednost.",
    s2t: "Colour Change Wrap",
    s2d: "Bespoke barvna preobrazba s premium folijami.",
    s3t: "Window Tint",
    s3d: "Toplotna in UV zaščita z OEM izgledom.",
    s4t: "Detailing & Ceramic",
    s4d: "Korekcija laka, finishing in keramična zaščita.",
    pricingKicker: "PRICING",
    investmentTitle: "INVESTICIJA PPF & WRAP",
    investmentSub:
      "Nismo najcenejši — smo natančna izbira. Končna ponudba po posvetu in 3D predogledu.",
    pack1: "Bespoke Wrap",
    pack1p: "od €1,800",
    pack1d: "Premium barvna preobrazba.",
    pack2: "Full Body PPF",
    pack2p: "od €3,500",
    pack2d: "Celovita zaščita laka.",
    pack3: "Cosmetic PPF",
    pack3p: "€4,000+",
    pack3d: "Matte / Satin finiši.",
    comfortKicker: "COMFORT",
    tintTitle: "WINDOW TINT",
    tintSub:
      "Premium toplotna in UV zaščita z OEM izgledom. Predogled pred montažo.",
    signature: "SIGNATURE",
    perf: "PERFORMANCE",
    track: "TRACK",
    tint1: "70% Light Smoke",
    tint1d: "OEM subtilen ton",
    tint2: "50% Medium Smoke",
    tint2d: "Uravnotežen dnevni izgled",
    tint3: "35% Dark Smoke",
    tint3d: "Motorsport zasebnost",
    guaranteeKicker: "ZERO-RISK",
    guaranteeTitle: "STUDIO GARANCIJA ZADOVOLJSTVA",
    guaranteeSub:
      "Naše delo mora izpolnjevati studijski standard. Če ne, ga popravimo — brez kompromisov.",
    notCovered: "GARANCIJA NE POKRIVA",
    careKicker: "CARE",
    careTitle: "VZDRŽEVANJE IN NAVODILA",
    careText:
      "Pravilno vzdrževanje podaljša življenjsko dobo folije in ohrani popoln izgled vozila. Vsaka stranka prejme garancijsko knjižico z natančnimi navodili za nego PPF in wrap folije.",
    deliveryKicker: "DELIVERY",
    deliveryTitle: "PREVZEM VOZILA",
    deliveryText:
      "Zaključen projekt pomeni tudi premium izkušnjo ob prevzemu vozila. Vsaka stranka prejme dokumentacijo in navodila za pravilno nego vozila.",
    certKicker: "CERTIFICATE",
    certTitle: "STUDIO CERTIFIKAT",
    certText:
      "Vsak zaključen projekt prejme personaliziran studio certifikat, ki potrjuje izvedbo in uporabljene materiale.",
    clientVehiclesKicker: "CLIENT VEHICLES",
    clientVehiclesTitle: "VOZILA NAŠIH STRANK",
    clientVehiclesSub: "Specializirani za performance in luxury vozila.",
    warrantyKicker: "WARRANTY",
    warrantyTitle: "DOLGOROČNA ZAŠČITA",
    warrantyText:
      "Uporabljamo premium zaščitne folije z dolgoletno garancijo.",
    applyKicker: "APPLY",
    bookingTitle: "ZASEBNI POSVET",
    bookingSub:
      "Omejena kapaciteta. Povej kaj voziš in kakšen standard pričakuješ.",
    vehiclePh: "Model vozila (npr. Porsche 911 Carrera)",
    emailPh: "Email",
    opt0: "Izberi storitev",
    opt1: "Full Body PPF",
    opt2: "Colour Change Wrap",
    opt3: "Cosmetic PPF",
    opt4: "Window Tint",
    opt5: "Detailing / Ceramic",
    opt6: "Nisem prepričan (posvet)",
    submit: "Pošlji zahtevek",
    response: "Odgovorimo v 24–48h. Samo po dogovoru.",
    quickContact: "HITER KONTAKT",
    qc1: "Email",
    qc2: "Instagram",
    qc3: "WhatsApp",
    qcSub: "Če želiš hiter odgovor, nas kontaktiraj direktno.",
    footer: "Midnight Auto Studio · Premium zaščita vozil",
    privacyLabel: "Zasebnost",
    cookiesLabel: "Piškotki",
    cookieSettingsLabel: "Nastavitve piškotkov",
    recommendedLabel: "Priporočeno",
    demoBeforeLabel: "Brez PPF",
    demoAfterLabel: "Zaščiten lak",
    demoDragHint: "Povleci za primerjavo zaščite",
    galleryLabel: "GALERIJA",
    prev: "Nazaj",
    next: "Naprej",
    dot: "Pojdi na element",
  },
  en: {
    brand: "MIDNIGHT AUTO STUDIO",
    book: "BOOK",
    request: "REQUEST CONSULTATION",
    viewBuilds: "VIEW BUILDS",
    limited: "LIMITED MONTHLY CAPACITY",
    heroTitleTop: "MIDNIGHT",
    heroTitleBottom: "AUTO STUDIO",
    heroSubtitle:
      "Boutique automotive protection atelier for BMW M, Audi RS & Porsche.\nDesign preview before installation. Precision-only execution.",
    stats1v: "100+",
    stats1l: "High-value vehicles delivered",
    stats2v: "€10M+",
    stats2l: "Protected vehicle value",
    stats3v: "30+",
    stats3l: "Track-ready builds",
    whyKicker: "STUDIO STANDARD",
    whyTitle: "WHY MIDNIGHT AUTO STUDIO",
    whySub:
      "Not a typical wrap shop. A boutique studio built for high-value vehicles.",
    why1t: "3D visualization before execution",
    why1d:
      "See the final design before installation. Finish, colour and details approved before any film is applied.",
    why2t: "Limited capacity, maximum precision",
    why2d:
      "Limited vehicles per month. Every build receives full attention and controlled studio conditions.",
    why3t: "Performance vehicle specialization",
    why3d:
      "BMW M, Audi RS and Porsche builds. We understand the design language and expectations of these cars.",
    processKicker: "PROCESS",
    processTitle: "INSTALLATION PROCESS",
    processSub: "Every vehicle goes through a structured studio workflow.",
    materialsKicker: "MATERIALS",
    materialsTitle: "PREMIUM MATERIALS",
    materialsSub: "We work with industry-leading film manufacturers.",
    studioKicker: "STUDIO",
    studioTitle: "CONTROLLED STUDIO ENVIRONMENT",
    studioText:
      "Installation takes place in a clean controlled environment with correct lighting and temperature.",
    selectedKicker: "SELECTED",
    featuredTitle: "FEATURED BUILDS",
    featuredSub:
      "Real projects. Premium materials. Precision edges. Images are placeholders — swap with your own when ready.",
    galleryKicker: "CINEMATIC",
    galleryTitle: "PROJECT GALLERY",
    gallerySub:
      "Swipe on mobile. Calm, precise, premium — like an automotive configurator.",
    cfgKicker: "DESIGN PREVIEW",
    cfgTitle: "3D CONFIGURATOR",
    cfgText:
      "We visualise your finish before installation — finish, coverage and details. Faster approval, zero surprises. Powered by ZENO X / XI3D.",
    cfgB1: "Preview finish and coverage before any film is applied.",
    cfgB2: "Confirm deletes, accents and details with full confidence.",
    cfgB3: "Approval workflow built for high-value vehicles.",
    cfgCta1: "REQUEST DESIGN PREVIEW",
    cfgCta2: "SEE BUILDS",
    miniCfg: "MINI CONFIGURATOR",
    interactive: "Interactive",
    finish: "Finish",
    gloss: "Gloss",
    satin: "Satin",
    matte: "Matte",
    coverage: "Coverage",
    coverageHint:
      "Simulates how much of the vehicle is protected (partial → full).",
    ppfCoverage: "PPF COVERAGE",
    details: "Details",
    accents: "Accents / deletes",
    approval: "Approval",
    beforeInstall: "Before install",
    demoKicker: "PROTECTION DEMO",
    demoTitle: "PAINT DAMAGE VS PPF PROTECTION",
    demoSub:
      "Stone chips and debris damage paint. PPF absorbs the impact and protects the surface.",
    testimonialsKicker: "CLIENT FEEDBACK",
    testimonialsTitle: "CLIENT TESTIMONIALS",
    testimonialsSub:
      "Owners of performance vehicles who trusted Midnight Auto Studio.",
    offerKicker: "OFFER",
    servicesTitle: "SERVICES",
    servicesSub:
      "Focused. Boutique. Built for premium vehicles — PPF, wraps, tint and detailing.",
    s1t: "Paint Protection Film",
    s1d: "Invisible impact protection preserving paint and long-term value.",
    s2t: "Colour Change Wrap",
    s2d: "Bespoke transformation using premium wrap films.",
    s3t: "Window Tint",
    s3d: "Heat rejection, UV protection and a factory-style finish.",
    s4t: "Detailing & Ceramic",
    s4d: "Paint correction, finishing and ceramic protection.",
    pricingKicker: "PRICING",
    investmentTitle: "PPF & WRAP INVESTMENT",
    investmentSub:
      "We're not the cheapest option — we're the precision option. Final quote after consultation and design preview.",
    pack1: "Bespoke Wrap",
    pack1p: "from €1,800",
    pack1d: "Premium colour transformation.",
    pack2: "Full Body PPF",
    pack2p: "from €3,500",
    pack2d: "Complete paint protection.",
    pack3: "Cosmetic PPF",
    pack3p: "€4,000+",
    pack3d: "Matte / Satin finishes.",
    comfortKicker: "COMFORT",
    tintTitle: "WINDOW TINT",
    tintSub:
      "Premium heat and UV protection with a factory-style finish. Preview before installation.",
    signature: "SIGNATURE",
    perf: "PERFORMANCE",
    track: "TRACK",
    tint1: "70% Light Smoke",
    tint1d: "OEM subtle tone",
    tint2: "50% Medium Smoke",
    tint2d: "Balanced daily look",
    tint3: "35% Dark Smoke",
    tint3d: "Motorsport privacy",
    guaranteeKicker: "ZERO-RISK",
    guaranteeTitle: "STUDIO SATISFACTION GUARANTEE",
    guaranteeSub:
      "Every installation must meet our studio standard. If not, we correct it.",
    notCovered: "WHAT THE GUARANTEE DOES NOT COVER",
    careKicker: "CARE",
    careTitle: "CARE & MAINTENANCE",
    careText:
      "Proper maintenance extends film life and preserves the vehicle finish. Every client receives a warranty booklet with detailed care instructions for PPF and wrap films.",
    deliveryKicker: "DELIVERY",
    deliveryTitle: "DELIVERY EXPERIENCE",
    deliveryText:
      "Every completed project ends with a premium delivery experience including documentation and care guidance.",
    certKicker: "CERTIFICATE",
    certTitle: "STUDIO CERTIFICATE",
    certText:
      "Every completed project receives a personalised studio certificate confirming the installation and materials used.",
    clientVehiclesKicker: "CLIENT VEHICLES",
    clientVehiclesTitle: "CLIENT VEHICLES",
    clientVehiclesSub: "Specialised in performance and luxury vehicles.",
    warrantyKicker: "WARRANTY",
    warrantyTitle: "LONG-TERM PROTECTION",
    warrantyText:
      "We install premium protection films backed by long manufacturer warranties.",
    applyKicker: "APPLY",
    bookingTitle: "PRIVATE CONSULTATION",
    bookingSub:
      "Limited monthly capacity. Tell us what you drive and what standard you expect.",
    vehiclePh: "Vehicle model (e.g. Porsche 911 Carrera)",
    emailPh: "Email",
    opt0: "Choose service",
    opt1: "Full Body PPF",
    opt2: "Colour Change Wrap",
    opt3: "Cosmetic PPF",
    opt4: "Window Tint",
    opt5: "Detailing / Ceramic",
    opt6: "Not sure yet (consultation)",
    submit: "Submit Request",
    response: "Response within 24–48h. By appointment only.",
    quickContact: "QUICK CONTACT",
    qc1: "Email",
    qc2: "Instagram",
    qc3: "WhatsApp",
    qcSub: "For a faster response, contact us directly.",
    footer: "Midnight Auto Studio · Premium Automotive Protection",
    privacyLabel: "Privacy",
    cookiesLabel: "Cookies",
    cookieSettingsLabel: "Cookie Settings",
    recommendedLabel: "Recommended",
    demoBeforeLabel: "Without PPF",
    demoAfterLabel: "Protected paint",
    demoDragHint: "Drag to compare protection",
    galleryLabel: "GALLERY",
    prev: "Prev",
    next: "Next",
    dot: "Go to item",
  },
  de: {
    brand: "MIDNIGHT AUTO STUDIO",
    book: "BUCHEN",
    request: "ANFRAGE SENDEN",
    viewBuilds: "PROJEKTE",
    limited: "BEGRENZTE MONATLICHE KAPAZITÄT",
    heroTitleTop: "MIDNIGHT",
    heroTitleBottom: "AUTO STUDIO",
    heroSubtitle:
      "Boutique-Studio für BMW M, Audi RS & Porsche.\nDesign-Vorschau vor der Montage. Präzision ohne Kompromisse.",
    stats1v: "100+",
    stats1l: "Premium-Fahrzeuge ausgeliefert",
    stats2v: "€10M+",
    stats2l: "Geschützter Fahrzeugwert",
    stats3v: "30+",
    stats3l: "Track-ready Projekte",
    whyKicker: "STUDIO STANDARD",
    whyTitle: "WARUM MIDNIGHT AUTO STUDIO",
    whySub:
      "Kein klassischer Wrap-Shop. Ein Boutique-Studio für Fahrzeuge mit hohem Wert.",
    why1t: "3D-Visualisierung vor der Ausführung",
    why1d:
      "Das finale Design wird vor der Montage visualisiert – Finish und Details werden vorher bestätigt.",
    why2t: "Begrenzte Kapazität, maximale Präzision",
    why2d:
      "Begrenzte Anzahl Fahrzeuge pro Monat – jedes Projekt erhält volle Aufmerksamkeit.",
    why3t: "Spezialisierung auf Performance-Fahrzeuge",
    why3d:
      "BMW M, Audi RS und Porsche – wir kennen die Linien, Details und Erwartungen dieser Fahrzeuge.",
    processKicker: "PROCESS",
    processTitle: "ABLAUF DES PROJEKTS",
    processSub: "Jedes Projekt folgt einem strukturierten Studio-Prozess.",
    materialsKicker: "MATERIALS",
    materialsTitle: "PREMIUM MATERIALIEN",
    materialsSub: "Wir verwenden Materialien führender Hersteller.",
    studioKicker: "STUDIO",
    studioTitle: "KONTROLLIERTE STUDIOUMGEBUNG",
    studioText:
      "Installation in kontrollierter Umgebung mit optimalem Licht und Temperatur.",
    selectedKicker: "AUSWAHL",
    featuredTitle: "AUSGEWÄHLTE PROJEKTE",
    featuredSub:
      "Echte Projekte. Premium-Materialien. Präzise Kanten. Bilder sind Platzhalter — später durch eigene ersetzen.",
    galleryKicker: "CINEMATIC",
    galleryTitle: "PROJEKTGALERIE",
    gallerySub:
      "Auf dem Handy wischen. Ruhig, präzise, premium — wie ein Konfigurator.",
    cfgKicker: "DESIGN PREVIEW",
    cfgTitle: "3D KONFIGURATOR",
    cfgText:
      "Wir visualisieren Finish, Abdeckung und Details vor der Montage. Schnellere Freigabe, keine Überraschungen. Powered by ZENO X / XI3D.",
    cfgB1: "Finish und Abdeckung vor der Montage ansehen.",
    cfgB2: "Details, Deletes und Akzente mit voller Sicherheit bestätigen.",
    cfgB3: "Freigabe-Prozess für Fahrzeuge mit hohem Wert.",
    cfgCta1: "3D-VORSCHAU ANFORDERN",
    cfgCta2: "PROJEKTE",
    miniCfg: "MINI KONFIGURATOR",
    interactive: "Interaktiv",
    finish: "Finish",
    gloss: "Gloss",
    satin: "Satin",
    matte: "Matte",
    coverage: "Abdeckung",
    coverageHint:
      "Simuliert, wie viel des Fahrzeugs geschützt ist (teilweise → komplett).",
    ppfCoverage: "PPF ABDECKUNG",
    details: "Details",
    accents: "Akzente / Deletes",
    approval: "Freigabe",
    beforeInstall: "Vor Montage",
    demoKicker: "PROTECTION DEMO",
    demoTitle: "LACK OHNE PPF VS MIT PPF",
    demoSub:
      "Steinschläge und Schmutz beschädigen Lack. PPF absorbiert den Aufprall.",
    testimonialsKicker: "CLIENT FEEDBACK",
    testimonialsTitle: "KUNDENMEINUNGEN",
    testimonialsSub: "Besitzer von Performance-Fahrzeugen.",
    offerKicker: "OFFER",
    servicesTitle: "LEISTUNGEN",
    servicesSub:
      "Fokussiert. Boutique. Für Premium-Fahrzeuge — PPF, Wrap, Tönung und Detailing.",
    s1t: "Paint Protection Film",
    s1d: "Unsichtbarer Schutz, der Lack und Wert erhält.",
    s2t: "Colour Change Wrap",
    s2d: "Bespoke Farbveränderung mit Premium-Folien.",
    s3t: "Window Tint",
    s3d: "Wärme- & UV-Schutz mit OEM-Optik.",
    s4t: "Detailing & Ceramic",
    s4d: "Lackkorrektur, Finish und Keramikschutz.",
    pricingKicker: "PRICING",
    investmentTitle: "PPF & WRAP INVESTITION",
    investmentSub:
      "Wir sind nicht die günstigste Option — wir sind die Präzisions-Option. Endpreis nach Beratung und 3D-Vorschau.",
    pack1: "Bespoke Wrap",
    pack1p: "ab €1,800",
    pack1d: "Premium Farbtransformation.",
    pack2: "Full Body PPF",
    pack2p: "ab €3,500",
    pack2d: "Kompletter Lackschutz.",
    pack3: "Cosmetic PPF",
    pack3p: "€4,000+",
    pack3d: "Matte / Satin Finishes.",
    comfortKicker: "COMFORT",
    tintTitle: "WINDOW TINT",
    tintSub:
      "Premium Wärme- und UV-Schutz mit OEM-Optik. Vorschau vor der Montage.",
    signature: "SIGNATURE",
    perf: "PERFORMANCE",
    track: "TRACK",
    tint1: "70% Light Smoke",
    tint1d: "OEM dezenter Ton",
    tint2: "50% Medium Smoke",
    tint2d: "Ausgewogener Look",
    tint3: "35% Dark Smoke",
    tint3d: "Motorsport-Privatsphäre",
    guaranteeKicker: "ZERO-RISK",
    guaranteeTitle: "STUDIO ZUFRIEDENHEITSGARANTIE",
    guaranteeSub:
      "Unsere Arbeit muss dem Studio-Standard entsprechen. Wenn nicht, korrigieren wir sie.",
    notCovered: "GARANTIE DECKT NICHT",
    careKicker: "CARE",
    careTitle: "PFLEGE & WARTUNG",
    careText:
      "Richtige Pflege verlängert die Lebensdauer der Folie und erhält das perfekte Erscheinungsbild. Jeder Kunde erhält ein Garantieheft mit Pflegeanweisungen für PPF und Wrap.",
    deliveryKicker: "DELIVERY",
    deliveryTitle: "FAHRZEUGÜBERGABE",
    deliveryText:
      "Ein abgeschlossenes Projekt bedeutet auch eine hochwertige Übergabe des Fahrzeugs inklusive Dokumentation und Pflegehinweisen.",
    certKicker: "CERTIFICATE",
    certTitle: "STUDIO ZERTIFIKAT",
    certText:
      "Jedes abgeschlossene Projekt erhält ein personalisiertes Studio-Zertifikat mit Angaben zur Installation und den verwendeten Materialien.",
    clientVehiclesKicker: "CLIENT VEHICLES",
    clientVehiclesTitle: "KUNDENFAHRZEUGE",
    clientVehiclesSub: "Spezialisiert auf Performance- und Luxusfahrzeuge.",
    warrantyKicker: "WARRANTY",
    warrantyTitle: "LANGFRISTIGER SCHUTZ",
    warrantyText:
      "Wir verwenden hochwertige Schutzfolien mit mehrjähriger Garantie.",
    applyKicker: "APPLY",
    bookingTitle: "PRIVATE BERATUNG",
    bookingSub:
      "Begrenzte Kapazität. Sagen Sie uns, welches Fahrzeug Sie fahren und welchen Standard Sie erwarten.",
    vehiclePh: "Fahrzeugmodell (z. B. Porsche 911 Carrera)",
    emailPh: "E-Mail",
    opt0: "Service wählen",
    opt1: "Full Body PPF",
    opt2: "Colour Change Wrap",
    opt3: "Cosmetic PPF",
    opt4: "Window Tint",
    opt5: "Detailing / Ceramic",
    opt6: "Nicht sicher (Beratung)",
    submit: "Anfrage senden",
    response: "Antwort in 24–48h. Nur nach Terminvereinbarung.",
    quickContact: "SCHNELLER KONTAKT",
    qc1: "E-Mail",
    qc2: "Instagram",
    qc3: "WhatsApp",
    qcSub: "Für eine schnellere Antwort kontaktieren Sie uns direkt.",
    footer: "Midnight Auto Studio · Premium Fahrzeugschutz",
    privacyLabel: "Datenschutz",
    cookiesLabel: "Cookies",
    cookieSettingsLabel: "Cookie-Einstellungen",
    recommendedLabel: "Empfohlen",
    demoBeforeLabel: "Ohne PPF",
    demoAfterLabel: "Geschützter Lack",
    demoDragHint: "Zum Vergleichen des Schutzes ziehen",
    galleryLabel: "GALERIE",
    prev: "Zurück",
    next: "Weiter",
    dot: "Zum Element",
  },
};

function useRevealOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    const scan = () => {
      for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
        if (el.classList.contains("reveal-in")) continue;
        io.observe(el);
      }
    };

    scan();
    const raf = requestAnimationFrame(scan);
    const t0 = window.setTimeout(scan, 0);
    const t1 = window.setTimeout(scan, 100);

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}


export default function Home() {
  const [lang, setLang] = useLocalStorageString<Lang>(
    "mas_lang",
    ALLOWED_LANGS,
    "sl",
  );
  const [service, setService] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useRevealOnScroll();

  const t = useMemo(() => {
    const dict = I18N[lang];
    return (k: string) => dict[k] ?? I18N.en[k] ?? k;
  }, [lang]);

  useEffect(() => {
    document.title = `Midnight Auto Studio | ${lang === "sl" ? "Premium zaščita" : lang === "de" ? "Premium Schutz" : "Premium Protection"}`;

    const description =
      lang === "sl"
        ? "Premium PPF, wrap, tint in detailing studio za BMW M, Audi RS in Porsche. 3D design preview pred montažo."
        : lang === "de"
          ? "Premium Studio für PPF, Wrap, Tönung und Detailing für BMW M, Audi RS und Porsche. 3D-Vorschau vor der Montage."
          : "Premium PPF, wrap, tint and detailing studio for BMW M, Audi RS and Porsche. 3D design preview before installation.";

    let meta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [lang]);

  const projects = useMemo(
    () => [
      { src: "/porscheproject.webp", label: "Porsche 911 · Full Body PPF", tag: "PPF" },
      { src: "/audiproject.webp", label: "AUDI SQ8 · Full Body Wrap", tag: "WRAP" },
      { src: IMG.rs6, label: "Audi RS6 · Track Protection", tag: "TRACK" },
    ],
    []
  );

  const gallery = useMemo(
    () => [
      { src: IMG.p911, label: "Porsche 911 · Design Preview Approved" },
      { src: IMG.m4, label: "BMW M4 · Edge-Wrapped Panels" },
      { src: IMG.rs6, label: "Audi RS6 · Track Spec Coverage" },
      {
        src: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6d9?q=80&w=1800&auto=format&fit=crop",
        label: "Studio · Controlled Lighting Environment",
      },
      {
        src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1800&auto=format&fit=crop",
        label: "Detail · Cut Lines & Precision Finish",
      },
    ],
    []
  );


  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      <Navbar
        lang={lang}
        setLang={setLang}
        scrolled={scrolled}
        bookText={t("book")}
      />

      <Hero
        lang={lang}
        requestText={t("request")}
        viewBuildsText={t("viewBuilds")}
        limitedText={t("limited")}
      />

      <Stats
        stats={[
          { value: t("stats1v"), label: t("stats1l") },
          { value: t("stats2v"), label: t("stats2l") },
          { value: t("stats3v"), label: t("stats3l") },
        ]}
      />

      <WhySection
        kicker={t("whyKicker")}
        title={t("whyTitle")}
        subtitle={t("whySub")}
        items={[
          { number: "01", title: t("why1t"), description: t("why1d") },
          { number: "02", title: t("why2t"), description: t("why2d") },
          { number: "03", title: t("why3t"), description: t("why3d") },
        ]}
        brandsLabel={
          lang === "sl"
            ? "Specializirani za"
            : lang === "de"
              ? "Spezialisiert auf"
              : "Specialised in"
        }
        brands={["PORSCHE", "BMW M", "AUDI RS", "AMG"]}
      />

      <ProcessSection
        kicker={t("processKicker")}
        title={t("processTitle")}
        subtitle={t("processSub")}
        steps={[
          {
            number: "01",
            title: lang === "sl" ? "Posvet" : lang === "de" ? "Beratung" : "Consultation",
            description:
              lang === "sl"
                ? "Pregled vozila in ciljev projekta."
                : lang === "de"
                  ? "Analyse des Fahrzeugs und der Ziele."
                  : "Vehicle inspection and project goals.",
            details:
              lang === "sl"
                ? "Vsak projekt se začne z natančnim posvetom. Pregledamo vozilo, željen vizualni rezultat, tip uporabe in nivo zaščite, da definiramo rešitev, ki je estetsko čista in tehnično smiselna."
                : lang === "de"
                  ? "Jedes Projekt beginnt mit einer präzisen Beratung. Wir analysieren das Fahrzeug, die gewünschte Optik, den Einsatzzweck und das erforderliche Schutzniveau, damit das Ergebnis visuell und technisch überzeugt."
                  : "Every project starts with a precise consultation. We assess the vehicle, the desired visual direction, real-world use, and protection level so the final solution feels both technically correct and visually elevated.",
            bullets:
              lang === "sl"
                ? [
                    "Pregled trenutnega stanja vozila in površin.",
                    "Opredelitev cilja: zaščita, sprememba videza ali oboje.",
                    "Izbira prave smeri glede na vozilo in uporabo.",
                  ]
                : lang === "de"
                  ? [
                      "Bewertung des aktuellen Zustands von Lack und Oberflächen.",
                      "Definition des Ziels: Schutz, Transformation oder beides.",
                      "Empfehlung der passenden Richtung für Fahrzeug und Nutzung.",
                    ]
                  : [
                      "Assessment of paint condition and critical surfaces.",
                      "Clear definition of the goal: protection, transformation, or both.",
                      "Recommendation shaped around the car and how it is used.",
                    ],
          },
          {
            number: "02",
            title: "3D Preview",
            description:
              lang === "sl"
                ? "Vizualizacija barve, finisha in detajlov."
                : lang === "de"
                  ? "Visualisierung von Finish und Details."
                  : "Design preview before installation.",
            details:
              lang === "sl"
                ? "Preden karkoli namestimo, pripravimo vizualno smer projekta. Tako lahko preverimo razmerja, ton materiala, kontraste in detajle, še preden se začne izvedba."
                : lang === "de"
                  ? "Bevor die Umsetzung beginnt, entwickeln wir eine klare visuelle Vorschau. So prüfen wir Proportionen, Materialwirkung, Kontraste und Details bereits vor der Montage."
                  : "Before installation begins, we build a clear visual preview of the project. This allows us to refine proportions, material tone, contrast, and small design decisions before execution.",
            bullets:
              lang === "sl"
                ? [
                    "Preizkus barv, satin/gloss finishov in kontrastov.",
                    "Vizualna potrditev detajlov pred izvedbo.",
                    "Manj tveganja, več jasnosti pred montažo.",
                  ]
                : lang === "de"
                  ? [
                      "Test von Farben, Satin-/Gloss-Finishes und Kontrasten.",
                      "Visuelle Freigabe wichtiger Details vor der Umsetzung.",
                      "Weniger Unsicherheit, mehr Klarheit vor der Montage.",
                    ]
                  : [
                      "Testing of colors, satin/gloss finishes, and contrasts.",
                      "Visual approval of key details before execution.",
                      "Less guesswork, more confidence before installation.",
                    ],
          },
          {
            number: "03",
            title: lang === "sl" ? "Priprava" : lang === "de" ? "Vorbereitung" : "Preparation",
            description:
              lang === "sl"
                ? "Temeljito čiščenje in dekontaminacija."
                : lang === "de"
                  ? "Gründliche Reinigung und Vorbereitung."
                  : "Deep cleaning and surface preparation.",
            details:
              lang === "sl"
                ? "Kakovost končnega rezultata je odvisna od priprave. Vozilo temeljito očistimo, dekontaminiramo in pripravimo vse površine, da se material oprime pravilno in ostane brez kompromisov."
                : lang === "de"
                  ? "Die Qualität des Endergebnisses hängt direkt von der Vorbereitung ab. Das Fahrzeug wird gründlich gereinigt, dekontaminiert und für eine präzise, saubere Verarbeitung vorbereitet."
                  : "The quality of the final result depends on preparation. We deep-clean, decontaminate, and prepare every relevant surface so the material bonds properly and the finish stays clean.",
            bullets:
              lang === "sl"
                ? [
                    "Dekontaminacija laka in kritičnih območij.",
                    "Priprava robov, rež in zahtevnih linij.",
                    "Osnova za natančno in trajno montažo.",
                  ]
                : lang === "de"
                  ? [
                      "Dekontamination von Lack und kritischen Bereichen.",
                      "Vorbereitung von Kanten, Spalten und komplexen Linien.",
                      "Basis für eine präzise und dauerhafte Montage.",
                    ]
                  : [
                      "Decontamination of paint and critical areas.",
                      "Preparation of edges, gaps, and complex body lines.",
                      "Foundation for a precise and lasting installation.",
                    ],
          },
          {
            number: "04",
            title: lang === "sl" ? "Montaža" : lang === "de" ? "Installation" : "Installation",
            description:
              lang === "sl"
                ? "Natančna studijska montaža."
                : lang === "de"
                  ? "Präzise Studio-Installation."
                  : "Precision film installation.",
            details:
              lang === "sl"
                ? "Montaža poteka studijsko, kontrolirano in brez hitenja. Fokus je na čisti izvedbi, pravilnih napetostih materiala, poravnavi linij in brezhibnem zaključku."
                : lang === "de"
                  ? "Die Montage erfolgt kontrolliert im Studio, ohne Zeitdruck. Entscheidend sind saubere Ausführung, korrekte Materialspannung, exakte Linienführung und ein makelloses Finish."
                  : "Installation is carried out in a controlled studio environment without rushing. The focus is on clean execution, correct material tension, line alignment, and a finish that looks intentional from every angle.",
            bullets:
              lang === "sl"
                ? [
                    "Studijska montaža v kontroliranih pogojih.",
                    "Natančna poravnava linij in panelov.",
                    "Čist zaključek brez vizualnega šuma.",
                  ]
                : lang === "de"
                  ? [
                      "Studio-Installation unter kontrollierten Bedingungen.",
                      "Präzise Ausrichtung von Linien und Flächen.",
                      "Sauberes Finish ohne visuellen Störfaktor.",
                    ]
                  : [
                      "Studio installation under controlled conditions.",
                      "Precise alignment across lines and panels.",
                      "A clean finish with no visual noise.",
                    ],
          },
          {
            number: "05",
            title: lang === "sl" ? "Kontrola" : lang === "de" ? "Qualitätskontrolle" : "Quality Control",
            description:
              lang === "sl"
                ? "Kontrola robov, linij in površine."
                : lang === "de"
                  ? "Kontrolle von Kanten und Oberflächen."
                  : "Edge and surface inspection.",
            details:
              lang === "sl"
                ? "Po montaži sledi detajlna kontrola vseh robov, prehodov, napetosti materiala in optične čistosti površine. Tukaj se loči običajna izvedba od res premium rezultata."
                : lang === "de"
                  ? "Nach der Montage folgt eine präzise Kontrolle von Kanten, Übergängen, Materialspannung und der optischen Reinheit der Oberfläche. Genau hier trennt sich Standard von Premium."
                  : "After installation, every edge, transition, material tension point, and visible surface is checked. This is where standard execution separates from a truly premium result.",
            bullets:
              lang === "sl"
                ? [
                    "Pregled vseh robov in kritičnih prehodov.",
                    "Kontrola površine pod studijsko svetlobo.",
                    "Zadnje korekcije pred predajo.",
                  ]
                : lang === "de"
                  ? [
                      "Kontrolle aller Kanten und kritischen Übergänge.",
                      "Prüfung der Oberfläche unter Studio-Licht.",
                      "Letzte Korrekturen vor der Übergabe.",
                    ]
                  : [
                      "Inspection of all edges and critical transitions.",
                      "Surface review under studio lighting.",
                      "Final refinements before handover.",
                    ],
          },
          {
            number: "06",
            title: lang === "sl" ? "Predaja" : lang === "de" ? "Übergabe" : "Delivery",
            description:
              lang === "sl"
                ? "Vozilo pripravljeno za prevzem."
                : lang === "de"
                  ? "Fahrzeug bereit zur Übergabe."
                  : "Vehicle ready for collection.",
            details:
              lang === "sl"
                ? "Ko je projekt zaključen, je vozilo pripravljeno za prevzem v stanju, ki ustreza standardu studia. Predamo tudi osnovna priporočila za nego in dolgoročen videz materiala."
                : lang === "de"
                  ? "Nach Abschluss des Projekts wird das Fahrzeug in Studio-Qualität übergeben. Zusätzlich erhalten Sie die wichtigsten Hinweise für Pflege und langfristige Optik."
                  : "Once the project is complete, the vehicle is delivered in studio-standard condition. You also receive clear aftercare guidance to preserve the finish and long-term appearance.",
            bullets:
              lang === "sl"
                ? [
                    "Končna predstavitev vozila in rezultata.",
                    "Navodila za nego in vzdrževanje.",
                    "Pripravljeno za prevzem brez kompromisov.",
                  ]
                : lang === "de"
                  ? [
                      "Finale Präsentation von Fahrzeug und Ergebnis.",
                      "Hinweise zu Pflege und Werterhalt.",
                      "Bereit zur Übergabe ohne Kompromisse.",
                    ]
                  : [
                      "Final presentation of the vehicle and result.",
                      "Aftercare guidance for upkeep and longevity.",
                      "Ready for collection without compromise.",
                    ],
          },
        ]}
      />

      <MaterialsSection
        kicker={t("materialsKicker")}
        title={t("materialsTitle")}
        subtitle={t("materialsSub")}
        partnersLabel={lang === "sl" ? "Izbrani materialni partnerji" : lang === "de" ? "Ausgewählte Materialpartner" : "Selected material partners"}
        brands={[
          { name: "SKYFOL", descriptor: lang === "sl" ? "Zaščitne folije" : lang === "de" ? "Schutzfolien" : "Protection films" },
          { name: "STEK", descriptor: lang === "sl" ? "PPF sistemi" : lang === "de" ? "PPF-Systeme" : "PPF systems" },
          { name: "3M", descriptor: lang === "sl" ? "Preverjeni materiali" : lang === "de" ? "Bewährte Materialien" : "Trusted materials" },
          { name: "Avery Dennison", descriptor: lang === "sl" ? "Wrap sistemi" : lang === "de" ? "Wrap-Systeme" : "Wrap systems" },
        ]}
      />

      <StudioSection
        kicker={t("studioKicker")}
        title={t("studioTitle")}
        description={t("studioText")}
        features={
          lang === "sl"
            ? ["LED studijska osvetlitev", "Prahovni kontroliran prostor", "Temperaturno regulirana montaža", "Precizno rezanje in robljenje"]
            : lang === "de"
              ? ["LED-Studiobeleuchtung", "Staubkontrollierter Arbeitsbereich", "Temperaturgeregelte Installation", "Präzisionsschnitt und Kantenumwicklung"]
              : ["LED studio lighting", "Dust controlled workspace", "Temperature regulated installation", "Precision cutting & edge wrapping"]
        }
        imageSrc="/midnight-studio.webp"
      />

      <FeaturedBuildsSection
        kicker={t("selectedKicker")}
        title={t("featuredTitle")}
        subtitle={t("featuredSub")}
        projects={projects}
        installationText={lang === "sl" ? "3D predogled · Studijska montaža" : lang === "de" ? "3D-Vorschau · Studio-Installation" : "Design preview · Studio installation"}
        viewProjectText={lang === "sl" ? "Poglej projekt" : lang === "de" ? "Projekt ansehen" : "View project"}
        viewAllText={lang === "sl" ? "Poglej vse projekte" : lang === "de" ? "Alle Projekte ansehen" : "View all projects"}
      />

      <ConfiguratorSection
        kicker={t("cfgKicker")}
        title={t("cfgTitle")}
        description={t("cfgText")}
        bullets={[t("cfgB1"), t("cfgB2"), t("cfgB3")]}
        cta1Text={t("cfgCta1")}
        cta2Text={t("cfgCta2")}
        videoLabel={lang === "sl" ? "Dejanski postopek predogleda" : lang === "de" ? "Echtes Vorschauprozess" : "Real preview process"}
        videoId="XfKUhKLCZgE"
      />

      <ProtectionDemo
        kicker={t("demoKicker")}
        title={t("demoTitle")}
        subtitle={t("demoSub")}
        beforeLabel={t("demoBeforeLabel")}
        afterLabel={t("demoAfterLabel")}
        dragHint={t("demoDragHint")}
        benefits={[
          {
            label: "IMPACT",
            text: lang === "sl"
              ? "PPF absorbira udarce kamenčkov."
              : lang === "de"
                ? "PPF absorbiert Steinschläge."
                : "PPF absorbs stone impacts.",
          },
          {
            label: "SELF HEALING",
            text: lang === "sl"
              ? "Manjše praske izginejo s toploto."
              : lang === "de"
                ? "Kleine Kratzer heilen mit Wärme."
                : "Minor scratches disappear with heat.",
          },
          {
            label: "VALUE",
            text: lang === "sl"
              ? "Ohranja originalni lak in vrednost vozila."
              : lang === "de"
                ? "Erhält Originallack und Fahrzeugwert."
                : "Preserves original paint and resale value.",
          },
        ]}
      />

      <ServicesSection
        kicker={t("offerKicker")}
        title={t("servicesTitle")}
        subtitle={t("servicesSub")}
        items={[
          { title: t("s1t"), description: t("s1d") },
          { title: t("s2t"), description: t("s2d") },
          { title: t("s3t"), description: t("s3d") },
          { title: t("s4t"), description: t("s4d") },
        ]}
      />

      <PricingSection
        kicker={t("pricingKicker")}
        title={t("investmentTitle")}
        subtitle={t("investmentSub")}
        recommendedLabel={t("recommendedLabel")}
        packs={[
          {
            name: t("pack1"),
            price: t("pack1p"),
            description: t("pack1d"),
          },
          {
            name: t("pack2"),
            price: t("pack2p"),
            description: t("pack2d"),
            highlight: true,
          },
          {
            name: t("pack3"),
            price: t("pack3p"),
            description: t("pack3d"),
          },
        ]}
      />

      <WindowTintSection
        kicker={t("comfortKicker")}
        title={t("tintTitle")}
        subtitle={t("tintSub")}
        features={[
          {
            tag: t("signature"),
            title: t("tint1"),
            description: t("tint1d"),
          },
          {
            tag: t("perf"),
            title: t("tint2"),
            description: t("tint2d"),
          },
          {
            tag: t("track"),
            title: t("tint3"),
            description: t("tint3d"),
          },
        ]}
      />

      <AssuranceSection
        kicker={
          lang === "sl"
            ? "ASSURANCE"
            : lang === "de"
              ? "ASSURANCE"
              : "ASSURANCE"
        }
        title={
          lang === "sl"
            ? "GARANCIJA, ZAŠČITA IN PREDAJA"
            : lang === "de"
              ? "GARANTIE, SCHUTZ UND ÜBERGABE"
              : "GUARANTEE, WARRANTY & OWNERSHIP"
        }
        subtitle={
          lang === "sl"
            ? "Vsak projekt je podprt s studijskim standardom, proizvajalčevo garancijo in popolno izkušnjo prevzema vozila."
            : lang === "de"
              ? "Jedes Projekt ist durch Studio-Standard, Herstellergarantie und eine vollständige Übergabe-Erfahrung abgesichert."
              : "Every project is backed by the studio standard, a manufacturer warranty and a complete delivery experience."
        }
        pillars={[
          {
            kicker: t("guaranteeKicker"),
            title: t("guaranteeTitle"),
            description: t("guaranteeSub"),
            bullets: [
              lang === "sl"
                ? "Popravek instalacijskih napak — brezplačno."
                : lang === "de"
                  ? "Kostenlose Korrektur von Installationsfehlern."
                  : "Installation defects corrected — free of charge.",
              lang === "sl"
                ? "Ponovna montaža panela, če popravek ni dovolj."
                : lang === "de"
                  ? "Neuinstallation des Panels, wenn nötig."
                  : "Panel reinstallation if the correction is not enough.",
              lang === "sl"
                ? "Delni ali polni refund, če težave ni mogoče odpraviti."
                : lang === "de"
                  ? "Teilweise oder vollständige Rückerstattung, falls unlösbar."
                  : "Partial or full refund if the issue cannot be resolved.",
            ],
          },
          {
            kicker: t("warrantyKicker"),
            title: t("warrantyTitle"),
            description: t("warrantyText"),
            bullets: [
              lang === "sl"
                ? "5–10 let proizvajalčeve garancije."
                : lang === "de"
                  ? "5–10 Jahre Herstellergarantie."
                  : "5–10 year manufacturer warranty.",
              lang === "sl"
                ? "Self-healing tehnologija vrhnjega sloja."
                : lang === "de"
                  ? "Self-Healing-Technologie der Deckschicht."
                  : "Self-healing top coat technology.",
              lang === "sl"
                ? "Odpornost na UV in madeže."
                : lang === "de"
                  ? "UV- und Fleckenbeständigkeit."
                  : "UV and stain resistance.",
              lang === "sl"
                ? "Ohranja originalni lak in vrednost vozila."
                : lang === "de"
                  ? "Erhält Originallack und Fahrzeugwert."
                  : "Preserves original paint and resale value.",
            ],
          },
          {
            kicker: t("deliveryKicker"),
            title:
              lang === "sl"
                ? "OWNERSHIP PAKET"
                : lang === "de"
                  ? "OWNERSHIP-PAKET"
                  : "OWNERSHIP PACKAGE",
            description:
              lang === "sl"
                ? "Zaključen projekt pomeni tudi premium izkušnjo prevzema — dokumentacija, certifikat in jasna navodila za nego."
                : lang === "de"
                  ? "Ein abgeschlossenes Projekt bedeutet auch eine hochwertige Übergabe — Dokumentation, Zertifikat und klare Pflegehinweise."
                  : "Every completed project ends with a premium handover — documentation, certificate and clear care guidance.",
            bullets: [
              lang === "sl"
                ? "Personaliziran studio certifikat projekta."
                : lang === "de"
                  ? "Personalisiertes Studio-Zertifikat des Projekts."
                  : "Personalised studio project certificate.",
              lang === "sl"
                ? "Garancijska knjižica z natančnimi navodili."
                : lang === "de"
                  ? "Garantieheft mit detaillierten Pflegehinweisen."
                  : "Warranty booklet with detailed care instructions.",
              lang === "sl"
                ? "Navodila za pravilno nego PPF in wrap folije."
                : lang === "de"
                  ? "Anleitung zur richtigen Pflege von PPF und Wrap."
                  : "Guidance for correct PPF and wrap film care.",
              lang === "sl"
                ? "Priporočila za dolgoročno vzdrževanje videza."
                : lang === "de"
                  ? "Empfehlungen zur langfristigen Werterhaltung."
                  : "Recommendations for long-term appearance upkeep.",
            ],
          },
        ]}
        footnote={
          lang === "sl"
            ? "Garancija velja za instalacijske napake in mora biti prijavljena v 7 dneh po prevzemu vozila."
            : lang === "de"
              ? "Die Garantie gilt für Installationsfehler und muss innerhalb von 7 Tagen gemeldet werden."
              : "Guarantee applies to installation defects and must be reported within 7 days after delivery."
        }
        notCoveredLabel={
          lang === "sl"
            ? "KAJ NI POKRITO"
            : lang === "de"
              ? "WAS NICHT ABGEDECKT IST"
              : "WHAT IS NOT COVERED"
        }
        notCoveredTitle={t("notCovered")}
        notCoveredIntro={
          lang === "sl"
            ? "Primeri situacij, kjer poškodbe ali obraba niso več del studijske odgovornosti."
            : lang === "de"
              ? "Situationen, in denen Schäden oder Verschleiß außerhalb der Studio-Verantwortung liegen."
              : "Situations where damage or wear is outside the studio's responsibility."
        }
        notCoveredItems={[
          lang === "sl"
            ? "Poškodbe po prevzemu vozila (kamenčki, praske, nesreče)."
            : lang === "de"
              ? "Schäden nach der Fahrzeugübergabe (Steinschläge, Kratzer, Unfälle)."
              : "Damage after delivery (stone chips, scratches, accidents).",
          lang === "sl"
            ? "Nepravilno vzdrževanje ali uporaba agresivnih čistil."
            : lang === "de"
              ? "Falsche Pflege oder aggressive Reinigungsmittel."
              : "Improper maintenance or use of aggressive chemicals.",
          lang === "sl"
            ? "Avtopralnice z grobimi krtačami ali mehanske poškodbe."
            : lang === "de"
              ? "Waschanlagen mit harten Bürsten oder mechanische Schäden."
              : "Automatic car washes with harsh brushes or mechanical damage.",
          lang === "sl"
            ? "Poškodbe zaradi dirkališke vožnje ali ekstremne uporabe."
            : lang === "de"
              ? "Schäden durch Rennstreckennutzung oder extreme Belastung."
              : "Damage caused by track use or extreme driving conditions.",
          lang === "sl"
            ? "Posegi tretjih oseb na foliji ali lakiranju vozila."
            : lang === "de"
              ? "Eingriffe durch Dritte an Folie oder Lack."
              : "Work performed by third parties on the film or paint.",
        ]}
      />

      <TestimonialsSection
        kicker={t("testimonialsKicker")}
        title={t("testimonialsTitle")}
        subtitle={t("testimonialsSub")}
        items={[
          {
            name: "Porsche 911 Owner",
            quote:
              "Installation quality and attention to detail were on another level.",
          },
          {
            name: "BMW M4 Owner",
            quote: "The design preview made the decision incredibly easy.",
          },
          {
            name: "Audi RS7 Owner",
            quote: "This is not a wrap shop. It's a true automotive studio.",
          },
        ]}
      />

      <BookingSection
        kicker={t("applyKicker")}
        title={t("bookingTitle")}
        subtitle={t("bookingSub")}
        vehiclePlaceholder={t("vehiclePh")}
        emailPlaceholder={t("emailPh")}
        service={service}
        onServiceChange={setService}
        opt0={t("opt0")}
        opt1={t("opt1")}
        opt2={t("opt2")}
        opt3={t("opt3")}
        opt4={t("opt4")}
        opt5={t("opt5")}
        opt6={t("opt6")}
        submitLabel={t("submit")}
        responseNote={t("response")}
        quickContact={t("quickContact")}
        qcSub={t("qcSub")}
        qc1={t("qc1")}
        qc2={t("qc2")}
        qc3={t("qc3")}
        contact={CONTACT}
      />

      <Footer
        tagline={t("footer")}
        privacyLabel={t("privacyLabel")}
        cookiesLabel={t("cookiesLabel")}
        settingsLabel={t("cookieSettingsLabel")}
      />

      <CookieConsent lang={lang} />
      <Analytics />
    </main>
  );
}
