import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import Navigation from "@/components/Navigation";
import StrategyLab from "@/components/dashboard/StrategyLab";
import ActiveAuctions from "@/components/dashboard/ActiveAuctions";
import PortfolioDeFi from "@/components/dashboard/PortfolioDeFi";
import PerformanceLogs from "@/components/dashboard/PerformanceLogs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  if (!isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Dashboard Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Connected: <span className="text-primary font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse-glow" />
              <span className="text-sm font-medium text-accent">AI Agent Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="strategy" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-4xl mx-auto">
            <TabsTrigger value="strategy">Strategy Lab</TabsTrigger>
            <TabsTrigger value="auctions">Active Auctions</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio & DeFi</TabsTrigger>
            <TabsTrigger value="performance">Performance Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="strategy" className="space-y-6">
            <StrategyLab />
          </TabsContent>

          <TabsContent value="auctions" className="space-y-6">
            <ActiveAuctions />
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <PortfolioDeFi />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceLogs />
          </TabsContent>
        </Tabs>
      </div>

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

export default Dashboard;
