const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    // Send notification to admin
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'INFOBYTES <onboarding@resend.dev>',
        to: ['shehryar.dhillon@gmail.com'],
        subject: '🚀 New Launch Notification Signup — INFOBYTES',
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; background: #0a0e1a; border-radius: 12px; color: #e2e8f0;">
            <h2 style="color: #22d3b7; margin-bottom: 8px;">New Subscriber!</h2>
            <p style="font-size: 16px;">Someone wants to be notified when INFOBYTES launches:</p>
            <div style="background: #141b2d; border-left: 4px solid #22d3b7; padding: 15px 20px; border-radius: 6px; margin: 16px 0;">
              <strong style="color: #22d3b7;">Email:</strong>
              <span style="color: #fff; margin-left: 8px;">${email}</span>
            </div>
            <p style="font-size: 13px; color: #64748b;">Sent from the INFOBYTES Coming Soon page.</p>
          </div>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend API error:', JSON.stringify(data));
      throw new Error(`Resend API failed [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error in send-notification:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
