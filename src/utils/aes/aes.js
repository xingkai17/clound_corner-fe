// 引入加密包(注意存放的路径)
// const CryptoJS = require('./CryptoJS');
import {CryptoJS} from './crypto.js'
 
// 秘钥,转换成utf8格式字符串，用于加密解密，一般长度是16位（由后端提供）
const key = CryptoJS.enc.Utf8.parse('qw5w6SFE2D1jmxyd')
// 偏移量，转换成utf8格式字符串，一般长度是16位(由后端提供)
const iv = CryptoJS.enc.Utf8.parse('345GDFED433223DF')
 
// 解密（使用CBC模式）
export function Decrtpt(value) {
  // 使用外部包中的AES的解密方法
	// value(解密内容)、key(密钥)
  let decrypt = CryptoJS.AES.decrypt(value, key, {
    iv,							// 偏移量
    mode: CryptoJS.mode.CBC,		// 模式（五种加密模式，各有优缺）
    padding: CryptoJS.pad.Pkcs7	// 填充
  })
  // 转成utf8格式字符串，并返回出去
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr
}
 
//加密（使用CBC模式）
export function Encrypt(value) {
  // 使用外部包中的AES的加密方法
  // value(加密内容)、key(密钥)
  let encrypt = CryptoJS.AES.encrypt(value, key, {
    iv,							// 偏移量
    mode: CryptoJS.mode.CBC,		// 模式（五种加密模式）
    padding: CryptoJS.pad.Pkcs7	// 填充
  })
  // 将加密的内容转成字符串返回出去
  return encrypt.toString()
}
 
// 导出密钥，以防其他地方需要使用
export const privateKey = 'qw5w6SFE2D1jmxyd'