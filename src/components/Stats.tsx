import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Zap, DollarSign } from "lucide-react";

const stats = [
  {
    icon: DollarSign,
    label: "Total Volume",
    value: "$2.4M",
    change: "+28%",
  },
  {
    icon: Users,
    label: "Active Users",
    value: "1,247",
    change: "+15%",
  },
  {
    icon: Zap,
    label: "Auctions Won",
    value: "3,892",
    change: "+42%",
  },
  {
    icon: TrendingUp,
    label: "Avg Profit",
    value: "24.3%",
    change: "+8%",
  },
];

const Stats = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={index}
            className="shadow-card bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300"
          >
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-accent font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Stats;
