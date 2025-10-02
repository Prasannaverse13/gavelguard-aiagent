import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wallet, TrendingUp, Shield, Coins } from "lucide-react";

const mockDomains = [
  {
    id: 1,
    domain: "ai.vic",
    purchasePrice: 4200,
    currentValue: 5800,
    collateralScore: 92,
    profit: 1600,
    profitPercent: 38.1,
  },
  {
    id: 2,
    domain: "meta.vic",
    purchasePrice: 3800,
    currentValue: 4900,
    collateralScore: 85,
    profit: 1100,
    profitPercent: 28.9,
  },
  {
    id: 3,
    domain: "blockchain.vic",
    purchasePrice: 6100,
    currentValue: 8200,
    collateralScore: 96,
    profit: 2100,
    profitPercent: 34.4,
  },
];

const PortfolioDeFi = () => {
  const totalInvested = mockDomains.reduce((sum, d) => sum + d.purchasePrice, 0);
  const totalValue = mockDomains.reduce((sum, d) => sum + d.currentValue, 0);
  const totalProfit = totalValue - totalInvested;
  const avgProfitPercent = (totalProfit / totalInvested) * 100;

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardDescription>Total Invested</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-muted-foreground" />
              <span className="text-3xl font-bold">${totalInvested.toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Across {mockDomains.length} domains</p>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardDescription>Current Portfolio Value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-primary" />
              <span className="text-3xl font-bold text-primary">${totalValue.toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">AI-adjusted valuation</p>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardDescription>Total Profit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-3xl font-bold text-accent">+${totalProfit.toLocaleString()}</span>
            </div>
            <p className="text-sm text-accent mt-2">+{avgProfitPercent.toFixed(1)}% average return</p>
          </CardContent>
        </Card>
      </div>

      {/* Won Domains with Collateralization Scores */}
      <Card className="shadow-card bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Portfolio & DeFi Utility</CardTitle>
              <CardDescription>Won domains with collateralization scores</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockDomains.map((domain) => (
            <DomainCard key={domain.id} {...domain} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const DomainCard = ({
  domain,
  purchasePrice,
  currentValue,
  collateralScore,
  profit,
  profitPercent,
}: {
  domain: string;
  purchasePrice: number;
  currentValue: number;
  collateralScore: number;
  profit: number;
  profitPercent: number;
}) => (
  <div className="p-4 rounded-lg bg-secondary/30 border border-border/50 space-y-3">
    <div className="flex items-start justify-between">
      <div>
        <h4 className="font-bold text-lg">{domain}</h4>
        <p className="text-sm text-muted-foreground">
          Purchased: ${purchasePrice.toLocaleString()} → Current: ${currentValue.toLocaleString()}
        </p>
      </div>
      <Badge className="bg-accent/20 text-accent border-accent/30">
        +{profitPercent.toFixed(1)}%
      </Badge>
    </div>

    {/* Collateralization Score - NEW FEATURE */}
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          Domain Collateralization Score
        </span>
        <span className="font-bold text-primary">{collateralScore}/100</span>
      </div>
      <Progress value={collateralScore} className="h-2" />
      <p className="text-xs text-muted-foreground">
        AI-adjusted score estimating this domain's value as DeFi collateral based on Doma valuation data
      </p>
    </div>

    <div className="flex justify-between text-sm pt-2 border-t border-border/50">
      <span className="text-muted-foreground">Realized Profit</span>
      <span className="font-bold text-accent">+${profit.toLocaleString()}</span>
    </div>
  </div>
);

export default PortfolioDeFi;
