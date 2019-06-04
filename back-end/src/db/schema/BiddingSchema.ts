import { Schema } from 'mongoose'
import { FileSchema } from './FileSchema'

export const Bidding = {
  files: [FileSchema],
  createdBy: {
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
