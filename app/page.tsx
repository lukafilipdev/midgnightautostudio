"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const CONTACT = {
  email: "info@midnightautostudio.com",
  instagram: "https://instagram.com/midnightautostudio",
  whatsapp: "https://wa.me/38640111222",
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
  tintBefore:
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1800&auto=format&fit=crop",
  tintAfter:
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1800&auto=format&fit=crop",
  studio:
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop",
  warranty:
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1600&auto=format&fit=crop",
  track:
    "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1800&auto=format&fit=crop",
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
    stats1v: "120+",
    stats1l: "Dostavljenih premium vozil",
    stats2v: "€12M+",
    stats2l: "Vrednosti vozil pod zaščito",
    stats3v: "Seen on Track",
    stats3l: "Performance paketi",
    whyKicker: "STUDIO STANDARD",
    whyTitle: "ZAKAJ MIDNIGHT AUTO STUDIO",
    whySub:
      "Nismo klasičen wrap shop. Delujemo kot butik studio za vozila visoke vrednosti.",
    why1t: "3D Vizualizacija",
    why1d:
      "Pred montažo vidiš končni izgled. Barva, finish in detajli so potrjeni še preden se dotaknemo vozila.",
    why2t: "Butični pristop",
    why2d:
      "Sprejmemo omejeno število vozil mesečno. Vsak projekt dobi čas, natančnost in kontrolirano studijsko okolje.",
    why3t: "Fokus na performance vozila",
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
      "Realni projekti. Premium materiali. Čiste linije. Slike so trenutno primeri — kasneje zamenjaj s svojimi.",
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
    trackKicker: "PERFORMANCE",
    trackTitle: "SEEN ON TRACK",
    trackSub: "Zaščita vozil, ki se vozijo tudi na dirkališču.",
    trackText:
      "Track vožnja pomeni večjo obrabo. PPF zaščita preprečuje poškodbe laka pri visokih hitrostih.",
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
    sticky: "Rezerviraj zasebni posvet",
    footer: "Midnight Auto Studio · Premium zaščita vozil",
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
    stats1v: "120+",
    stats1l: "High-value vehicles delivered",
    stats2v: "€12M+",
    stats2l: "Protected vehicle value",
    stats3v: "Seen on Track",
    stats3l: "Performance protection packages",
    whyKicker: "STUDIO STANDARD",
    whyTitle: "WHY MIDNIGHT AUTO STUDIO",
    whySub:
      "Not a typical wrap shop. A boutique studio built for high-value vehicles.",
    why1t: "3D Design Preview",
    why1d:
      "See the final design before installation. Finish, colour and details approved before any film is applied.",
    why2t: "Boutique Approach",
    why2d:
      "Limited vehicles per month. Every build receives full attention and controlled studio conditions.",
    why3t: "Performance Vehicle Focus",
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
    trackKicker: "PERFORMANCE",
    trackTitle: "SEEN ON TRACK",
    trackSub: "Protection built for vehicles that also see track use.",
    trackText:
      "Track driving creates extreme wear. PPF protects paint from debris at high speeds.",
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
    sticky: "Book Private Consultation",
    footer: "Midnight Auto Studio · Premium Automotive Protection",
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
    stats1v: "120+",
    stats1l: "Premium-Fahrzeuge ausgeliefert",
    stats2v: "€12M+",
    stats2l: "Geschützter Fahrzeugwert",
    stats3v: "Seen on Track",
    stats3l: "Performance-Schutzpakete",
    whyKicker: "STUDIO STANDARD",
    whyTitle: "WARUM MIDNIGHT AUTO STUDIO",
    whySub:
      "Kein klassischer Wrap-Shop. Ein Boutique-Studio für Fahrzeuge mit hohem Wert.",
    why1t: "3D Visualisierung",
    why1d:
      "Das finale Design wird vor der Montage visualisiert – Finish und Details werden vorher bestätigt.",
    why2t: "Boutique Ansatz",
    why2d:
      "Begrenzte Anzahl Fahrzeuge pro Monat – jedes Projekt erhält volle Aufmerksamkeit.",
    why3t: "Fokus auf Performance Fahrzeuge",
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
    trackKicker: "PERFORMANCE",
    trackTitle: "AUF DER RENNSTRECKE",
    trackSub:
      "Schutz für Fahrzeuge, die auch auf der Rennstrecke gefahren werden.",
    trackText:
      "Track-Fahrten bedeuten höhere Belastung – PPF schützt den Lack bei hohen Geschwindigkeiten.",
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
    sticky: "Private Beratung buchen",
    footer: "Midnight Auto Studio · Premium Fahrzeugschutz",
    galleryLabel: "GALERIE",
    prev: "Zurück",
    next: "Weiter",
    dot: "Zum Element",
  },
};

function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (!els.length) return;
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
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Logo({ className }: { className: string }) {
  return <img src="/logo.svg" alt="Midnight Auto Studio" className={className} draggable={false} />;
}

