import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, LineChart, Lock, Zap, TrendingUp, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Reinforcement Learning",
    description: "Advanced RL algorithms analyze historical auction data to learn optimal bidding patterns for different domain types and auction mechanisms.",
  },
  {
    icon: LineChart,
    title: "FMV Oracle",
    description: "Custom AI valuation model combines Doma oracle data with market sentiment analysis to predict accurate Fair Market Values.",
  },
  {
    icon: Zap,
    title: "Real-Time Execution",
    description: "Lightning-fast event listener monitors Doma Testnet auctions 24/7, executing bids at microsecond precision via smart contracts.",
  },
  {
    icon: Lock,
    title: "Secure Vault",
    description: "USDC capital management with smart contract protection. Only whitelisted Doma auctions can access your approved funds.",
  },
  {
    icon: TrendingUp,
    title: "Profit Maximization",
    description: "AI optimizes bid timing and amount to secure domains below FMV, automatically calculating your potential profit margins.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Configurable risk profiles from conservative to aggressive, with built-in safeguards to prevent overspending on overvalued domains.",
  },
];

const Features = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-primary">
            Revolutionary DomainFi
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Powered by cutting-edge AI and seamlessly integrated with Doma Protocol
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="shadow-card bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glow"
          >
            <CardHeader>
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Features;
