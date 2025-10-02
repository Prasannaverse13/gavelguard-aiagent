import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Brain, DollarSign, Target } from "lucide-react";
import { useState } from "react";

const StrategyConfig = () => {
  const [budget, setBudget] = useState(10000);
  const [riskLevel, setRiskLevel] = useState([50]);

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto shadow-card bg-card/80 backdrop-blur-sm border-border/50">
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
              placeholder="e.g., .vic domains under 5 characters"
              className="bg-secondary/50"
            />
            <p className="text-sm text-muted-foreground">
              Filter criteria for AI to monitor specific auctions
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1 gradient-accent shadow-glow hover:shadow-glow hover:scale-105 transition-all duration-300">
              Activate AI Agent
            </Button>
            <Button variant="outline" className="border-primary/30">
              Save Config
            </Button>
          </div>

          {/* AI Status */}
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow" />
              <span className="text-sm font-medium text-primary">
                RL Model Ready • Monitoring Doma Testnet
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategyConfig;
