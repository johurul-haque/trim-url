import mongoose from 'mongoose';

export async function dbConnect() {
  if (mongoose.connection.readyState === 1) return;
  mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI!);
}
