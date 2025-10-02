import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Activity, DollarSign, TrendingUp, Clock, Plus, Pause } from "lucide-react";
import { useDomaAuctions } from "@/hooks/useDomaData";
import { useState } from "react";

const ActiveAuctions = () => {
  const { auctions, loading, error } = useDomaAuctions();
  const [watchlistDomain, setWatchlistDomain] = useState("blockchain.vic");
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="shadow-card bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Active Auctions</CardTitle>
                <CardDescription>Real-time monitoring of Doma Protocol auctions</CardDescription>
              </div>
            </div>
            <Badge className="bg-accent/20 text-accent border-accent/30">
              <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse-glow" />
              Live Monitoring
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Watchlist Sync */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Watchlist Sync & Manual Override</span>
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="Try: blockchain.vic or ai.vic" 
                className="bg-secondary/50"
                value={watchlistDomain}
                onChange={(e) => setWatchlistDomain(e.target.value)}
              />
              <Button variant="outline" className="border-primary/30 whitespace-nowrap">
                Add to Watchlist
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Example: Add "blockchain.vic" to monitor this domain. AI will track and bid based on your strategy.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Status Messages */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading live auctions from Doma Protocol...</p>
        </div>
      )}
      
      {error && (
        <Card className="bg-destructive/10 border-destructive/30">
          <CardContent className="py-6">
            <p className="text-destructive text-center">Error loading auctions: {error}</p>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Make sure you're connected to Doma Testnet
            </p>
          </CardContent>
        </Card>
      )}

      {/* Auction Cards Grid */}
      {!loading && !error && auctions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <AuctionCard key={auction.id} {...auction} />
          ))}
        </div>
      )}

      {!loading && !error && auctions.length === 0 && (
        <Card className="bg-muted/20">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No active auctions found on Doma Protocol</p>
            <p className="text-sm text-muted-foreground mt-2">New auctions will appear here automatically</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const AuctionCard = ({
  domain,
  currentBid,
  fmv,
  timeLeft,
  status,
  potentialProfit,
}: {
  domain: string;
  currentBid: number;
  fmv: number;
  timeLeft: string;
  status: string;
  potentialProfit: number;
}) => (
  <Card className="shadow-card bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <CardTitle className="text-xl font-bold">{domain}</CardTitle>
        <Badge 
          variant={status === "Active Bid" ? "default" : "secondary"}
          className={status === "Active Bid" ? "bg-accent/20 text-accent border-accent/30" : ""}
        >
          {status}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>Ends in {timeLeft}</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Current Bid</span>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="font-bold">{currentBid.toLocaleString()} USDC</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">AI FMV</span>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="font-bold text-primary">{fmv.toLocaleString()} USDC</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-border/50">
          <span className="text-sm font-semibold">Potential Profit</span>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="font-bold text-accent">+${potentialProfit.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button className="flex-1 gradient-accent shadow-glow hover:scale-105 transition-all duration-300">
          AI Auto-Bid
        </Button>
        <Button variant="outline" className="border-primary/30" size="icon">
          <Pause className="w-4 h-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default ActiveAuctions;
