import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, Zap, DollarSign } from "lucide-react";

const mockAuctions = [
  {
    id: 1,
    domain: "crypto.vic",
    currentBid: 2500,
    fmv: 3200,
    timeLeft: "2h 34m",
    status: "active",
    potentialProfit: 22,
  },
  {
    id: 2,
    domain: "defi.vic",
    currentBid: 1800,
    fmv: 2400,
    timeLeft: "5h 12m",
    status: "monitoring",
    potentialProfit: 33,
  },
  {
    id: 3,
    domain: "nft.vic",
    currentBid: 3100,
    fmv: 3500,
    timeLeft: "1h 05m",
    status: "active",
    potentialProfit: 13,
  },
];

const AuctionDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Active Auctions</h2>
            <p className="text-muted-foreground mt-1">AI-monitored opportunities on Doma Protocol</p>
          </div>
          <Badge variant="outline" className="border-accent text-accent">
            <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse-glow" />
            Live Monitoring
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAuctions.map((auction) => (
            <AuctionCard key={auction.id} {...auction} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AuctionCard = ({ domain, currentBid, fmv, timeLeft, status, potentialProfit }: any) => (
  <Card className="shadow-card hover:shadow-glow transition-all duration-300 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl font-bold">{domain}</CardTitle>
        <Badge 
          variant={status === "active" ? "default" : "secondary"}
          className={status === "active" ? "gradient-accent" : ""}
        >
          {status}
        </Badge>
      </div>
      <CardDescription className="flex items-center gap-2 text-muted-foreground">
        <Clock className="w-4 h-4" />
        {timeLeft} remaining
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Current Bid</div>
          <div className="text-lg font-bold flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            {currentBid.toLocaleString()}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">AI FMV</div>
          <div className="text-lg font-bold flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            {fmv.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
        <div className="flex items-center justify-between">
          <span className="text-sm text-accent font-medium">Potential Profit</span>
          <span className="text-lg font-bold text-accent">+{potentialProfit}%</span>
        </div>
      </div>

      <Button className="w-full gradient-accent shadow-glow hover:shadow-glow hover:scale-105 transition-all duration-300">
        <Zap className="w-4 h-4 mr-2" />
        AI Auto-Bid
      </Button>
    </CardContent>
  </Card>
);

export default AuctionDashboard;
