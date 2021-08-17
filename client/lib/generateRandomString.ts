const generateRandomString = (): string => {
  const crypto = require('crypto')
  const N = 16
  return crypto.randomBytes(N).toString('base64').substring(0, N)
}

export default generateRandomString
