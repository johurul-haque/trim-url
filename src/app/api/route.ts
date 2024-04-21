import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (url) {
      const shortId = nanoid(8);
      return NextResponse.json({ shortId });
    } else {
      return NextResponse.json({ error: 'URL not provided' }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ error: 'URL not provided' }, { status: 400 });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    return NextResponse.json({});
  } catch (err) {
    return NextResponse.json(err);
  }
}