function SectionTitle({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12 md:mb-16" data-reveal>
      {kicker ? (
        <p className="text-[10px] md:text-xs tracking-[0.35em] text-gray-500 mb-4">
          {kicker}
        </p>
      ) : null}
      <h2 className="text-xl md:text-3xl tracking-[0.28em] md:tracking-[0.3em]">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-gray-400 text-xs md:text-sm max-w-2xl mx-auto mt-5 leading-relaxed whitespace-pre-line">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function AppleGallery({
  items,
  t,
}: {
  items: { src: string; label: string }[];
  t: (k: string) => string;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.9, 900);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      children.forEach((c, idx) => {
        const cMid = c.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(cMid - mid);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = idx;
        }
      });
      setActive(bestIdx);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  const Chevron = ({ dir }: { dir: "left" | "right" }) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-90"
    >
      <path
        d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div data-reveal>
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs tracking-[0.35em] text-gray-500">
          {t("galleryLabel")}
        </p>
        <div className="hidden md:flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label={t("prev")}
            className="border border-neutral-800 w-10 h-10 rounded-full text-gray-200 hover:border-white transition flex items-center justify-center"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label={t("next")}
            className="border border-neutral-800 w-10 h-10 rounded-full text-gray-200 hover:border-white transition flex items-center justify-center"
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0"
        style={{ scrollBehavior: "smooth" }}
      >
        {items.map((it, idx) => (
          <div key={idx} className="snap-center shrink-0 w-[88%] md:w-[520px]">
            <div className="rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950">
              <div className="relative">
                <img
                  src={it.src}
                  alt={it.label}
                  className="w-full h-[340px] md:h-[420px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/0" />
                <div className="absolute bottom-5 left-6 right-6">
                  <p className="text-sm md:text-base tracking-wide">
                    {it.label}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Boutique finish · Precision edges · Studio lighting
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="flex items-center justify-center gap-2 mt-4"
        aria-label="Gallery progress"
      >
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${t("dot")} ${i + 1}`}
            onClick={() => {
              const el = scrollerRef.current;
              if (!el) return;
              const child = el.children[i] as HTMLElement | undefined;
              if (!child) return;
              el.scrollTo({ left: child.offsetLeft - 24, behavior: "smooth" });
            }}
            className={
              "h-2 rounded-full transition-all border border-neutral-700 " +
              (i === active ? "w-8 bg-white" : "w-2 bg-transparent")
            }
          />
        ))}
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-8">
      {children}
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("sl");
  const [service, setService] = useState("");
  const [tintSlider, setTintSlider] = useState(52);
  const [paintSlider, setPaintSlider] = useState(50);
  const [finish, setFinish] = useState<"gloss" | "satin" | "matte">("gloss");
  const [coverage, setCoverage] = useState(70);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [showStickyCta, setShowStickyCta] = useState(true);

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

  useEffect(() => {
    const booking = document.getElementById("booking");
    if (!booking) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === booking) setShowStickyCta(!e.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );
    io.observe(booking);
    return () => io.disconnect();
  }, []);

  const projects = useMemo(
    () => [
      { src: IMG.m4, label: "BMW M4 · Full Body PPF" },
      { src: IMG.p911, label: "Porsche 911 · Satin Wrap" },
      { src: IMG.rs6, label: "Audi RS6 · Track Protection" },
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

  const finishImg =
    finish === "gloss"
      ? IMG.cfgGloss
      : finish === "satin"
        ? IMG.cfgSatin
        : IMG.cfgMatte;

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      <nav className={`fixed top-0 left-0 w-full z-[70] transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          {/* <Logo className="h-8 w-auto" /> */}
          <span className="text-white text-lg font-bold tracking-[0.25em]">MIDNIGHT</span>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center relative bg-neutral-800 rounded-full p-1">
              <div 
                className="absolute top-1 bottom-1 bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  width: "calc(33.333% - 2px)",
                  left: lang === "sl" ? "4px" : lang === "en" ? "calc(33.333% + 1px)" : "calc(66.666% - 2px)",
                }}
              />
              {(
                [
                  ["sl", "SI"],
                  ["en", "EN"],
                  ["de", "DE"],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setLang(k)}
                  className={
                    "relative z-10 flex-1 px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] transition-colors duration-200 text-center min-w-[36px] font-semibold outline-none focus:outline-none " +
                    (lang === k
                      ? "text-black"
                      : "text-gray-300 hover:text-white")
                  }
                >
                  {label}
                </button>
              ))}
            </div>
            <a
              href="#booking"
              className="btn-primary w-[140px] py-2.5 rounded-full text-xs tracking-[0.15em] font-semibold text-center bg-white text-black border border-white"
            >
              {t("book")}
            </a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[100svh] flex items-center justify-center px-6 pt-24 hero-bg overflow-hidden">
        {/* Noise texture overlay */}
        <div className="hero-noise" />
        
        {/* Cursor light effect */}
        <div 
          className="cursor-light"
          style={{
            background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.04), transparent 40%)`
          }}
        />

        <div className="relative z-20 max-w-4xl text-center">
          {/* Logo with glow */}
          <div className="flex justify-center mb-6 hero-animate-1 logo-glow">
            <Logo className="h-64 md:h-80 lg:h-[420px] w-auto" />
          </div>
          
          {/* Main headline with gradient text */}
          <div className="max-w-2xl mx-auto space-y-4 hero-animate-2">
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-light tracking-wide leading-relaxed">
              {lang === "sl" ? "Butični studio zaščite in preobrazbe za" : lang === "de" ? "Boutique-Studio für" : "Boutique automotive protection atelier for"}
              <span className="font-semibold gradient-text"> BMW M</span>,
              <span className="font-semibold gradient-text"> Audi RS</span> {lang === "sl" ? "in" : lang === "de" ? "&" : "&"}
              <span className="font-semibold gradient-text"> Porsche</span>.
            </p>
          </div>

          {/* Subheadline */}
          <p className="mt-5 text-white/60 text-sm md:text-base max-w-xl mx-auto tracking-wide hero-animate-3">
            {lang === "sl" ? "Vizualizacija pred montažo. Izvedba brez kompromisov." : lang === "de" ? "Design-Vorschau vor der Montage. Präzision ohne Kompromisse." : "Design preview before installation. Precision-only execution."}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 hero-animate-4">
            <a
              href="#booking"
              className="btn-primary w-full sm:w-auto px-12 py-3.5 rounded-full text-xs tracking-[0.2em] font-semibold text-center bg-white text-black border-2 border-white"
            >
              {t("request")}
            </a>
            <a
              href="#projects"
              className="btn-secondary w-full sm:w-auto px-12 py-3.5 rounded-full text-xs tracking-[0.2em] font-medium text-center text-white/80 border border-white/20 hover:border-white/40 hover:text-white"
            >
              {t("viewBuilds")}
            </a>
          </div>

          {/* Divider with limited text */}
          <div className="mt-12 flex items-center justify-center gap-4 hero-animate-5">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/30" />
            <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-medium">
              {t("limited")}
            </p>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/30" />
          </div>

          {/* Trust microcopy */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 hero-animate-5">
            <span className="text-[11px] text-white/50 tracking-wide flex items-center gap-1.5">
              <span className="text-white/70">✓</span> BMW M / Audi RS {lang === "sl" ? "specialisti" : lang === "de" ? "Spezialisten" : "specialists"}
            </span>
            <span className="text-[11px] text-white/50 tracking-wide flex items-center gap-1.5">
              <span className="text-white/70">✓</span> Premium {lang === "sl" ? "materiali" : lang === "de" ? "Materialien" : "materials"}
            </span>
            <span className="text-[11px] text-white/50 tracking-wide flex items-center gap-1.5">
              <span className="text-white/70">✓</span> {lang === "sl" ? "Brez kompromisov" : lang === "de" ? "Keine Kompromisse" : "No compromises"}
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-neutral-900 text-center px-6">
        <div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
          data-reveal
        >
          <div>
            <p className="text-3xl md:text-4xl mb-2">{t("stats1v")}</p>
            <p className="text-gray-400 text-xs md:text-sm">{t("stats1l")}</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl mb-2">{t("stats2v")}</p>
            <p className="text-gray-400 text-xs md:text-sm">{t("stats2l")}</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl mb-2">{t("stats3v")}</p>
            <p className="text-gray-400 text-xs md:text-sm">{t("stats3l")}</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 border-t border-neutral-900 bg-black">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            kicker={t("whyKicker")}
            title={t("whyTitle")}
            subtitle={t("whySub")}
          />
          <div className="grid md:grid-cols-3 gap-8" data-reveal>
            {[
              ["01", t("why1t"), t("why1d")],
              ["02", t("why2t"), t("why2d")],
              ["03", t("why3t"), t("why3d")],
            ].map(([n, tt, d], i) => (
              <Card key={i}>
                <p className="text-xs tracking-[0.35em] text-gray-500 mb-3">
                  {n}
                </p>
                <h3 className="text-lg mb-3">{tt}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            kicker={t("processKicker")}
            title={t("processTitle")}
            subtitle={t("processSub")}
          />
          <div className="grid md:grid-cols-3 gap-8" data-reveal>
            {[
              [
                "01",
                lang === "sl"
                  ? "Posvet"
                  : lang === "de"
                    ? "Beratung"
                    : "Consultation",
                lang === "sl"
                  ? "Pregled vozila in ciljev projekta."
                  : lang === "de"
                    ? "Analyse des Fahrzeugs und der Ziele."
                    : "Vehicle inspection and project goals.",
              ],
              [
                "02",
                "3D Preview",
                lang === "sl"
                  ? "Vizualizacija barve, finisha in detajlov."
                  : lang === "de"
                    ? "Visualisierung von Finish und Details."
                    : "Design preview before installation.",
              ],
              [
                "03",
                lang === "sl"
                  ? "Priprava"
                  : lang === "de"
                    ? "Vorbereitung"
                    : "Preparation",
                lang === "sl"
                  ? "Temeljito čiščenje in dekontaminacija."
                  : lang === "de"
                    ? "Gründliche Reinigung und Vorbereitung."
                    : "Deep cleaning and surface preparation.",
              ],
              [
                "04",
                lang === "sl"
                  ? "Montaža"
                  : lang === "de"
                    ? "Installation"
                    : "Installation",
                lang === "sl"
                  ? "Natančna studijska montaža."
                  : lang === "de"
                    ? "Präzise Studio-Installation."
                    : "Precision film installation.",
              ],
              [
                "05",
                lang === "sl"
                  ? "Kontrola"
                  : lang === "de"
                    ? "Qualitätskontrolle"
                    : "Quality Control",
                lang === "sl"
                  ? "Kontrola robov, linij in površine."
                  : lang === "de"
                    ? "Kontrolle von Kanten und Oberflächen."
                    : "Edge and surface inspection.",
              ],
              [
                "06",
                lang === "sl"
                  ? "Predaja"
                  : lang === "de"
                    ? "Übergabe"
                    : "Delivery",
                lang === "sl"
                  ? "Vozilo pripravljeno za prevzem."
                  : lang === "de"
                    ? "Fahrzeug bereit zur Übergabe."
                    : "Vehicle ready for collection.",
              ],
            ].map(([n, tt, d], i) => (
              <Card key={i}>
                <p className="text-xs tracking-[0.35em] text-gray-500 mb-3">
                  {n}
                </p>
                <h3 className="text-base mb-2">{tt}</h3>
                <p className="text-gray-400 text-sm">{d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTitle
            kicker={t("materialsKicker")}
            title={t("materialsTitle")}
            subtitle={t("materialsSub")}
          />
          <div className="grid md:grid-cols-4 gap-6 mt-10" data-reveal>
            {["SKYFOL", "STEK", "3M", "Avery Dennison"].map((b, i) => (
              <Card key={i}>
                <p className="text-xl tracking-[0.2em]">{b}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 border-t border-neutral-900 bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-reveal>
            <p className="text-xs tracking-[0.35em] text-gray-500 mb-4">
              {t("studioKicker")}
            </p>
            <h2 className="text-2xl md:text-3xl tracking-[0.3em] mb-6">
              {t("studioTitle")}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t("studioText")}
            </p>
            <div className="space-y-3 text-sm text-gray-300">
              <p>• LED studio lighting</p>
              <p>• Dust controlled workspace</p>
              <p>• Temperature regulated installation</p>
              <p>• Precision cutting & edge wrapping</p>
            </div>
          </div>
          <div
            className="rounded-3xl overflow-hidden border border-neutral-800"
            data-reveal
          >
            <img
              src={IMG.studio}
              className="w-full h-[420px] object-cover"
              alt="Studio"
            />
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 md:py-32 px-6 border-t border-neutral-900">
        <SectionTitle
          kicker={t("selectedKicker")}
          title={t("featuredTitle")}
          subtitle={t("featuredSub")}
        />
        <div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
          data-reveal
        >
          {projects.map((p, i) => (
            <div key={i} className="group">
              <div className="overflow-hidden rounded-3xl bg-neutral-950 border border-neutral-800">
                <img
                  src={p.src}
                  alt={p.label}
                  className="w-full h-[320px] md:h-[360px] object-cover group-hover:scale-105 transition duration-700"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-gray-300 text-sm text-center">{p.label}</p>
              <p className="text-gray-500 text-xs text-center mt-1">
                Design preview · Studio installation
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            kicker={t("galleryKicker")}
            title={t("galleryTitle")}
            subtitle={t("gallerySub")}
          />
          <AppleGallery items={gallery} t={t} />
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 border-t border-neutral-900 bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-reveal>
            <p className="text-[10px] md:text-xs tracking-[0.35em] text-gray-500 mb-4">
              {t("cfgKicker")}
            </p>
            <h2 className="text-xl md:text-3xl tracking-[0.28em] md:tracking-[0.3em] mb-6">
              {t("cfgTitle")}
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              {t("cfgText")}
            </p>
            <div className="space-y-4">
              {[t("cfgB1"), t("cfgB2"), t("cfgB3")].map((txt, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-white mt-2" />
                  <p className="text-gray-300 text-sm">{txt}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#booking"
                className="border border-white px-7 py-3 rounded-full text-sm hover:bg-white hover:text-black transition text-center"
              >
                {t("cfgCta1")}
              </a>
              <a
                href="#projects"
                className="border border-neutral-700 px-7 py-3 rounded-full text-sm text-gray-200 hover:border-white transition text-center"
              >
                {t("cfgCta2")}
              </a>
            </div>
          </div>
          <div
            className="bg-neutral-950 rounded-3xl border border-neutral-800 overflow-hidden"
            data-reveal
          >
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
              <p className="text-[10px] md:text-xs tracking-[0.35em] text-gray-400">
                {t("miniCfg")}
              </p>
              <p className="text-xs text-gray-500">{t("interactive")}</p>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-5 mb-6">
                <div>
                  <p className="text-xs text-gray-500 mb-3">{t("finish")}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {(
                      [
                        ["gloss", t("gloss")],
                        ["satin", t("satin")],
                        ["matte", t("matte")],
                      ] as const
                    ).map(([k, label]) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setFinish(k)}
                        className={
                          "rounded-full border px-4 py-2 text-xs tracking-wide transition " +
                          (finish === k
                            ? "border-white bg-white text-black"
                            : "border-neutral-800 text-gray-200 hover:border-white")
                        }
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-500">{t("coverage")}</p>
                    <p className="text-xs text-gray-300">{coverage}%</p>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={100}
                    value={coverage}
                    onChange={(e) => setCoverage(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-[11px] text-gray-500 mt-2">
                    {t("coverageHint")}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden bg-black border border-neutral-800 relative">
                <img
                  src={finishImg}
                  alt="Configurator preview"
                  className="w-full h-[320px] md:h-[360px] object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 ${100 - coverage}% 0 0)` }}
                >
                  <div className="absolute inset-0 bg-white/10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/18 via-white/0 to-white/0" />
                  <div className="absolute top-5 left-5 border border-white/50 rounded-full px-3 py-1 text-[10px] tracking-[0.35em] text-white/90">
                    {t("ppfCoverage")}
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  [t("finish"), finish.toUpperCase()],
                  [t("coverage"), `${coverage}%`],
                  [t("details"), t("accents")],
                  [t("approval"), t("beforeInstall")],
                ].map(([k, v], i) => (
                  <div
                    key={i}
                    className="bg-black/40 border border-neutral-800 rounded-2xl p-4"
                  >
                    <p className="text-xs text-gray-500 mb-1">{k}</p>
                    <p className="text-sm text-gray-200">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTitle
            kicker={t("demoKicker")}
            title={t("demoTitle")}
            subtitle={t("demoSub")}
          />
          <div className="max-w-5xl mx-auto" data-reveal>
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-black">
              <img src={IMG.tintBefore} className="w-full" alt="Damaged paint" />
              <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${paintSlider}%` }}
              >
                <img
                  src={IMG.tintAfter}
                  className="w-full"
                  alt="Protected paint"
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={paintSlider}
                onChange={(e) => setPaintSlider(Number(e.target.value))}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 w-3/4"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <Card>
                <p className="text-xs tracking-[0.35em] text-gray-500 mb-3">
                  IMPACT
                </p>
                <p className="text-gray-300 text-sm">
                  {lang === "sl"
                    ? "PPF absorbira udarce kamenčkov."
                    : lang === "de"
                      ? "PPF absorbiert Steinschläge."
                      : "PPF absorbs stone impacts."}
                </p>
              </Card>
              <Card>
                <p className="text-xs tracking-[0.35em] text-gray-500 mb-3">
                  SELF HEALING
                </p>
                <p className="text-gray-300 text-sm">
                  {lang === "sl"
                    ? "Manjše praske izginejo s toploto."
                    : lang === "de"
                      ? "Kleine Kratzer heilen mit Wärme."
                      : "Minor scratches disappear with heat."}
                </p>
              </Card>
              <Card>
                <p className="text-xs tracking-[0.35em] text-gray-500 mb-3">
                  VALUE
                </p>
                <p className="text-gray-300 text-sm">
                  {lang === "sl"
                    ? "Ohranja originalni lak in vrednost vozila."
                    : lang === "de"
                      ? "Erhält Originallack und Fahrzeugwert."
                      : "Preserves original paint and resale value."}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            kicker={t("offerKicker")}
            title={t("servicesTitle")}
            subtitle={t("servicesSub")}
          />
          <div className="grid md:grid-cols-4 gap-6" data-reveal>
            {[
              [t("s1t"), t("s1d")],
              [t("s2t"), t("s2d")],
              [t("s3t"), t("s3d")],
              [t("s4t"), t("s4d")],
            ].map(([tt, d], i) => (
              <Card key={i}>
                <h3 className="text-base md:text-lg mb-3">{tt}</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {d}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 border-t border-neutral-900 text-center">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            kicker={t("pricingKicker")}
            title={t("investmentTitle")}
            subtitle={t("investmentSub")}
          />
          <div className="grid md:grid-cols-3 gap-10" data-reveal>
            <Card>
              <h3 className="mb-4">{t("pack1")}</h3>
              <p className="text-3xl mb-4">{t("pack1p")}</p>
              <p className="text-gray-400 text-sm">{t("pack1d")}</p>
            </Card>
            <div className="bg-white text-black p-10 rounded-3xl md:scale-105 shadow-xl">
              <h3 className="mb-4">{t("pack2")}</h3>
              <p className="text-3xl mb-4">{t("pack2p")}</p>
              <p className="text-sm">{t("pack2d")}</p>
            </div>
            <Card>
              <h3 className="mb-4">{t("pack3")}</h3>
              <p className="text-3xl mb-4">{t("pack3p")}</p>
              <p className="text-gray-400 text-sm">{t("pack3d")}</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            kicker={t("comfortKicker")}
            title={t("tintTitle")}
            subtitle={t("tintSub")}
          />
          <div className="max-w-5xl mx-auto" data-reveal>
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950">
              <img src={IMG.tintBefore} className="w-full" alt="Before tint" />
              <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${tintSlider}%` }}
              >
                <img src={IMG.tintAfter} className="w-full" alt="After tint" />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={tintSlider}
                onChange={(e) => setTintSlider(Number(e.target.value))}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 w-3/4"
              />
            </div>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {[
                [t("signature"), t("tint1"), t("tint1d")],
                [t("perf"), t("tint2"), t("tint2d")],
                [t("track"), t("tint3"), t("tint3d")],
              ].map(([tag, tt, d], i) => (
                <Card key={i}>
                  <p className="text-[10px] tracking-[0.35em] text-gray-500 mb-3">
                    {tag}
                  </p>
                  <p className="text-lg mb-2">{tt}</p>
                  <p className="text-gray-400 text-sm">{d}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            kicker={t("guaranteeKicker")}
            title={t("guaranteeTitle")}
            subtitle={t("guaranteeSub")}
          />
          <div className="grid md:grid-cols-3 gap-8" data-reveal>
            {[
              [
                "01",
                lang === "sl"
                  ? "Popravek"
                  : lang === "de"
                    ? "Korrektur"
                    : "Correction",
                lang === "sl"
                  ? "Če opazite instalacijsko napako, jo brezplačno popravimo."
                  : lang === "de"
                    ? "Installationsfehler werden kostenlos korrigiert."
                    : "Any installation defect will be corrected free of charge.",
              ],
              [
                "02",
                lang === "sl"
                  ? "Ponovna montaža"
                  : lang === "de"
                    ? "Neuinstallation"
                    : "Reinstallation",
                lang === "sl"
                  ? "Če popravek ni dovolj, panel ponovno montiramo."
                  : lang === "de"
                    ? "Wenn nötig wird das Panel erneut installiert."
                    : "If needed the panel will be reinstalled.",
              ],
              [
                "03",
                lang === "sl"
                  ? "Refund"
                  : lang === "de"
                    ? "Rückerstattung"
                    : "Refund",
                lang === "sl"
                  ? "Če težave ni mogoče odpraviti, omogočamo delni ali polni refund."
                  : lang === "de"
                    ? "Wenn das Problem nicht lösbar ist, bieten wir eine teilweise oder vollständige Rückerstattung."
                    : "If the issue cannot be resolved, we offer a partial or full refund.",
              ],
            ].map(([n, tt, d], i) => (
              <Card key={i}>
                <p className="text-xs tracking-[0.35em] text-gray-500 mb-3">
                  {n}
                </p>
                <h3 className="text-lg mb-3">{tt}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{d}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-gray-500 text-xs mt-10 max-w-2xl mx-auto">
            {lang === "sl"
              ? "Garancija velja za instalacijske napake in mora biti prijavljena v 7 dneh po prevzemu vozila."
              : lang === "de"
                ? "Die Garantie gilt für Installationsfehler und muss innerhalb von 7 Tagen gemeldet werden."
                : "Guarantee applies to installation defects and must be reported within 7 days after delivery."}
          </p>
          <div
            className="mt-14 border-t border-neutral-800 pt-10 max-w-3xl mx-auto"
            data-reveal
          >
            <h3 className="text-sm tracking-[0.25em] text-gray-400 mb-6 text-center">
              {t("notCovered")}
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p>
                •{" "}
                {lang === "sl"
                  ? "Poškodbe po prevzemu vozila (kamenčki, praske, nesreče)."
                  : lang === "de"
                    ? "Schäden nach der Fahrzeugübergabe (Steinschläge, Kratzer, Unfälle)."
                    : "Damage after delivery (stone chips, scratches, accidents)."}
              </p>
              <p>
                •{" "}
                {lang === "sl"
                  ? "Nepravilno vzdrževanje ali uporaba agresivnih čistil."
                  : lang === "de"
                    ? "Falsche Pflege oder aggressive Reinigungsmittel."
                    : "Improper maintenance or use of aggressive chemicals."}
              </p>
              <p>
                •{" "}
                {lang === "sl"
                  ? "Avtopralnice z grobimi krtačami ali mehanske poškodbe."
                  : lang === "de"
                    ? "Waschanlagen mit harten Bürsten oder mechanische Schäden."
                    : "Automatic car washes with harsh brushes or mechanical damage."}
              </p>
              <p>
                •{" "}
                {lang === "sl"
                  ? "Poškodbe zaradi dirkališke vožnje ali ekstremne uporabe."
                  : lang === "de"
                    ? "Schäden durch Rennstreckennutzung oder extreme Belastung."
                    : "Damage caused by track use or extreme driving conditions."}
              </p>
              <p>
                •{" "}
                {lang === "sl"
                  ? "Posegi tretjih oseb na foliji ali lakiranju vozila."
                  : lang === "de"
                    ? "Eingriffe durch Dritte an Folie oder Lack."
                    : "Work performed by third parties on the film or paint."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 border-t border-neutral-900 bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-reveal>
            <p className="text-xs tracking-[0.35em] text-gray-500 mb-4">
              {t("careKicker")}
            </p>
            <h2 className="text-2xl md:text-3xl tracking-[0.3em] mb-6">
              {t("careTitle")}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t("careText")}
            </p>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                •{" "}
                {lang === "sl"
                  ? "Ročno pranje vozila"
                  : lang === "de"
                    ? "Handwäsche empfohlen"
                    : "Hand washing recommended"}
              </p>
              <p>
                •{" "}
                {lang === "sl"
                  ? "Brez agresivnih kemikalij"
                  : lang === "de"
                    ? "Keine aggressiven Chemikalien"
                    : "Avoid aggressive chemicals"}
              </p>
              <p>
                •{" "}
                {lang === "sl"
                  ? "Varno sušenje z mikrovlakni"
                  : lang === "de"
                    ? "Trocknen mit Mikrofasertuch"
                    : "Safe microfiber drying"}
              </p>
              <p>
                •{" "}
                {lang === "sl"
                  ? "Redno vzdrževanje za maksimalen izgled"
                  : lang === "de"
                    ? "Regelmäßige Pflege für bestes Ergebnis"
                    : "Regular maintenance for best appearance"}
              </p>
            </div>
            <p className="text-gray-500 text-xs mt-6">
              {lang === "sl"
                ? "Podrobna navodila so vključena v garancijski knjižici, ki jo prejme vsaka stranka po zaključku projekta."
                : lang === "de"
                  ? "Detaillierte Pflegehinweise befinden sich im Garantieheft, das jeder Kunde nach Abschluss erhält."
                  : "Detailed instructions are included in the warranty booklet delivered with every completed project."}
            </p>
          </div>
          <div
            className="rounded-3xl overflow-hidden border border-neutral-800"
            data-reveal
          >
            <img
              src={IMG.care}
              className="w-full h-[420px] object-cover"
              alt="Care"
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-reveal>
            <p className="text-xs tracking-[0.35em] text-gray-500 mb-4">
              {t("deliveryKicker")}
            </p>
            <h2 className="text-2xl md:text-3xl tracking-[0.3em] mb-6">
              {t("deliveryTitle")}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t("deliveryText")}
            </p>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                •{" "}
                {lang === "sl"
                  ? "Garancijska knjižica"
                  : lang === "de"
                    ? "Garantieheft"
                    : "Warranty booklet"}
              </p>
              <p>
                •{" "}
                {lang === "sl"
                  ? "Navodila za vzdrževanje"
                  : lang === "de"
                    ? "Pflegeanleitung"
                    : "Care instructions"}
              </p>
              <p>
                •{" "}
                {lang === "sl"
                  ? "Studio certifikat projekta"
                  : lang === "de"
                    ? "Studio Zertifikat"
                    : "Studio certificate"}
              </p>
              <p>
                •{" "}
                {lang === "sl"
                  ? "Priporočila za nadaljnje vzdrževanje"
                  : lang === "de"
                    ? "Empfehlungen zur Pflege"
                    : "Maintenance recommendations"}
              </p>
            </div>
          </div>
          <div
            className="rounded-3xl overflow-hidden border border-neutral-800"
            data-reveal
          >
            <img
              src={IMG.delivery}
              className="w-full h-[420px] object-cover"
              alt="Delivery"
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 border-t border-neutral-900 bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-reveal>
            <p className="text-xs tracking-[0.35em] text-gray-500 mb-4">
              {t("certKicker")}
            </p>
            <h2 className="text-2xl md:text-3xl tracking-[0.3em] mb-6">
              {t("certTitle")}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t("certText")}
            </p>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                •{" "}
                {lang === "sl"
                  ? "Model vozila"
                  : lang === "de"
                    ? "Fahrzeugmodell"
                    : "Vehicle model"}
              </p>
              <p>
                •{" "}
                {lang === "sl"
                  ? "Datum montaže"
                  : lang === "de"
                    ? "Installationsdatum"
                    : "Installation date"}
              </p>
              <p>
                •{" "}
                {lang === "sl"
                  ? "Uporabljena folija"
                  : lang === "de"
                    ? "Verwendete Folie"
                    : "Film used"}
              </p>
              <p>
                •{" "}
                {lang === "sl"
                  ? "Podpis studia"
                  : lang === "de"
                    ? "Studio Unterschrift"
                    : "Studio signature"}
              </p>
            </div>
          </div>
          <div
            className="rounded-3xl overflow-hidden border border-neutral-800"
            data-reveal
          >
            <img
              src={IMG.certificate}
              className="w-full h-[420px] object-cover"
              alt="Certificate"
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTitle
            kicker={t("clientVehiclesKicker")}
            title={t("clientVehiclesTitle")}
            subtitle={t("clientVehiclesSub")}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10" data-reveal>
            {["PORSCHE", "BMW M", "AUDI RS", "AMG"].map((brand, i) => (
              <div
                key={i}
                className="border border-neutral-800 rounded-3xl p-10 bg-black text-lg tracking-[0.2em]"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-reveal>
            <p className="text-xs tracking-[0.35em] text-gray-500 mb-4">
              {t("warrantyKicker")}
            </p>
            <h2 className="text-2xl md:text-3xl tracking-[0.3em] mb-6">
              {t("warrantyTitle")}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t("warrantyText")}
            </p>
            <div className="space-y-3 text-sm text-gray-300">
              <p>• 5–10 year manufacturer warranty</p>
              <p>• Self-healing top coat technology</p>
              <p>• UV and stain resistance</p>
              <p>• Paint preservation & resale value</p>
            </div>
          </div>
          <div
            className="rounded-3xl overflow-hidden border border-neutral-800"
            data-reveal
          >
            <img
              src={IMG.warranty}
              className="w-full h-[420px] object-cover"
              alt="Warranty"
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 border-t border-neutral-900 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTitle
            kicker={t("trackKicker")}
            title={t("trackTitle")}
            subtitle={t("trackSub")}
          />
          <div className="max-w-4xl mx-auto" data-reveal>
            <img
              src={IMG.track}
              className="rounded-3xl border border-neutral-800"
              alt="Track"
            />
            <p className="text-gray-400 text-sm mt-6 leading-relaxed">
              {t("trackText")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTitle
            kicker={t("testimonialsKicker")}
            title={t("testimonialsTitle")}
            subtitle={t("testimonialsSub")}
          />
          <div className="grid md:grid-cols-3 gap-8" data-reveal>
            {[
              [
                "Porsche 911 Owner",
                "Installation quality and attention to detail were on another level.",
              ],
              [
                "BMW M4 Owner",
                "The design preview made the decision incredibly easy.",
              ],
              [
                "Audi RS6 Owner",
                "This is not a wrap shop. It's a true automotive studio.",
              ],
            ].map(([name, quote], i) => (
              <Card key={i}>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  &quot;{quote}&quot;
                </p>
                <p className="text-xs tracking-[0.25em] text-gray-500">{name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="booking"
        className="py-20 md:py-32 px-6 border-t border-neutral-900"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            kicker={t("applyKicker")}
            title={t("bookingTitle")}
            subtitle={t("bookingSub")}
          />
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <form className="max-w-xl w-full mx-auto space-y-5" data-reveal>
              <input
                placeholder={t("vehiclePh")}
                className="w-full p-4 bg-neutral-950 border border-neutral-800 rounded-xl"
              />
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full p-4 bg-neutral-950 border border-neutral-800 rounded-xl"
              >
                <option value="">{t("opt0")}</option>
                <option>{t("opt1")}</option>
                <option>{t("opt2")}</option>
                <option>{t("opt3")}</option>
                <option>{t("opt4")}</option>
                <option>{t("opt5")}</option>
                <option>{t("opt6")}</option>
              </select>
              <input
                placeholder={t("emailPh")}
                className="w-full p-4 bg-neutral-950 border border-neutral-800 rounded-xl"
              />
              <button className="w-full py-4 border border-white rounded-full hover:bg-white hover:text-black transition">
                {t("submit")}
              </button>
              <p className="text-gray-600 text-xs text-center">{t("response")}</p>
            </form>

            <div data-reveal className="max-w-xl w-full mx-auto">
              <Card>
                <p className="text-[10px] tracking-[0.35em] text-gray-500 mb-4">
                  {t("quickContact")}
                </p>
                <p className="text-gray-400 text-sm mb-6">{t("qcSub")}</p>
                <div className="space-y-3">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center justify-between border border-neutral-800 rounded-2xl px-5 py-4 hover:border-white transition"
                  >
                    <span>{t("qc1")}</span>
                    <span className="text-gray-400 text-sm">{CONTACT.email}</span>
                  </a>
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between border border-neutral-800 rounded-2xl px-5 py-4 hover:border-white transition"
                  >
                    <span>{t("qc2")}</span>
                    <span className="text-gray-400 text-sm">
                      @midnightautostudio
                    </span>
                  </a>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between border border-neutral-800 rounded-2xl px-5 py-4 hover:border-white transition"
                  >
                    <span>{t("qc3")}</span>
                    <span className="text-gray-400 text-sm">+386 40 111 222</span>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-10 text-gray-600 text-xs border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 space-y-3">
          <p>{t("footer")}</p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500">
            <a
              href={`mailto:${CONTACT.email}`}
              className="hover:text-white transition"
            >
              {CONTACT.email}
            </a>
            <span>•</span>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              Instagram
            </a>
            <span>•</span>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {showStickyCta ? (
        <div className="fixed bottom-4 left-0 right-0 z-[80] px-4 md:hidden pointer-events-none">
          <a
            href="#booking"
            className="block w-full text-center bg-white text-black py-4 rounded-full font-medium pointer-events-auto shadow-2xl"
          >
            {t("sticky")}
          </a>
          <div className="mt-3 flex items-center justify-center gap-2 pointer-events-auto">
            {(
              [
                ["sl", "SI"],
                ["en", "EN"],
                ["de", "DE"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => setLang(k)}
                className={
                  "px-3 py-2 rounded-full text-[10px] tracking-[0.25em] border transition " +
                  (lang === k
                    ? "bg-white text-black border-white"
                    : "border-neutral-800 text-gray-200")
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}
