import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full flex flex-col py-16 md:py-24 items-center justify-center text-center">
      <div className="max-w-3xl px-6 md:px-12 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#362a22] font-bold mb-4">
          ബന്ധപ്പെടുക
        </h2>
        <div className="w-16 h-1 bg-[#362a22]/30 rounded-full mb-8"></div>
        <p className="text-lg sm:text-xl text-[#5a483a] leading-relaxed font-serif italic mb-10 max-w-lg">
          നിങ്ങളുടെ ചിന്തകളും അഭിപ്രായങ്ങളും എന്നെ അറിയിക്കുക. എനിക്ക് എഴുതാം, സംസാരിക്കാം.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md">
          <a href="mailto:hello@example.com" className="w-full sm:w-auto px-8 py-3.5 bg-[#362a22] text-[#e2d1bf] font-bold rounded-full hover:bg-[#4a3b32] transition-colors duration-300 shadow-md whitespace-nowrap">
            ഇമെയിൽ അയക്കുക
          </a>
          <div className="flex gap-4 items-center mt-2 sm:mt-0">
            <a href="https://www.instagram.com/saleeq_rahman?igsh=ajk3NGVya2JuZ2Vy&utm_source=qr" aria-label="Instagram" className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-[#362a22]/80 text-[#362a22] hover:bg-[#362a22] hover:text-[#e2d1bf] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.facebook.com/saleeq.mongam?mibextid=wwXIfr" aria-label="Facebook" className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-[#362a22]/80 text-[#362a22] hover:bg-[#362a22] hover:text-[#e2d1bf] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
