/* Redirect to Stripe-hosted Checkout; keep all credentials on the server. */
(() => {
  const button = document.querySelector('#checkout-button');
  const message = document.querySelector('#checkout-message');
  const quantity = document.querySelector('#ticket-quantity');
  if (!button || !message || !quantity) return;
  if (new URLSearchParams(location.search).get('cancelled') === '1') message.textContent = 'Checkout cancelled. No ticket has been issued.';
  button.addEventListener('click', async () => {
    button.disabled = true; quantity.disabled = true; message.textContent = 'Opening Stripe test checkout…';
    try {
      const response = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: 'halloween-2026', quantity: Number(quantity.value) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Checkout is unavailable.');
      const url = new URL(data.url);
      if (url.protocol !== 'https:' || url.hostname !== 'checkout.stripe.com') throw new Error('Unexpected checkout address.');
      location.assign(url.href);
    } catch (error) {
      message.textContent = error.message || 'Could not open checkout. Please try again.';
      button.disabled = false; quantity.disabled = false;
    }
  });
})();
