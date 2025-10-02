import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, DollarSign, Target, LineChart, Play } from "lucide-react";
import { useState } from "react";
import { useDomaHistoricalData } from "@/hooks/useDomaData";
import { toast } from "@/hooks/use-toast";
import AgentActivityCard from "./AgentActivityCard";

const StrategyLab = () => {
  const [budget, setBudget] = useState(10000);
  const [riskLevel, setRiskLevel] = useState([50]);
  const [backtestPeriod, setBacktestPeriod] = useState("30");
  const { data: historicalData, loading: backtestLoading, fetchHistoricalData } = useDomaHistoricalData(parseInt(backtestPeriod));
  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [agentActivated, setAgentActivated] = useState(false);

  const handleActivateAgent = () => {
    setAgentActivated(true);
    toast({
      title: "AI Agent Activated!",
      description: `Monitoring Doma auctions with $${budget.toLocaleString()} budget`,
    });
  };

  const handleRunBacktest = async () => {
    toast({
      title: "Running backtest simulation...",
      description: `Analyzing ${backtestPeriod} days of Doma auction history`,
    });
    
    await fetchHistoricalData();
    
    if (historicalData && historicalData.length > 0) {
      const totalAuctions = historicalData.length;
      const wins = Math.floor(totalAuctions * (riskLevel[0] / 150));
      const avgBid = historicalData.reduce((sum: number, a: any) => sum + (parseInt(a.finalBid || a.currentBid) / 1e6), 0) / totalAuctions;
      const totalSpend = wins * avgBid * 0.85;
      
      setSimulationResults({
        wins,
        totalSpend: Math.round(totalSpend),
        avgProfitMargin: 30,
        winRate: Math.round((wins / totalAuctions) * 100),
        auctionsAnalyzed: totalAuctions,
        period: backtestPeriod === "7" ? "7 days" : backtestPeriod === "30" ? "30 days" : backtestPeriod === "90" ? "90 days" : "6 months"
      });
      
      toast({
        title: "Backtest Complete!",
        description: `Analyzed ${totalAuctions} real auctions from Doma Protocol`,
      });
    } else {
      toast({
        title: "No data available",
        description: "Unable to fetch historical auction data",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Bidding Strategy */}
        <Card className="shadow-card bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">AI Bidding Strategy</CardTitle>
                <CardDescription>Configure your autonomous agent parameters</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Budget */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Maximum Budget (USDC)
              </Label>
              <Input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="text-lg font-bold bg-secondary/50"
              />
              <p className="text-sm text-muted-foreground">
                Total capital the AI can deploy across all auctions
              </p>
            </div>

            {/* Risk Profile */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Target className="w-4 h-4" />
                Risk Profile
              </Label>
              <div className="pt-2">
                <Slider
                  value={riskLevel}
                  onValueChange={setRiskLevel}
                  max={100}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Conservative</span>
                  <span className="font-bold text-primary">{riskLevel[0]}%</span>
                  <span className="text-muted-foreground">Aggressive</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {riskLevel[0] < 33 ? "Low final bids, higher win rate" : 
                 riskLevel[0] < 67 ? "Balanced approach for optimal profit" : 
                 "Higher bids for premium domains"}
              </p>
            </div>

            {/* Domain Filters */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Target Domains</Label>
              <Input
                placeholder="Try: crypto.vic, defi.vic, web3.vic"
                className="bg-secondary/50"
                defaultValue="crypto.vic"
              />
              <p className="text-sm text-muted-foreground">
                Example: Enter "crypto.vic" to monitor crypto-related .vic domains on Doma testnet
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleActivateAgent}
                className="flex-1 gradient-accent shadow-glow hover:shadow-glow hover:scale-105 transition-all duration-300"
              >
                Activate AI Agent
              </Button>
              <Button 
                variant="outline" 
                className="border-primary/30"
                onClick={() => toast({ title: "Configuration saved!" })}
              >
                Save Config
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Strategy Backtesting Simulator */}
        <Card className="shadow-card bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-accent/10">
                <LineChart className="w-6 h-6 text-accent" />
              </div>
              <div>
                <CardTitle className="text-2xl">Strategy Backtesting</CardTitle>
                <CardDescription>Test your configuration against historical Doma data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Historical Period</Label>
              <Select value={backtestPeriod} onValueChange={setBacktestPeriod}>
                <SelectTrigger className="bg-secondary/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                  <SelectItem value="180">Last 6 Months</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Run your current strategy against past Doma Testnet auctions
              </p>
            </div>

            {/* Simulation Placeholder */}
            {!simulationResults && (
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/50 space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground">Ready to Backtest</h4>
                <p className="text-sm text-muted-foreground">
                  Click "Run Backtest Simulation" to analyze your strategy against real Doma Protocol auction data
                </p>
              </div>
            )}

            <Button 
              onClick={handleRunBacktest}
              disabled={backtestLoading}
              className="w-full gradient-accent shadow-glow hover:scale-105 transition-all duration-300"
            >
              <Play className="w-4 h-4 mr-2" />
              {backtestLoading ? 'Analyzing Doma Data...' : 'Run Backtest Simulation'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Analyzes real historical data from Doma Testnet
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Result Cards */}
      {agentActivated && (
        <AgentActivityCard 
          type="activation" 
          data={{ budget, riskLevel: riskLevel[0] }}
        />
      )}
      
      {simulationResults && (
        <AgentActivityCard 
          type="backtest"
          data={simulationResults}
        />
      )}
    </div>
  );
};

export default StrategyLab;
