import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, TrendingUp, Target, Clock } from "lucide-react";

interface AgentActivityCardProps {
  type: 'activation' | 'backtest';
  data?: {
    budget?: number;
    riskLevel?: number;
    wins?: number;
    totalSpend?: number;
    avgProfitMargin?: number;
    winRate?: number;
    auctionsAnalyzed?: number;
    period?: string;
  };
}

const AgentActivityCard = ({ type, data }: AgentActivityCardProps) => {
  if (type === 'activation') {
    return (
      <Card className="shadow-card bg-accent/10 border-accent/30 animate-in fade-in-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <CardTitle className="text-lg">AI Agent Activated</CardTitle>
          </div>
          <CardDescription>Monitoring Doma Protocol auctions in real-time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-card">
              <div className="text-sm text-muted-foreground">Budget</div>
              <div className="text-xl font-bold text-primary">${data?.budget?.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded-lg bg-card">
              <div className="text-sm text-muted-foreground">Risk Level</div>
              <div className="text-xl font-bold text-accent">{data?.riskLevel}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-card">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm">
              Actively monitoring .vic domains on Doma Testnet
            </span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-card">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-sm">
              Agent will auto-bid based on your strategy parameters
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Backtest results
  return (
    <Card className="shadow-card bg-primary/10 border-primary/30 animate-in fade-in-50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Backtest Simulation Complete</CardTitle>
        </div>
        <CardDescription>
          Analyzed {data?.auctionsAnalyzed} real Doma auctions from the past {data?.period}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-card">
            <div className="text-sm text-muted-foreground">Simulated Wins</div>
            <div className="text-2xl font-bold text-accent">{data?.wins}</div>
          </div>
          <div className="p-3 rounded-lg bg-card">
            <div className="text-sm text-muted-foreground">Total Spend</div>
            <div className="text-2xl font-bold text-primary">${data?.totalSpend?.toLocaleString()}</div>
          </div>
          <div className="p-3 rounded-lg bg-card">
            <div className="text-sm text-muted-foreground">Avg Profit</div>
            <div className="text-2xl font-bold text-accent">{data?.avgProfitMargin?.toFixed(1)}%</div>
          </div>
          <div className="p-3 rounded-lg bg-card">
            <div className="text-sm text-muted-foreground">Win Rate</div>
            <div className="text-2xl font-bold text-primary">{data?.winRate}%</div>
          </div>
        </div>
        
        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
          <div className="flex items-start gap-2">
            <Badge className="bg-accent/20 text-accent border-accent/30">Insight</Badge>
            <p className="text-sm text-muted-foreground flex-1">
              Based on historical Doma data, your strategy would have won {data?.wins} auctions 
              with an average {data?.avgProfitMargin?.toFixed(1)}% profit margin.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentActivityCard;
