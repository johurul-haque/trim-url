import { AppError } from '@/lib/app-error';
import { catchAsync } from '@/lib/catch-async';
import { sendResponse } from '@/lib/send-response';
import { UrlModel } from '@/models/url.model';
import { updateRecordPayload } from '@/schema/url-payload';

export const GET = catchAsync(async (req) => {
  const pathname = req.nextUrl.pathname.split('/')[2];

  const data = await UrlModel.findOne({ shortId: pathname }).lean();

  if (!data) throw new AppError(404, 'Record Not Found');

  return sendResponse({ message: 'Record Found', data });
});

export const PATCH = catchAsync(async (req) => {
  const pathname = req.nextUrl.pathname.split('/')[2];

  const payload = updateRecordPayload.parse(await req.json());

  const result = await UrlModel.findOneAndUpdate(
    { shortId: pathname },
    payload,
    {
      returnOriginal: false,
    }
  );

  if (!result) throw new AppError(404, 'Record Not Found');

  return sendResponse({ message: 'Updated successfully', data: result });
});

export const DELETE = catchAsync(async (req) => {
  const pathname = req.nextUrl.pathname.split('/')[2];

  const result = await UrlModel.deleteOne({ shortId: pathname });

  if (result.deletedCount === 0) throw new AppError(404, 'Record Not Found');

  return sendResponse({ message: 'Deleted successfully', data: result });
});
