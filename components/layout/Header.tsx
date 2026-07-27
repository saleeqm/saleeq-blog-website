import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});

export default function Header() {
  return (
    <div className="absolute top-8 left-8 md:top-12 md:left-16 flex items-center z-20 text-[#2a2a2a]">
      <h1 className={`${greatVibes.className} text-5xl md:text-6xl tracking-wide`}>Mongatthukaran</h1>
    </div>
  );
}
