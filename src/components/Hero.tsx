import { Button } from "@/components/ui/button";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Sparkles, Target, TrendingUp, Shield } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 gradient-glow opacity-50 blur-3xl" />
      
      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo/Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-medium text-primary">AI-Powered DomainFi</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold max-w-4xl">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Secure Premium Domains
            </span>
            <br />
            <span className="text-primary">
              At Optimal Prices
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
            GavelGuard AI uses reinforcement learning to bid intelligently on Doma auctions, 
            maximizing your profit margins while securing valuable domains.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <ConnectButton.Custom>
              {({ account, chain, openConnectModal, mounted }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <Button
                        onClick={() => {
                          if (connected) {
                            window.location.href = '/dashboard';
                          } else {
                            openConnectModal();
                          }
                        }}
                        size="lg"
                        className="gradient-accent shadow-glow hover:shadow-glow hover:scale-105 transition-all duration-300 text-lg px-8"
                      >
                        {connected ? 'Go to Dashboard' : 'Connect Wallet to Start'}
                      </Button>
                      
                      {connected && (
                        <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent/10 border border-accent/30 animate-pulse-glow">
                          <div className="w-2 h-2 bg-accent rounded-full" />
                          <span className="text-sm font-semibold text-accent">
                            All features unlocked! Visit Dashboard →
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }}
            </ConnectButton.Custom>
            <Button variant="outline" size="lg" className="border-primary/30 text-lg px-8">
              Learn More
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full max-w-3xl">
            <FeaturePill icon={Target} title="Smart Bidding" description="RL-powered strategy" />
            <FeaturePill icon={TrendingUp} title="FMV Oracle" description="AI valuation model" />
            <FeaturePill icon={Shield} title="Secure Vault" description="USDC management" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturePill = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="flex items-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-card hover:border-primary/30 transition-all duration-300">
    <div className="p-2 rounded-lg bg-primary/10">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div className="text-left">
      <div className="font-semibold text-sm">{title}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  </div>
);

export default Hero;
