import crypto from "crypto"


const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa');

console.log("publicKey:", publicKey)

console.log("privateKey:", privateKey)




export function encrypt(data) {
  const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(data));
  return encrypted.toString('base64')
}

export function decrypt(encrypted) {
  const decrypted = crypto.privateDecrypt(privateKey, encrypted);
  return decrypted.toString();
}