import { NextResponse } from 'next/server';

type SendResponseParams<T> = {
  status?: number;
  message: string;
  data: T;
};

export function sendResponse<T>({
  status = 200,
  message,
  data,
}: SendResponseParams<T>) {
  return NextResponse.json({ message, data }, { status });
}
