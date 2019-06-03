import { Schema } from 'mongoose'
import { FileSchema } from './FileSchema'

export const Bidding = {
  files: [FileSchema],
  biddedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  proposal: {
    type: Schema.Types.ObjectId,
    ref: 'cvote',
    required: true
  },
}
