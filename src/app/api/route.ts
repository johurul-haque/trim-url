import { catchAsync } from '@/lib/catch-async';
import { sendResponse } from '@/lib/send-response';
import { UrlModel } from '@/models/url.model';
import { createRecordPayload } from '@/schema/url-payload';
import { nanoid } from 'nanoid';

export const POST = catchAsync(async (req) => {
  const { url } = createRecordPayload.parse(await req.json());

  const result = await UrlModel.create({
    redirectUrl: url,
    shortId: nanoid(8),
  });

  return sendResponse({
    status: 201,
    message: 'Record created successfully',
    data: result,
  });
});
