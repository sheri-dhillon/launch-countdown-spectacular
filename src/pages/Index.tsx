import { Suspense } from "react";
import Scene3D from "@/components/Scene3D";
import CountdownTimer from "@/components/CountdownTimer";
import SocialLinks from "@/components/SocialLinks";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
        {/* Agency Name */}
        <header className="mb-8 animate-fade-in">
          <h2 className="font-display text-sm sm:text-base uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Creative Studio
          </h2>
        </header>

        {/* Main Heading */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gradient leading-tight mb-4 animate-fade-in">
          Something
          <br />
          Amazing Is
          <br />
          Coming
        </h1>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-md mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          We're crafting something extraordinary. Stay tuned for our grand launch.
        </p>

        {/* Countdown */}
        <section className="mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }} aria-label="Countdown to launch">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">Launching In</p>
          <CountdownTimer />
        </section>

        {/* Notify Me */}
        <div className="mb-10 flex w-full max-w-sm gap-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-lg border border-border bg-card/60 backdrop-blur-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
          <button className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--neon-pink)/0.5)] hover:scale-105">
            Notify Me
          </button>
        </div>

        {/* Social Links */}
        <footer className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">Follow Us</p>
          <SocialLinks />
        </footer>
      </div>
    </main>
  );
};

export default Index;
