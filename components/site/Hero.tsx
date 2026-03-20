export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-[500px] overflow-hidden">
      {/* Background image placeholder — dark textured pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://placehold.co/1920x500/3a3230/3a3230')`,
          backgroundColor: "#3a3230",
        }}
      >
        {/* Overlay pattern to simulate the textured wallpaper look */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `repeating-conic-gradient(#2c2321 0% 25%, transparent 0% 50%)`,
          backgroundSize: "20px 20px",
        }} />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 
          className="font-[family-name:var(--theme-font-heading)] text-5xl md:text-6xl font-light tracking-[0.2em] text-primary-foreground uppercase mb-2"
          data-editable="primaryForeground"
          data-font-category="heading"
        >
          RABARANY
        </h1>
        <p 
          className="font-[family-name:var(--theme-font-heading)] text-2xl md:text-3xl font-light tracking-[0.15em] text-primary-foreground uppercase mb-8"
          data-editable="primaryForeground"
          data-font-category="heading"
        >
          LA FIBRE NATURELLE
        </p>
        <span
          className="cursor-pointer font-[family-name:var(--theme-font-body)] border border-white text-white px-8 py-3 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-foreground transition-colors"
          data-font-category="body"
        >
          VISITEZ LA BOUTIQUE
        </span>
      </div>
    </section>
  );
}
