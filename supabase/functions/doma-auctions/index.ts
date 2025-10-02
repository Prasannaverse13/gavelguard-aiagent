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
    const { action } = await req.json();

    console.log('Doma API request:', action);

    // Fetch active auctions from Doma Protocol
    if (action === 'getAuctions') {
      const graphqlQuery = {
        query: `
          query GetAuctions {
            auctions(first: 10, orderBy: endTime, orderDirection: desc, where: { active: true }) {
              id
              domain
              currentBid
              endTime
              seller
              active
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
      console.log('Doma auctions data:', data);

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch domain valuation data
    if (action === 'getDomainValue') {
      const { domain } = await req.json();
      
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
      const { days } = await req.json();
      const startTime = Math.floor(Date.now() / 1000) - (days * 24 * 60 * 60);

      const graphqlQuery = {
        query: `
          query GetHistoricalAuctions($startTime: Int!) {
            auctions(first: 100, orderBy: endTime, orderDirection: desc, where: { endTime_gt: $startTime }) {
              id
              domain
              currentBid
              finalBid
              endTime
              seller
              winner
              active
            }
          }
        `,
        variables: {
          startTime
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
      console.log('Historical auctions data:', data);

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch user's portfolio
    if (action === 'getUserDomains') {
      const { address } = await req.json();

      const graphqlQuery = {
        query: `
          query GetUserDomains($owner: String!) {
            domains(where: { owner: $owner }) {
              id
              name
              owner
              purchasePrice
              tokenId
              createdAt
            }
          }
        `,
        variables: {
          owner: address.toLowerCase()
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
      console.log('User domains data:', data);

      return new Response(
        JSON.stringify(data),
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
