export const FileSchema = {
  name: String,
  url: String,
  size: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
