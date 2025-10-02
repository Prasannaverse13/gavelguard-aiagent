import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Stats />
      <Features />
      
      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 GavelGuard AI. Powered by Doma Protocol on Testnet.</p>
            <p className="mt-2">Revolutionizing DomainFi with AI-powered bidding strategies.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
