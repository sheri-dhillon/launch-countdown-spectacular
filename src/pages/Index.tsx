import { Suspense } from "react";
import Scene3D from "@/components/Scene3D";
import CountdownTimer from "@/components/CountdownTimer";
import SocialLinks from "@/components/SocialLinks";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Subtle gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/40 via-transparent to-background/80 pointer-events-none" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
        {/* Logo / Agency */}
        <header className="mb-6 animate-fade-in-up">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.15em] text-gradient-gold">
            INFOBYTES
          </h2>
          <div className="mt-1 h-[2px] w-16 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
        </header>

        {/* Heading */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gradient leading-tight mb-4 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          THE FUTURE
          <br />
          IS LOADING
        </h1>

        {/* Tagline */}
        <p className="text-sm sm:text-base text-muted-foreground max-w-md mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          We're building something extraordinary at the intersection of tech and creativity. Stay tuned.
        </p>

        {/* Countdown */}
        <section className="mb-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }} aria-label="Countdown to launch">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4 font-display font-medium">
            Launching March 1, 2026
          </p>
          <CountdownTimer />
        </section>

        {/* Notify */}
        <div className="mb-10 flex w-full max-w-sm gap-2 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-lg border border-border bg-card/60 backdrop-blur-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors glow-border"
          />
          <button className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground font-display tracking-wider transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--cyber-teal)/0.5)] hover:scale-105">
            Notify Me
          </button>
        </div>

        {/* Social */}
        <footer className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4 font-display font-medium">Follow Us</p>
          <SocialLinks />
        </footer>
      </div>
    </main>
  );
};

export default Index;
