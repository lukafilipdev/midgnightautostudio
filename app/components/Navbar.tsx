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
      <div className="mx-auto max-w-6xl px-4 pt-4 pb-2 sm:px-6 sm:py-3 md:py-4">
        <div className="flex items-center justify-between">
          <a
            href="#top"
            className="rounded-sm text-[1rem] font-bold tracking-[0.24em] text-white transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:text-lg"
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
              className="inline-flex min-w-[120px] items-center justify-center rounded-full border border-white bg-white px-4 py-2.5 text-center text-[11px] font-semibold tracking-[0.16em] text-black transition-all duration-200 hover:-translate-y-[1px] hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:min-w-[148px] sm:px-5 sm:py-2.5 sm:text-xs"
            >
              {bookText}
            </a>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-4 sm:hidden">
          {languages.map((item) => {
            const isActive = lang === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setLang(item.key)}
                className={`relative text-[11px] font-semibold tracking-[0.12em] transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/40"
                }`}
                aria-pressed={isActive}
              >
                {item.label}
                <span
                  className={`absolute left-1/2 top-full mt-1 h-[2px] -translate-x-1/2 rounded-full transition-all duration-200 ${
                    isActive ? "w-4 bg-white" : "w-0 bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}