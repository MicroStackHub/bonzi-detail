import { NextResponse } from 'next/server';

const EXTERNAL_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.glst.in';

export async function POST(req) {
  try {
    const body = await req.json();

    const upstream = await fetch(`${EXTERNAL_BASE}/api/v2/get-product-price`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await upstream.json();

    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Proxy error' }, { status: 500 });
  }
}

export async function GET(req) {
  // Support GET fallback: forward query to external GET
  try {
    const url = new URL(req.url);
    const qs = url.search;
    const upstream = await fetch(`${EXTERNAL_BASE}/api/v2/get-product-price${qs}`);
    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Proxy error' }, { status: 500 });
  }
}
