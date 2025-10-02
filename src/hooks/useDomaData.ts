import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

interface Auction {
  id: string;
  domain: string;
  currentBid: number;
  fmv: number;
  timeLeft: string;
  status: string;
  potentialProfit: number;
}

interface UserDomain {
  id: string;
  domain: string;
  purchasePrice: number;
  currentValue: number;
  collateralScore: number;
  profit: number;
  profitPercent: number;
}

export const useDomaAuctions = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.functions.invoke('doma-auctions', {
          body: { action: 'getAuctions' }
        });

        if (error) throw error;

        // Transform Doma data to our format
        const transformedAuctions = data?.data?.auctions?.map((auction: any) => ({
          id: auction.id,
          domain: auction.domain,
          currentBid: parseInt(auction.currentBid) / 1e6, // Convert from USDC wei
          fmv: (parseInt(auction.currentBid) / 1e6) * 1.3, // Simple FMV calculation
          timeLeft: calculateTimeLeft(auction.endTime),
          status: auction.active ? "Active Bid" : "Monitoring",
          potentialProfit: (parseInt(auction.currentBid) / 1e6) * 0.3,
        })) || [];

        setAuctions(transformedAuctions);
        setError(null);
      } catch (err) {
        console.error('Error fetching auctions:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch auctions');
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
    const interval = setInterval(fetchAuctions, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { auctions, loading, error };
};

export const useDomaUserDomains = (address?: string) => {
  const [domains, setDomains] = useState<UserDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) {
      setDomains([]);
      setLoading(false);
      return;
    }

    const fetchUserDomains = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.functions.invoke('doma-auctions', {
          body: { action: 'getUserDomains', address }
        });

        if (error) throw error;

        // Transform Doma data to our format
        const transformedDomains = data?.data?.domains?.map((domain: any) => {
          const purchasePrice = parseInt(domain.purchasePrice || '0') / 1e6;
          const currentValue = purchasePrice * 1.35; // Estimated appreciation
          const profit = currentValue - purchasePrice;
          
          return {
            id: domain.id,
            domain: domain.name,
            purchasePrice,
            currentValue,
            collateralScore: calculateCollateralScore(domain),
            profit,
            profitPercent: (profit / purchasePrice) * 100,
          };
        }) || [];

        setDomains(transformedDomains);
        setError(null);
      } catch (err) {
        console.error('Error fetching user domains:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch domains');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDomains();
  }, [address]);

  return { domains, loading, error };
};

export const useDomaHistoricalData = (days: number) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistoricalData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('doma-auctions', {
        body: { action: 'getHistoricalAuctions', days }
      });

      if (error) throw error;

      setData(data?.data?.auctions || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching historical data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch historical data');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchHistoricalData };
};

// Helper functions
const calculateTimeLeft = (endTime: string): string => {
  const end = parseInt(endTime) * 1000;
  const now = Date.now();
  const diff = end - now;

  if (diff <= 0) return "Ended";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};

const calculateCollateralScore = (domain: any): number => {
  // Simple scoring based on domain length and age
  const lengthScore = Math.max(0, 100 - (domain.name.length * 5));
  const ageScore = domain.createdAt ? Math.min(50, (Date.now() - parseInt(domain.createdAt) * 1000) / (1000 * 60 * 60 * 24 * 30)) : 0;
  
  return Math.min(100, Math.round(lengthScore * 0.6 + ageScore * 0.4));
};
