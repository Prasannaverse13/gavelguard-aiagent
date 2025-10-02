import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle } from "lucide-react";

interface WatchlistConfirmationProps {
  domain: string;
}

const WatchlistConfirmation = ({ domain }: WatchlistConfirmationProps) => {
  return (
    <Card className="shadow-card bg-gradient-to-br from-primary/5 to-accent/5 border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <CardTitle className="text-lg">Watchlist Active</CardTitle>
          <Badge className="ml-auto bg-accent/20 text-accent border-accent/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Monitoring
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-bold text-primary">{domain}</span> is now being tracked by your AI agent.
          </p>
          <p className="text-xs text-muted-foreground">
            You'll receive notifications when auction activity is detected. The AI will automatically bid based on your configured strategy parameters.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WatchlistConfirmation;
