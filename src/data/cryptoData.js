export const cryptoList = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA', image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
    { id: 'solana', name: 'Solana', symbol: 'SOL', image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
    { id: 'ripple', name: 'Ripple', symbol: 'XRP', image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
    { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', image: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', image: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
    { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', image: 'https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png' },
    { id: 'chainlink', name: 'Chainlink', symbol: 'LINK', image: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png' },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC', image: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png' },
  ];
  
  // Fonction pour générer des prix aléatoires avec une tendance
  const generatePriceData = (basePrice, volatility, trend = 0) => {
    return Array.from({ length: 30 }, (_, i) => {
      const randomChange = (Math.random() - 0.5) * volatility;
      const trendChange = (trend * i) / 30;
      return basePrice * (1 + randomChange + trendChange);
    });
  };
  
  export const cryptoData = {
    bitcoin: {
      current_price: 42000,
      price_change_percentage_24h: 2.5,
      total_volume: 28000000000,
      market_cap: 820000000000,
      price_history: {
        month: generatePriceData(42000, 0.15, 0.1),
        week: generatePriceData(42000, 0.08, 0.05),
        day: generatePriceData(42000, 0.04, 0.02),
        hour: generatePriceData(42000, 0.02, 0.01),
        minute: generatePriceData(42000, 0.01, 0.005)
      }
    },
    ethereum: {
      current_price: 2200,
      price_change_percentage_24h: -1.8,
      total_volume: 15000000000,
      market_cap: 260000000000,
      price_history: {
        month: generatePriceData(2200, 0.18, -0.05),
        week: generatePriceData(2200, 0.1, 0.03),
        day: generatePriceData(2200, 0.05, 0.01),
        hour: generatePriceData(2200, 0.025, 0.005),
        minute: generatePriceData(2200, 0.01, 0.002)
      }
    },
    cardano: {
      current_price: 0.48,
      price_change_percentage_24h: 5.2,
      total_volume: 900000000,
      market_cap: 16000000000,
      price_history: {
        month: generatePriceData(0.48, 0.2, 0.15),
        week: generatePriceData(0.48, 0.12, 0.08),
        day: generatePriceData(0.48, 0.06, 0.03),
        hour: generatePriceData(0.48, 0.03, 0.01),
        minute: generatePriceData(0.48, 0.015, 0.005)
      }
    },
    solana: {
      current_price: 95,
      price_change_percentage_24h: 8.7,
      total_volume: 2500000000,
      market_cap: 40000000000,
      price_history: {
        month: generatePriceData(95, 0.25, 0.2),
        week: generatePriceData(95, 0.15, 0.1),
        day: generatePriceData(95, 0.08, 0.04),
        hour: generatePriceData(95, 0.04, 0.02),
        minute: generatePriceData(95, 0.02, 0.01)
      }
    },
    ripple: {
      current_price: 0.62,
      price_change_percentage_24h: -3.1,
      total_volume: 1800000000,
      market_cap: 32000000000,
      price_history: {
        month: generatePriceData(0.62, 0.16, -0.08),
        week: generatePriceData(0.62, 0.09, -0.04),
        day: generatePriceData(0.62, 0.05, -0.02),
        hour: generatePriceData(0.62, 0.025, -0.01),
        minute: generatePriceData(0.62, 0.01, -0.005)
      }
    },
    polkadot: {
      current_price: 7.2,
      price_change_percentage_24h: 4.3,
      total_volume: 750000000,
      market_cap: 9000000000,
      price_history: {
        month: generatePriceData(7.2, 0.22, 0.12),
        week: generatePriceData(7.2, 0.13, 0.07),
        day: generatePriceData(7.2, 0.07, 0.035),
        hour: generatePriceData(7.2, 0.035, 0.015),
        minute: generatePriceData(7.2, 0.015, 0.008)
      }
    },
    dogecoin: {
      current_price: 0.08,
      price_change_percentage_24h: 12.5,
      total_volume: 1200000000,
      market_cap: 11000000000,
      price_history: {
        month: generatePriceData(0.08, 0.3, 0.25),
        week: generatePriceData(0.08, 0.18, 0.15),
        day: generatePriceData(0.08, 0.1, 0.08),
        hour: generatePriceData(0.08, 0.05, 0.04),
        minute: generatePriceData(0.08, 0.025, 0.02)
      }
    },
    avalanche: {
      current_price: 35,
      price_change_percentage_24h: -2.8,
      total_volume: 650000000,
      market_cap: 12000000000,
      price_history: {
        month: generatePriceData(35, 0.2, -0.1),
        week: generatePriceData(35, 0.12, -0.06),
        day: generatePriceData(35, 0.06, -0.03),
        hour: generatePriceData(35, 0.03, -0.015),
        minute: generatePriceData(35, 0.015, -0.007)
      }
    },
    chainlink: {
      current_price: 14.5,
      price_change_percentage_24h: 6.8,
      total_volume: 800000000,
      market_cap: 15000000000,
      price_history: {
        month: generatePriceData(14.5, 0.19, 0.14),
        week: generatePriceData(14.5, 0.11, 0.08),
        day: generatePriceData(14.5, 0.06, 0.04),
        hour: generatePriceData(14.5, 0.03, 0.02),
        minute: generatePriceData(14.5, 0.015, 0.01)
      }
    },
    polygon: {
      current_price: 0.85,
      price_change_percentage_24h: -1.5,
      total_volume: 450000000,
      market_cap: 8000000000,
      price_history: {
        month: generatePriceData(0.85, 0.17, -0.07),
        week: generatePriceData(0.85, 0.1, -0.04),
        day: generatePriceData(0.85, 0.05, -0.02),
        hour: generatePriceData(0.85, 0.025, -0.01),
        minute: generatePriceData(0.85, 0.01, -0.005)
      }
    }
  };