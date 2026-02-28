const BASE_URL = '/api/v1/market';
const USE_BACKEND = false;

const MOCK_CONTEXT = {
  selected_market: 'indian',
  selected_symbol: 'NIFTY',
  mode: 'paper',
  auto_volatility_filter: true,
  market_intelligence: {
    trend: 'bullish',
    volatility: 'moderate',
    confidence: 0.82
  },
  strategy_analytics: {
    strategy: 'Breakout Momentum',
    win_rate: '61%',
    risk_reward: '1:2.1'
  },
  crowd_psychology: {
    sentiment: 'greed',
    social_volume: 'high',
    fear_greed_index: 68
  }
};

let localContext = { ...MOCK_CONTEXT };

async function safeFetchJson(url, options) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('Expected JSON response from API endpoint.');
    }

    return await res.json();
  } catch (err) {
    console.log('Backend not available. Using demo data.', err);
    return null;
  }
}

export async function fetchContext() {
  if (!USE_BACKEND) {
    return { ...localContext };
  }

  const data = await safeFetchJson(`${BASE_URL}/context`);
  return data ?? { ...localContext };
}

export async function updateContext(payload) {
  localContext = { ...localContext, ...payload };

  if (!USE_BACKEND) {
    return { ...localContext };
  }

  const data = await safeFetchJson(`${BASE_URL}/context`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return data ?? { ...localContext };
}
