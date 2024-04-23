import mongoose from 'mongoose';

export async function dbConnect() {
  if (mongoose.connection.readyState === 1) return;
  mongoose.connect(process.env.MONGODB_URI!);
}
