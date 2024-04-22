import mongoose from 'mongoose';

export async function dbConnect() {
  mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI!);
}
