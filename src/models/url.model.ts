import { Schema, model, models } from 'mongoose';

const schema = new Schema(
  {
    shortId: { type: String, unique: true },
    redirectUrl: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, { __v, ...rest }) => rest,
    },
  }
);

export const UrlModel = models.urls || model('urls', schema);
