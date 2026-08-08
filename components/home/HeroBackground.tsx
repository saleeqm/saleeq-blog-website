export default function HeroBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-hidden">
      <div 
        className="text-[40vw] leading-none font-display text-[var(--color-sand-light)] opacity-60 select-none"
        style={{
          transform: 'translate(10%, -5%)',
        }}
      >
        അ
      </div>
    </div>
  );
}
