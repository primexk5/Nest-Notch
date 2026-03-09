// In-memory store shared with the send-otp route
if (!globalThis._verificationTokens) {
  globalThis._verificationTokens = new Map();
}
const pendingVerifications = globalThis._verificationTokens;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new Response(JSON.stringify({ error: 'Token is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const entry = pendingVerifications.get(token);

  if (!entry) {
    return new Response(JSON.stringify({ error: 'invalid' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (Date.now() > entry.expires) {
    pendingVerifications.delete(token);
    return new Response(JSON.stringify({ error: 'expired' }), {
      status: 410,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Token is valid — return the form data so the client can register
  const { formData } = entry;
  pendingVerifications.delete(token); // consume the token

  return new Response(JSON.stringify({ success: true, formData }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
