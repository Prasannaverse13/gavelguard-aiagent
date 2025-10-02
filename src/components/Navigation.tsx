import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Gavel } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Gavel className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-foreground">Gavel</span>
              <span className="text-primary">Guard AI</span>
            </span>
          </div>
          
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
