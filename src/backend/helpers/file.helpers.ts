import { NextApiRequest } from "next";
import { ALLOWED_MIME_TYPE } from "../config/file"
import formidable from "formidable";
import { Writable } from "stream";

// promisify formidable
export function formidablePromise(
    req: NextApiRequest,
    opts?: Parameters<typeof formidable>[0]
  ): Promise<{fields: formidable.Fields; files: formidable.Files}> {
  return new Promise((accept, reject) => {
      const form = formidable(opts);
      form.parse(req, (err, fields, files) => {
          if (err) {
              return reject(err);
          }
          return accept({fields, files});
      });
  });
}

export const fileConsumer = <T = unknown>(acc: T[]) => {
  const writable = new Writable({
      write: (chunk, _enc, next) => {
          acc.push(chunk);
          next();
      },
  });

  return writable;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateFileToTranscript = (files: any) => {
  //validar si existe el archivo
  if(!files?.file) {
    throw new Error()
  }
  //validar tipo de archivo permitido
  if(!ALLOWED_MIME_TYPE.some( el => el === files.file?.mimetype)) {
    throw new Error()
  }
}
