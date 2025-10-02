import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Activity, Clock, TrendingDown } from "lucide-react";

const mockGasData = [
  {
    id: 1,
    date: "2025-10-02 14:32",
    auction: "crypto.vic",
    gasUsed: 0.0042,
    optimal: 0.0038,
    efficiency: 90.5,
  },
  {
    id: 2,
    date: "2025-10-02 12:15",
    auction: "defi.vic",
    gasUsed: 0.0051,
    optimal: 0.0038,
    efficiency: 74.5,
  },
  {
    id: 3,
    date: "2025-10-02 09:48",
    auction: "nft.vic",
    gasUsed: 0.0039,
    optimal: 0.0038,
    efficiency: 97.4,
  },
];

const mockExecutionLogs = [
  {
    id: 1,
    timestamp: "2025-10-02 14:32:18",
    event: "Bid executed on crypto.vic at 5,200 USDC",
    status: "success",
  },
  {
    id: 2,
    timestamp: "2025-10-02 14:30:05",
    event: "FMV recalculated for crypto.vic: $6,800",
    status: "info",
  },
  {
    id: 3,
    timestamp: "2025-10-02 14:28:42",
    event: "New auction detected: web3.vic",
    status: "info",
  },
  {
    id: 4,
    timestamp: "2025-10-02 12:15:33",
    event: "Bid executed on defi.vic at 3,100 USDC",
    status: "success",
  },
  {
    id: 5,
    timestamp: "2025-10-02 09:48:21",
    event: "Bid executed on nft.vic at 4,500 USDC",
    status: "success",
  },
];

const PerformanceLogs = () => {
  const avgEfficiency = mockGasData.reduce((sum, d) => sum + d.efficiency, 0) / mockGasData.length;
  const totalGasSaved = mockGasData.reduce((sum, d) => sum + (d.optimal - d.gasUsed), 0);

  return (
    <div className="space-y-6">
      {/* Gas Optimization Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-card bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardDescription>Average Gas Efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-3xl font-bold text-accent">{avgEfficiency.toFixed(1)}%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Across all Doma transactions</p>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardDescription>Total Gas Saved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-accent" />
              <span className="text-3xl font-bold text-accent">{Math.abs(totalGasSaved).toFixed(4)} ETH</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Optimized transaction timing</p>
          </CardContent>
        </Card>
      </div>

      {/* Gas Cost Optimization Report */}
      <Card className="shadow-card bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Gas Cost Optimization Report</CardTitle>
              <CardDescription>AI efficiency analysis for Doma Testnet transactions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            Analyzing real-time gas efficiency from Doma Testnet transactions
          </p>
          {mockGasData.map((tx) => (
            <div 
              key={tx.id} 
              className="p-4 rounded-lg bg-secondary/30 border border-border/50 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold">{tx.auction}</h4>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <Badge 
                  className={
                    tx.efficiency > 90 
                      ? "bg-accent/20 text-accent border-accent/30" 
                      : "bg-primary/20 text-primary border-primary/30"
                  }
                >
                  {tx.efficiency.toFixed(1)}% Efficient
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Gas Used: </span>
                  <span className="font-bold">{tx.gasUsed.toFixed(4)} ETH</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Optimal: </span>
                  <span className="font-bold text-accent">{tx.optimal.toFixed(4)} ETH</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Real-Time Execution Log */}
      <Card className="shadow-card bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Real-Time Execution Log</CardTitle>
              <CardDescription>Recent AI agent activity on Doma Protocol</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 max-h-96 overflow-y-auto">
          {mockExecutionLogs.map((log) => (
            <div 
              key={log.id} 
              className="p-3 rounded-lg bg-secondary/30 border border-border/50 flex items-center gap-3"
            >
              <div className={`w-2 h-2 rounded-full ${
                log.status === 'success' ? 'bg-accent' : 'bg-primary'
              } animate-pulse-glow`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{log.event}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Clock className="w-3 h-3" />
                  {log.timestamp}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceLogs;
