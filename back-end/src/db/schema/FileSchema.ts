export const FileSchema = {
  name: String,
  url: {
    type: String,
    required: true,
  },
  size: Number,
  filetype: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}
