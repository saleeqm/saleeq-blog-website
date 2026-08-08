import Header from "@/components/layout/Header";
import HeroBackground from "@/components/home/HeroBackground";
import PostsSection from "@/components/home/PostsSection";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative w-full flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full flex flex-col-reverse md:block items-center justify-end md:justify-start overflow-hidden pt-32 pb-0 md:py-0 min-h-screen">
        
        {/* Hero Visuals */}
        <div className="relative md:absolute md:right-0 md:top-0 w-full md:w-1/2 h-[50vh] sm:h-[60vh] md:h-screen z-10 flex flex-col items-center justify-end md:justify-center mx-auto pointer-events-none overflow-hidden">
          <HeroBackground />
          <Image
            src="/hero2.png"
            alt="Hero"
            fill
            sizes="100vw"
            className="object-contain object-bottom drop-shadow-2xl translate-y-4 md:translate-y-16"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-sand)] to-transparent z-20 pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-start md:justify-center h-auto md:h-screen text-center md:text-left pt-4 md:pt-0 pb-12 md:pb-0">
          <div className="max-w-md sm:max-w-xl md:max-w-2xl flex flex-col items-center md:items-start mx-auto md:mx-0">
            <h2 className="text-sm md:text-base font-body uppercase tracking-widest text-[var(--color-ink-light)] mb-3 md:mb-6">
              Mongatthukaran&apos;s Journal
            </h2>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display text-[var(--color-ink)] font-bold leading-[1.1] mb-5 md:mb-8">
              എന്റെ <br className="hidden sm:block" />
              അക്ഷരലോകം
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-ink-light)] mb-8 md:mb-12 leading-relaxed max-w-lg">
              ജീവിതം, സംസ്കാരം, ഒപ്പം എന്റെ ചിന്തകളും അനുഭവങ്ങളും നിങ്ങളുമായി പങ്കുവെക്കുന്നു.
            </p>
            <a href="#latest-posts" className="inline-block px-6 md:px-8 py-3 md:py-4 bg-[var(--color-ink)] text-[var(--color-sand)] hover:bg-[var(--color-laterite)] transition-colors duration-300 shadow-sm text-base md:text-lg font-medium tracking-wide">
              അക്ഷരലോകത്തേക്ക് സ്വാഗതം
            </a>
          </div>
        </div>
      </section>

      {/* Main content container */}
      <section className="relative z-10 w-full px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto flex flex-col items-center pb-24">
        <AboutSection />
        <div className="w-full h-px bg-[var(--color-ink)]/10 my-8"></div>
        <PostsSection />
        <div className="w-full h-px bg-[var(--color-ink)]/10 my-8"></div>
        <ContactSection />
      </section>
    </main>
  );
}
