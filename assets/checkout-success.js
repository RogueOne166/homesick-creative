(async () => {
  const message = document.querySelector('#payment-message');
  const id = new URLSearchParams(location.search).get('session_id');
  if (!id) { message.textContent = 'No checkout reference was provided.'; return; }
  // Keep the reference out of the address bar after reading it.
  history.replaceState(null, '', location.pathname);
  try {
    const response = await fetch('/api/checkout-status?session_id=' + encodeURIComponent(id));
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Unable to check payment.');
    message.textContent = data.paid
      ? 'Test payment confirmed: ' + data.quantity + ' ticket(s), ' + new Intl.NumberFormat('en-IE', {style: 'currency', currency: 'EUR'}).format(data.amount / 100) + '. No real money was charged.'
      : 'The test payment is not confirmed as complete. No ticket has been issued.';
  } catch (error) { message.textContent = error.message || 'Unable to check payment status.'; }
})();
