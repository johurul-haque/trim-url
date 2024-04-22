import { Schema, model, models } from 'mongoose';
import { nanoid } from 'nanoid';

const schema = new Schema(
  {
    shortId: { type: String, default: nanoid(8), unique: true },
    redirectUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const UrlModel = models.urls || model('urls', schema);
