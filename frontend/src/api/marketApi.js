const BASE_URL = '/api/v1/market';

export async function fetchContext() {
  const response = await fetch(`${BASE_URL}/context`);
  if (!response.ok) throw new Error('Failed to load market context');
  return response.json();
}

export async function updateContext(payload) {
  const response = await fetch(`${BASE_URL}/context`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Failed to update context');
  return response.json();
}
