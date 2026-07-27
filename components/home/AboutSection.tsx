export default function AboutSection() {
  return (
    <section id="about" className="w-full flex flex-col py-16 md:py-24 items-center justify-center text-center">
      <div className="max-w-4xl w-full px-6 md:px-12 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#362a22] font-bold mb-4">
          എന്നെക്കുറിച്ച്
        </h2>
        <div className="w-16 h-1 bg-[#362a22]/30 rounded-full mb-10 md:mb-12"></div>

        <div className="w-full max-w-3xl bg-[#362a22]/[0.03] border border-[#362a22]/10 rounded-3xl p-8 sm:p-12 md:p-16 shadow-sm flex flex-col gap-8 md:gap-10 text-left font-serif text-[#362a22] text-lg sm:text-xl md:text-2xl leading-relaxed relative overflow-hidden">
          {/* Decorative quote icon */}
          <div className="absolute -top-6 -right-6 text-[#362a22] opacity-[0.04] pointer-events-none select-none">
            <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11 9c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm10 0c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4z" />
            </svg>
          </div>

          <p className="relative z-10 text-[#5a483a] italic">
            ചരിത്രം ഉറങ്ങാതിരിക്കുന്ന സ്വാതന്ത്ര്യത്തിന്റെ ചോരപ്പാടുകളുള്ള എന്റെ നാട്...
            <br />
            മോങ്ങം:...
            <br />
            അതിനെ ഞാൻ എന്റെ പേരിനോട് ചേർക്കുന്നു.
          </p>

          <p className="relative z-10">
            ജീവിതം ഒരു യാത്രയാണ്.
            <br />
            നിഴലും നിലാവും മഴയും മേഘവും
            <br />
            കണ്ണീരും പുഞ്ചിരിയും എല്ലാം ഇടകലർന്ന....
            <br />
            യാത്രയെന്ന മഹാപ്രവാഹത്തിൽ കണ്ടുമുട്ടിയ മുഖങ്ങൾ,
            <br />
            കാണാതെ പോയ സത്യങ്ങൾ
            <br />
            എല്ലാം സ്വാധീനിച്ചിട്ടുണ്ടാവാം.
            <br />
            ഓർമ്മിച്ച് തിരിച്ചെടുക്കുമ്പോൾ
            <br />
            ചിതറിയ വളപ്പൊട്ടുകൾ പോലെ.
            <br />
            പെറുക്കിയെടുക്കുമ്പോൾ ആകാരം രൂപപ്പെട്ടേക്കാം.
            <br />
            പക്ഷേ ഉള്ളുറപ്പ്...?
            <br />
            ചിതറിയ എന്റെ ചിന്തകൾ പോലെ വ്യതിരിക്തം.
          </p>

          <p className="relative z-10">
            എഴുത്തിനൊപ്പം
            <br />
            കൂടെയുണ്ടായിരുന്നവർ...
            <br />
            എന്റെ കൂട്ടുകാർ...
            <br />
            അനാഥത്വം തോന്നിപ്പിക്കാതെ
            <br />
            എന്നെ പരിഗണിച്ചറിഞ്ഞ പിതൃസഹോദരന്മാർ,
            <br />
            ഇന്നും തണലായ് കൂടെയുള്ള ഉമ്മയും സഹോദരിമാരും.
            <br />
            എല്ലാം അനുഗ്രഹം മാത്രം.
            <br />
            സൗഭാഗ്യവും.
          </p>

          <p className="relative z-10">
            വായനയിൽ നിന്ന് ഇടയ്ക്കെപ്പോഴോതിരിഞ്ഞ എഴുത്ത്...
            <br />
            അതിനെ എന്നാലാവും വിധം മനോഹരമാക്കി അവതരിപ്പിക്കുകയാണ്.
            <br />
            പരിഗണനയ്ക്കായി...
            <br />
            കൂട്ടത്തിലൊന്നു കൂടി...
            <br />
            എഴുതിയതിനേക്കാൾ എഴുതിച്ചുരുട്ടി പുഴയിലെറിഞ്ഞ കടലാസുചുരുളുകളെ മറക്കാനാവില്ല.
            <br />
            എന്റെ അക്ഷരച്ചുരുളുകളുമായി
            <br />
            നൂറാടിപ്പുഴ ഇപ്പോഴും ഒഴുകുന്നുണ്ടിവിടെ...
            <br />
            എന്നെ സ്നേഹിക്കുന്നവരെ തഴുകിപ്പുണർന്ന്
            <br />
            ഒരു പ്രവാഹമായി....
          </p>

          <div className="pt-2 sm:pt-4 flex justify-end relative z-10">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#362a22] italic tracking-wide">
              സലീഖ് പി മോങ്ങം
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
