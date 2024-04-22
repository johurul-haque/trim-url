import { dbConnect } from '@/config/db';
import { catchAsync } from '@/lib/catch-async';
import { UrlModel } from '@/models/url.model';
import { urlPayload } from '@/schema/url-payload';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

export const POST = catchAsync(async (req: NextRequest) => {
  const { url } = urlPayload.parse(await req.json());

  const shortId = nanoid(8);
  return NextResponse.json({ shortId });
});

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const res = await UrlModel.find();

    return NextResponse.json({ data: res });
  } catch (err) {
    return NextResponse.json(err);
  }
}
