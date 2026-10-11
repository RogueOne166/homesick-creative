/* Vercel API — Stripe test checkout */
module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST." });
  }

  const key = process.env.STRIPE_SECRET_KEY;

  if (!key || !key.startsWith("sk_test_")) {
    return res.status(503).json({
      error: "Add a Stripe test secret key in Vercel, then redeploy."
    });
  }

  let base;

  try {
    base = new URL(process.env.SITE_URL);

    if (
      base.protocol !== "https:" ||
      base.pathname !== "/" ||
      base.search ||
      base.hash ||
      base.username ||
      base.password
    ) {
      throw new Error();
    }
  } catch {
    return res.status(503).json({
      error: "Configure SITE_URL with your HTTPS website origin."
    });
  }

  if (req.headers.origin !== base.origin) {
    return res.status(403).json({
      error: "Please start checkout from the event page."
    });
  }

  let body;

  try {
    body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;
  } catch {
    return res.status(400).json({ error: "Invalid request." });
  }

  if (
    !body ||
    body.event !== "halloween-2026" ||
    !Number.isInteger(body.quantity) ||
    body.quantity < 1 ||
    body.quantity > 10
  ) {
    return res.status(400).json({
      error: "Choose between 1 and 10 regular tickets."
    });
  }

  const params = new URLSearchParams({
    mode: "payment",
    "line_items[0][price_data][currency]": "eur",
    "line_items[0][price_data][unit_amount]": "800",
    "line_items[0][price_data][product_data][name]":
      "ERWN Halloween Party — Regular admission (TEST)",
    "line_items[0][quantity]": String(body.quantity),
    "metadata[event]": "halloween-2026",
    "metadata[quantity]": String(body.quantity),
    "payment_intent_data[metadata][event]": "halloween-2026",
    success_url:
      base.origin +
      "/checkout-success.html?session_id={CHECKOUT_SESSION_ID}",
    cancel_url:
      base.origin +
      "/event-details.html?event=halloween-2026&cancelled=1#tickets",
    expires_at: String(Math.floor(Date.now() / 1000) + 1800)
  });

  try {
    const response = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + key,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params,
        signal: AbortSignal.timeout(15000)
      }
    );

    const session = await response.json();

    if (!response.ok) {
      const clean = value =>
        typeof value === "string" &&
        /^[a-zA-Z0-9_\[\].-]{1,160}$/.test(value)
          ? value
          : null;

      console.error("Stripe checkout rejected", {
        status: response.status,
        type: clean(session.error?.type),
        code: clean(session.error?.code),
        param: clean(session.error?.param),
        requestId: response.headers.get("request-id")
      });

      let message =
        "Stripe rejected the checkout request. Check Stripe test-mode request logs for details.";

      if (
        response.status === 401 ||
        session.error?.code === "api_key_expired"
      ) {
        message =
          "Stripe rejected the API key. Update STRIPE_SECRET_KEY with a valid test secret key and redeploy.";
      }

      if (response.status === 403) {
        message =
          "Stripe denied access. Check the test key permissions and account settings.";
      }

      if (response.status === 429) {
        message =
          "Stripe is receiving too many requests. Please retry shortly.";
      }

      return res.status(502).json({ error: message });
    }

    if (!session.url || session.livemode !== false) {
      console.error("Unexpected Stripe checkout response", {
        hasUrl: Boolean(session.url),
        livemode: session.livemode
      });

      return res.status(502).json({
        error: "Stripe returned an unexpected checkout response. Check Vercel logs."
      });
    }

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout connection failed", {
      name:
        error?.name === "TimeoutError"
          ? "TimeoutError"
          : "ConnectionOrResponseError"
    });

    return res.status(502).json({
      error:
        error?.name === "TimeoutError"
          ? "Stripe took too long to respond. Please try again."
          : "Could not connect to Stripe or read its response. Check Vercel logs."
    });
  }
};
