import Header from "@/components/layout/Header";
import HeroBackground from "@/components/home/HeroBackground";
import PostsSection from "@/components/home/PostsSection";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative w-full flex flex-col bg-[#e2d1bf]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full flex flex-col md:block items-center justify-start overflow-hidden pt-28 pb-28 md:py-0 md:min-h-screen">
        
        {/* Hero Visuals (Image + Background Circle) */}
        <div className="relative md:absolute md:-right-[10%] md:top-1/2 md:-translate-y-1/2 w-[80vw] h-[80vw] sm:w-[70vw] sm:h-[70vw] md:w-[85vh] md:h-[85vh] z-10 flex items-end justify-center mx-auto md:mx-0 mb-16 md:mb-0 pointer-events-none">
          {/* Background Circle */}
          <HeroBackground />
          
          {/* Image */}
          <Image
            src="/hero2.png"
            alt="Hero"
            fill
            sizes="100vw"
            className="object-contain object-bottom md:object-center drop-shadow-lg translate-y-12 md:translate-y-24"
            priority
          />
          {/* Mobile bottom fade gradient */}
          <div className="absolute inset-x-0 bottom-[-2px] h-1/4 bg-gradient-to-t from-[#e2d1bf] to-transparent md:hidden z-20 pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col items-center md:items-start justify-start md:justify-center h-auto md:h-screen text-center md:text-left pb-0">
          <div className="max-w-md sm:max-w-xl md:max-w-2xl flex flex-col items-center md:items-start">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#362a22] font-bold leading-tight mb-4 md:mb-6">
              എന്റെ അക്ഷരലോകത്തേക്ക് <br className="hidden sm:block" />
              <span className="italic font-light opacity-90 mt-2 block md:inline md:mt-0">സ്വാഗതം</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#5a483a] mb-4 md:mb-10 leading-relaxed max-w-lg md:max-w-xl px-4 md:px-0">
              ജീവിതം, സംസ്കാരം, ഒപ്പം എന്റെ ചിന്തകളും അനുഭവങ്ങളും നിങ്ങളുമായി പങ്കുവെക്കുന്നു.
            </p>
            <a href="#latest-posts" className="hidden md:inline-block px-8 py-3.5 bg-[#362a22] text-[#e2d1bf] rounded-full hover:bg-[#4a3b32] transition-colors duration-300 shadow-md text-base md:text-lg font-medium tracking-wide">
              പുതിയ ലേഖനങ്ങൾ വായിക്കുക
            </a>
          </div>
        </div>
        {/* Malayalam Quote Banner */}
        <div className="absolute bottom-0 left-0 w-full bg-[#362a22] text-[#e2d1bf] py-5 md:py-6 z-20 shadow-lg flex items-center justify-center">
          <p className="text-lg md:text-xl font-serif italic tracking-wider">
            "ചിന്തകൾക്ക് ചിറകുമുളക്കുമ്പോൾ..."
          </p>
        </div>
      </section>

      {/* Main content container */}
      <section className="relative z-10 w-full px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col items-center pb-24">
        <AboutSection />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#362a22]/10 to-transparent my-8"></div>
        <PostsSection />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#362a22]/10 to-transparent my-8"></div>
        <ContactSection />
      </section>
    </main>
  );
}
