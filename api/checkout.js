/* Vercel Node.js Function. Test mode only until durable ticket fulfillment exists.
   No client-provided price, event name or redirect URL is trusted. */
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'Use POST.' }); }
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !key.startsWith('sk_test_')) return res.status(503).json({ error: 'Test checkout is not configured. Live sales are not enabled yet.' });
  let base;
  try {
    base = new URL(process.env.SITE_URL);
    if (base.protocol !== 'https:' || base.pathname !== '/' || base.search || base.hash || base.username || base.password) throw new Error();
  } catch (_) { return res.status(503).json({ error: 'Configure SITE_URL with your HTTPS website origin.' }); }
  // Requests must come from the configured website origin.
  if (req.headers.origin !== base.origin) return res.status(403).json({ error: 'Please start checkout from the event page.' });
  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; } catch (_) { return res.status(400).json({ error: 'Invalid request.' }); }
  if (!body || body.event !== 'halloween-2026' || !Number.isInteger(body.quantity) || body.quantity < 1 || body.quantity > 10) return res.status(400).json({ error: 'Choose between 1 and 10 regular tickets.' });
  const params = new URLSearchParams({
    mode: 'payment', 'payment_method_types[0]': 'card',
    'line_items[0][price_data][currency]': 'eur',
    'line_items[0][price_data][unit_amount]': '800',
    'line_items[0][price_data][product_data][name]': 'ERWN Halloween Party — Regular admission (TEST)',
    'line_items[0][quantity]': String(body.quantity),
    'metadata[event]': 'halloween-2026', 'metadata[quantity]': String(body.quantity),
    'payment_intent_data[metadata][event]': 'halloween-2026',
    success_url: base.origin + '/checkout-success.html?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: base.origin + '/event-details.html?event=halloween-2026&cancelled=1#tickets',
    expires_at: String(Math.floor(Date.now() / 1000) + 1800)
  });
  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST', headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params, signal: AbortSignal.timeout(15000)
    });
    const session = await response.json();
    if (!response.ok || !session.url || session.livemode) throw new Error();
    return res.status(200).json({ url: session.url });
  } catch (_) { return res.status(502).json({ error: 'Checkout could not start. Please try again.' }); }
};
