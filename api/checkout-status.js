/* Read payment status from Stripe; never treat a redirect as proof of payment.
   Returns no customer name, email or other personal details. */
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).json({ error: 'Use GET.' }); }
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !key.startsWith('sk_test_')) return res.status(503).json({ error: 'Test checkout is not configured.' });
  const id = req.query.session_id;
  if (typeof id !== 'string' || !/^cs_test_[A-Za-z0-9]{10,250}$/.test(id)) return res.status(400).json({ error: 'Invalid checkout reference.' });
  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions/' + encodeURIComponent(id), { headers: { Authorization: 'Bearer ' + key }, signal: AbortSignal.timeout(15000) });
    const s = await response.json();
    const count = Number(s.metadata?.quantity);
    if (!response.ok || s.livemode !== false || s.metadata?.event !== 'halloween-2026' || !Number.isInteger(count) || count < 1 || count > 10 || s.currency !== 'eur' || s.amount_total !== count * 800) return res.status(404).json({ error: 'Checkout reference not found for this event.' });
    return res.status(200).json({ paid: s.payment_status === 'paid' && s.status === 'complete', quantity: count, amount: s.amount_total });
  } catch (_) { return res.status(502).json({ error: 'Unable to check payment status. Please try again later.' }); }
};
