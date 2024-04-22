import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function handleErrors(error: unknown) {
  let errorResponse = {
    status: 500,
    message: 'Internal Server Error',
    error,
  };

  if (error instanceof ZodError) {
    errorResponse = {
      message: 'Validation Error',
      error: error.errors,
      status: 403,
    };
  }

  if (error instanceof mongoose.Error.ValidationError) {
    errorResponse = {
      status: 403,
      message: 'Validation Error',
      error: error.errors,
    };
  }

  if (error instanceof mongoose.Error.CastError) {
    errorResponse = { status: 400, message: 'Invalid Data Type', error };
  }

  if ('code' in (error as any) && (error as any).code === 11000) {
    errorResponse = { status: 409, message: 'Duplicate key error', error };
  }

  if (error instanceof Error) {
    errorResponse = { ...errorResponse, message: error.message, error: error };
  }

  const { status, ...rest } = errorResponse;
  return NextResponse.json(rest, { status });
}
