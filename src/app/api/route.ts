import { catchAsync } from '@/lib/catch-async';
import { sendResponse } from '@/lib/send-response';
import { UrlModel } from '@/models/url.model';
import { urlPayload } from '@/schema/url-payload';
import { nanoid } from 'nanoid';

export const POST = catchAsync(async (req) => {
  const { url } = urlPayload.parse(await req.json());

  const result = await UrlModel.create({
    redirectUrl: url,
    shortId: nanoid(8),
  });

  return sendResponse({
    status: 201,
    message: 'Generated shortId for url',
    data: result,
  });
});

export const GET = catchAsync(async (req) => {
  const res = await UrlModel.find();

  return sendResponse({
    message: 'Urls list retrieved successfully',
    data: res,
  });
});
