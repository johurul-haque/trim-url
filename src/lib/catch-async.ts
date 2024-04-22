import { NextRequest, NextResponse } from 'next/server';
import { handleErrors } from './handle-errors';

type HandlerFunc = (req: NextRequest, res: NextResponse) => void;

export function catchAsync(fn: HandlerFunc) {
  return async (req: NextRequest, res: NextResponse) => {
    return Promise.resolve(fn(req, res)).catch(handleErrors);
  };
}
