
export const formidableConfig = {
  keepExtensions: true,
  maxFileSize: 100_000_000,
  maxFieldsSize: 100_000_000,
  maxFields: 1,
  allowEmptyFiles: false,
  multiples: false,
};

export const ALLOWED_MIME_TYPE = [
  "audio/mpeg",
  "audio/wav",
  "video/mp4",
]

export const ALLOWED_FILE_EXTENSION = [
  "mp3",
  "wav",
  "mp4",
]