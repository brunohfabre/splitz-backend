import multer from 'multer'
import crypto from 'node:crypto'
import path from 'node:path'

export const multerConfig = {
  limits: { fieldSize: 2 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
}
