import { Schema, model } from 'mongoose';

const urlModelSchema = new Schema(
  {
    shortId: { type: String, unique: true, required: true },
    redirectUrl: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, { __v, ...rest }) => rest,
    },
  }
);

export const UrlModel = model('urls', urlModelSchema);
