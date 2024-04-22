import { dbConnect } from '@/config/db';
import { NextRequest, NextResponse } from 'next/server';
import { handleErrors } from './handle-errors';

type HandlerFunc<T> = (req: NextRequest) => Promise<NextResponse<T>>;

export function catchAsync<T>(fn: HandlerFunc<T>) {
  return async (req: NextRequest) => {
    try {
      await dbConnect();
      return await fn(req);
    } catch (error) {
      return handleErrors(error);
    }
  };
}
