# Doma Protocol Integration Guide

## Overview
GavelGuard AI is fully integrated with the Doma Protocol Testnet to provide real-time domain auction monitoring, bidding, and portfolio management.

## Doma Testnet Configuration

### Network Details
- **Chain ID:** 97476
- **RPC URL:** https://rpc-testnet.doma.xyz
- **Explorer:** https://explorer-testnet.doma.xyz
- **API Endpoint:** https://api-testnet.doma.xyz
- **GraphQL Endpoint:** https://api-testnet.doma.xyz/graphql

### Adding Doma Testnet to MetaMask
1. Open MetaMask
2. Click Networks dropdown
3. Select "Add Network"
4. Use the network details above

## Features Using Doma Protocol

### 1. Active Auctions (Real-time Data)
**Data Source:** Doma GraphQL API  
**Updates:** Every 30 seconds  
**Endpoint:** `/doma-auctions` edge function with action `getAuctions`

**Example Query:**
```graphql
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
```

**Test It:** 
- Go to Dashboard → Active Auctions
- The system will fetch live auctions from Doma Testnet
- Try adding "blockchain.vic" to your watchlist

### 2. Portfolio & DeFi (User Domains)
**Data Source:** Doma GraphQL API  
**Endpoint:** `/doma-auctions` edge function with action `getUserDomains`

**Example Query:**
```graphql
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
```

**Collateralization Score:** AI-calculated based on:
- Domain length (shorter = higher score)
- Domain age (older = higher score)
- Doma valuation data

**Test It:**
- Connect your wallet on Dashboard
- Navigate to Portfolio & DeFi tab
- Your Doma-owned domains will appear automatically

### 3. Strategy Backtesting (Historical Data)
**Data Source:** Doma GraphQL API  
**Endpoint:** `/doma-auctions` edge function with action `getHistoricalAuctions`

**Example Query:**
```graphql
query GetHistoricalAuctions($startTime: Int!) {
  auctions(first: 100, orderBy: endTime, orderDirection: desc, where: { endTime_gt: $startTime }) {
    id
    domain
    currentBid
    finalBid
    endTime
    winner
  }
}
```

**Test It:**
- Go to Dashboard → Strategy Lab
- Select a time period (7, 30, 90, or 180 days)
- Click "Run Backtest Simulation"
- View simulated wins, spend, and profit margins

### 4. Performance Logs (Gas Optimization)
**Data Source:** Real-time Doma transaction logs from testnet  
**Tracks:** Gas efficiency for all Doma Testnet transactions

**Test It:**
- Go to Dashboard → Performance Logs
- View average gas efficiency and total gas saved
- See real-time execution logs

## Edge Function Architecture

### Doma Auctions Function
**Path:** `supabase/functions/doma-auctions/index.ts`

**Supported Actions:**
1. `getAuctions` - Fetch active auctions
2. `getDomainValue` - Get domain valuation
3. `getHistoricalAuctions` - Fetch historical auction data
4. `getUserDomains` - Get user's domain portfolio

**Example Usage:**
```typescript
import { supabase } from "@/integrations/supabase/client";

// Get active auctions
const { data } = await supabase.functions.invoke('doma-auctions', {
  body: { action: 'getAuctions' }
});

// Get user domains
const { data } = await supabase.functions.invoke('doma-auctions', {
  body: { action: 'getUserDomains', address: '0x...' }
});

// Get historical data
const { data } = await supabase.functions.invoke('doma-auctions', {
  body: { action: 'getHistoricalAuctions', days: 30 }
});
```

## Testing the Integration

### Prerequisites
1. MetaMask installed
2. Doma Testnet added to MetaMask
3. Test ETH for gas fees (get from Doma faucet if available)

### Testing Flow
1. **Homepage**
   - Click "Connect Wallet to Start"
   - Connect with MetaMask
   - Switch to Doma Testnet when prompted
   - Notice the indicator: "All features unlocked! Visit Dashboard →"
   - Click "Go to Dashboard"

2. **Strategy Lab**
   - Enter target domain: "crypto.vic" (example provided)
   - Set budget: $10,000 USDC
   - Adjust risk profile: 50% (balanced)
   - Select backtest period: Last 30 Days
   - Click "Run Backtest Simulation"

3. **Active Auctions**
   - View live auctions from Doma Protocol
   - Try watchlist example: "blockchain.vic"
   - Click "Add to Watchlist"
   - Monitor status updates (every 30 seconds)

4. **Portfolio & DeFi**
   - View your domains from Doma Protocol
   - Check collateralization scores
   - See profit/loss calculations

5. **Performance Logs**
   - View gas optimization metrics
   - Check real-time execution logs
   - Monitor AI agent activity

## Smart Contract Interaction (Future)

### Planned Features
- Direct bidding through Doma auction contracts
- Automated bid execution via AI agent
- USDC approval and spending management
- Domain tokenization status tracking

### Contract Addresses (TBD)
- Auction Manager: `0x...` (to be deployed)
- Domain Registry: `0x...` (from Doma)
- USDC Token: `0x...` (testnet USDC)

## Troubleshooting

### "No auctions found"
- Check you're connected to Doma Testnet (Chain ID: 97476)
- Verify Doma API is accessible
- Check browser console for errors

### "Error loading auctions"
- Ensure edge function is deployed
- Check Supabase function logs
- Verify GraphQL endpoint is responding

### "No domains in portfolio"
- Connect your wallet
- Ensure you own domains on Doma Protocol
- Check wallet address matches domain ownership

## API Rate Limits
- Doma API: No documented rate limits for testnet
- Edge function: Lovable Cloud limits apply
- Refresh interval: 30 seconds for auctions

## Support
For Doma Protocol issues: https://docs.doma.xyz  
For GavelGuard AI issues: Open an issue on GitHub
