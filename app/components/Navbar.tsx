"use client";

type Lang = "sl" | "en" | "de";

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  scrolled: boolean;
  bookText: string;
}

export function Navbar({ lang, setLang, scrolled, bookText }: NavbarProps) {
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[70] transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* <Logo className="h-8 w-auto" /> */}
        <span className="text-white text-lg font-bold tracking-[0.25em]">MIDNIGHT</span>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center relative bg-neutral-800 rounded-full p-1">
            <div
              className="absolute top-1 bottom-1 bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                width: "calc(33.333% - 2px)",
                left:
                  lang === "sl"
                    ? "4px"
                    : lang === "en"
                      ? "calc(33.333% + 1px)"
                      : "calc(66.666% - 2px)",
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
                  (lang === k ? "text-black" : "text-gray-300 hover:text-white")
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
            {bookText}
          </a>
        </div>
      </div>
    </nav>
  );
}
