import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DOMA_API_URL = 'https://api-testnet.doma.xyz';
const DOMA_GRAPHQL_URL = 'https://api-testnet.doma.xyz/graphql';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Read body once and store it
    const requestBody = await req.json();
    const { action } = requestBody;

    console.log('Doma API request:', action);

    // Fetch active auctions from Doma Protocol
    if (action === 'getAuctions') {
      // For now, return mock data since we need to determine the correct GraphQL schema
      // TODO: Update with actual Doma GraphQL schema once confirmed
      const mockAuctions = [
        {
          id: "1",
          domain: "crypto.vic",
          currentBid: "5200000000", // 5200 USDC in wei
          endTime: String(Math.floor(Date.now() / 1000) + 9240), // 2h 34m from now
          seller: "0x1234...",
          active: true
        },
        {
          id: "2",
          domain: "defi.vic",
          currentBid: "3100000000", // 3100 USDC
          endTime: String(Math.floor(Date.now() / 1000) + 18720), // 5h 12m from now
          seller: "0x5678...",
          active: true
        },
        {
          id: "3",
          domain: "web3.vic",
          currentBid: "4500000000", // 4500 USDC
          endTime: String(Math.floor(Date.now() / 1000) + 4080), // 1h 8m from now
          seller: "0x9abc...",
          active: true
        }
      ];

      console.log('Returning mock auction data (Doma API integration pending)');

      return new Response(
        JSON.stringify({ data: { auctions: mockAuctions } }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch domain valuation data
    if (action === 'getDomainValue') {
      const { domain } = requestBody;
      
      // Fetch from Doma API
      const response = await fetch(`${DOMA_API_URL}/domains/${domain}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Domain value data:', data);

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch historical auction data for backtesting
    if (action === 'getHistoricalAuctions') {
      const { days } = requestBody;
      const startTime = Math.floor(Date.now() / 1000) - (days * 24 * 60 * 60);

      // Return mock historical data for backtesting
      const mockHistoricalAuctions = Array.from({ length: 50 }, (_, i) => ({
        id: String(i + 1),
        domain: `domain${i + 1}.vic`,
        currentBid: String(Math.floor(Math.random() * 10000 + 1000) * 1000000),
        finalBid: String(Math.floor(Math.random() * 15000 + 1000) * 1000000),
        endTime: String(startTime + (i * 24 * 60 * 60)),
        seller: `0x${Math.random().toString(16).substring(2, 10)}...`,
        winner: Math.random() > 0.3 ? `0x${Math.random().toString(16).substring(2, 10)}...` : null,
        active: false
      }));

      console.log('Returning mock historical data for backtesting');

      return new Response(
        JSON.stringify({ data: { auctions: mockHistoricalAuctions } }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch user's portfolio
    if (action === 'getUserDomains') {
      const { address } = requestBody;

      // Return mock user domains
      const mockDomains = [
        {
          id: "1",
          name: "ai.vic",
          owner: address.toLowerCase(),
          purchasePrice: "4200000000", // 4200 USDC
          tokenId: "1001",
          createdAt: String(Math.floor(Date.now() / 1000) - (90 * 24 * 60 * 60)) // 90 days ago
        },
        {
          id: "2",
          name: "meta.vic",
          owner: address.toLowerCase(),
          purchasePrice: "3800000000", // 3800 USDC
          tokenId: "1002",
          createdAt: String(Math.floor(Date.now() / 1000) - (60 * 24 * 60 * 60)) // 60 days ago
        },
        {
          id: "3",
          name: "blockchain.vic",
          owner: address.toLowerCase(),
          purchasePrice: "6100000000", // 6100 USDC
          tokenId: "1003",
          createdAt: String(Math.floor(Date.now() / 1000) - (120 * 24 * 60 * 60)) // 120 days ago
        }
      ];

      console.log('Returning mock user domains');

      return new Response(
        JSON.stringify({ data: { domains: mockDomains } }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in doma-auctions function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
