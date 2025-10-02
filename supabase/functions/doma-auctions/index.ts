import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DOMA_GRAPHQL_URL = 'https://api-testnet.doma.xyz/graphql';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    const { action } = requestBody;

    console.log('Doma API request:', action);

    // Fetch active listings (domains for sale) from Doma Protocol
    if (action === 'getAuctions') {
      const graphqlQuery = {
        query: `
          query GetListings {
            listings(take: 10) {
              items {
                id
                name
                networkId
                priceUsd
                createdAt
                status
                tokenId
              }
            }
          }
        `
      };

      const response = await fetch(DOMA_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphqlQuery),
      });

      const data = await response.json();
      console.log('Doma listings data:', JSON.stringify(data));

      if (data.errors) {
        throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
      }

      // Transform to auction format
      const auctions = data.data?.listings?.items?.map((listing: any) => ({
        id: listing.id,
        domain: listing.name,
        currentBid: String(Math.floor((listing.priceUsd || 0) * 1000000)), // Convert USD to USDC wei
        endTime: String(Math.floor(new Date(listing.createdAt).getTime() / 1000) + (7 * 24 * 60 * 60)), // 7 days from creation
        seller: "0x0000...",
        active: listing.status === 'ACTIVE'
      })) || [];

      return new Response(
        JSON.stringify({ data: { auctions } }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch user's domains from Doma Protocol
    if (action === 'getUserDomains') {
      const { address } = requestBody;

      const graphqlQuery = {
        query: `
          query GetUserDomains($addresses: [AddressCAIP10!]) {
            names(take: 50, ownedBy: $addresses) {
              items {
                id
                name
                tokenId
                createdAt
                fractionalized
                listed
                statistics {
                  floorPriceUsd
                  lastSalePriceUsd
                }
              }
            }
          }
        `,
        variables: {
          addresses: [`eip155:97476:${address}`] // CAIP-10 format for Doma Testnet
        }
      };

      const response = await fetch(DOMA_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphqlQuery),
      });

      const data = await response.json();
      console.log('User domains data:', JSON.stringify(data));

      if (data.errors) {
        throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
      }

      // Transform to domain format
      const domains = data.data?.names?.items?.map((name: any) => ({
        id: name.id,
        name: name.name,
        owner: address.toLowerCase(),
        purchasePrice: String(Math.floor((name.statistics?.lastSalePriceUsd || 0) * 1000000)),
        tokenId: name.tokenId,
        createdAt: String(Math.floor(new Date(name.createdAt).getTime() / 1000))
      })) || [];

      return new Response(
        JSON.stringify({ data: { domains } }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch historical data for backtesting
    if (action === 'getHistoricalAuctions') {
      const { days } = requestBody;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const graphqlQuery = {
        query: `
          query GetHistoricalListings($since: DateTime) {
            listings(take: 100, createdSince: $since) {
              items {
                id
                name
                priceUsd
                createdAt
                status
              }
            }
          }
        `,
        variables: {
          since: startDate.toISOString()
        }
      };

      const response = await fetch(DOMA_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphqlQuery),
      });

      const data = await response.json();
      console.log('Historical data:', JSON.stringify(data));

      if (data.errors) {
        throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
      }

      const auctions = data.data?.listings?.items?.map((listing: any) => ({
        id: listing.id,
        domain: listing.name,
        currentBid: String(Math.floor((listing.priceUsd || 0) * 1000000)),
        finalBid: String(Math.floor((listing.priceUsd || 0) * 1100000)), // Simulate 10% increase
        endTime: String(Math.floor(new Date(listing.createdAt).getTime() / 1000)),
        seller: "0x0000...",
        winner: listing.status === 'SOLD' ? "0x1111..." : null,
        active: listing.status === 'ACTIVE'
      })) || [];

      return new Response(
        JSON.stringify({ data: { auctions } }),
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
