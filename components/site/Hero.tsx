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
          className="text-5xl md:text-6xl font-light tracking-[0.2em] text-primary-foreground uppercase mb-2"
          data-editable="primaryForeground"
        >
          RABARANY
        </h1>
        <p 
          className="text-2xl md:text-3xl font-light tracking-[0.15em] text-primary-foreground uppercase mb-8"
          data-editable="primaryForeground"
        >
          LA FIBRE NATURELLE
        </p>
        <a
          href="#"
          className="border border-white text-white px-8 py-3 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-foreground transition-colors"
        >
          VISITEZ LA BOUTIQUE
        </a>
      </div>
    </section>
  );
}
