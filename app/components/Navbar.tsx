"use client";

type Lang = "sl" | "en" | "de";

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  scrolled: boolean;
  bookText: string;
}

const languages = [
  { key: "sl", label: "SI" },
  { key: "en", label: "EN" },
  { key: "de", label: "DE" },
] as const;

export function Navbar({ lang, setLang, scrolled, bookText }: NavbarProps) {
  const activeIndex = languages.findIndex((item) => item.key === lang);

  return (
    <nav
      className={`fixed top-0 left-0 z-[70] w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:py-4">
        <a
          href="#top"
          className="rounded-sm text-lg font-bold tracking-[0.25em] text-white transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          MIDNIGHT
        </a>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <div className="relative grid grid-cols-3 rounded-full bg-white/10 p-1 backdrop-blur-md">
              <div
                className="absolute top-1 bottom-1 rounded-full bg-white transition-all duration-300 ease-out"
                style={{
                  width: "calc((100% - 8px) / 3)",
                  left: `calc(4px + ${activeIndex} * ((100% - 8px) / 3))`,
                }}
              />

              {languages.map((item) => {
                const isActive = lang === item.key;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setLang(item.key)}
                    className={`relative z-10 min-w-[42px] rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                      isActive ? "text-black" : "text-white/70 hover:text-white"
                    }`}
                    aria-pressed={isActive}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <a
            href="#booking"
            className="inline-flex min-w-[148px] items-center justify-center rounded-full border border-white bg-white px-5 py-2.5 text-center text-xs font-semibold tracking-[0.15em] text-black transition-all duration-200 hover:-translate-y-[1px] hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            {bookText}
          </a>
        </div>
      </div>
    </nav>
  );
}