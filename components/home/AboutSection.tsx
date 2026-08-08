export default function AboutSection() {
  return (
    <section id="about" className="w-full flex flex-col py-16 md:py-24 items-center justify-center text-center">
      <div className="max-w-4xl w-full px-6 md:px-12 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-display text-[var(--color-ink)] font-bold mb-4">
          എന്നെക്കുറിച്ച്
        </h2>
        <div className="w-12 h-1 bg-[var(--color-laterite)] mb-10 md:mb-16"></div>

        <div className="w-full max-w-3xl flex flex-col gap-6 md:gap-8 text-left font-body text-[var(--color-ink-light)] text-lg sm:text-xl md:text-2xl leading-relaxed relative">
          <p className="font-display text-[var(--color-ink)] text-xl sm:text-2xl md:text-3xl leading-snug">
            ചരിത്രം ഉറങ്ങാതിരിക്കുന്ന സ്വാതന്ത്ര്യത്തിന്റെ ചോരപ്പാടുകളുള്ള എന്റെ നാട്... മോങ്ങം. അതിനെ ഞാൻ എന്റെ പേരിനോട് ചേർക്കുന്നു.
          </p>

          <p>
            ജീവിതം ഒരു യാത്രയാണ്. നിഴലും നിലാവും മഴയും മേഘവും കണ്ണീരും പുഞ്ചിരിയും എല്ലാം ഇടകലർന്ന.... യാത്രയെന്ന മഹാപ്രവാഹത്തിൽ കണ്ടുമുട്ടിയ മുഖങ്ങൾ, കാണാതെ പോയ സത്യങ്ങൾ എല്ലാം സ്വാധീനിച്ചിട്ടുണ്ടാവാം.
          </p>
          <p>
            ഓർമ്മിച്ച് തിരിച്ചെടുക്കുമ്പോൾ ചിതറിയ വളപ്പൊട്ടുകൾ പോലെ. പെറുക്കിയെടുക്കുമ്പോൾ ആകാരം രൂപപ്പെട്ടേക്കാം. പക്ഷേ ഉള്ളുറപ്പ്...? ചിതറിയ എന്റെ ചിന്തകൾ പോലെ വ്യതിരിക്തം.
          </p>
          <p>
            എഴുത്തിനൊപ്പം കൂടെയുണ്ടായിരുന്നവർ... എന്റെ കൂട്ടുകാർ... അനാഥത്വം തോന്നിപ്പിക്കാതെ എന്നെ പരിഗണിച്ചറിഞ്ഞ പിതൃസഹോദരന്മാർ, ഇന്നും തണലായ് കൂടെയുള്ള ഉമ്മയും സഹോദരിമാരും. എല്ലാം അനുഗ്രഹം മാത്രം.
          </p>
          <p>
            വായനയിൽ നിന്ന് ഇടയ്ക്കെപ്പോഴോതിരിഞ്ഞ എഴുത്ത്... അതിനെ എന്നാലാവും വിധം മനോഹരമാക്കി അവതരിപ്പിക്കുകയാണ്.
          </p>

          <div className="pt-8 flex justify-end">
            <span className="text-xl sm:text-2xl font-bold font-display text-[var(--color-ink)] tracking-wide">
              സലീഖ് പി മോങ്ങം
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
