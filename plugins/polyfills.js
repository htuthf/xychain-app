
// polyfills.js —— 第一层

// 1️⃣ 先补 global / globalThis（你之前已经做过）
if (typeof globalThis === 'undefined') {
  if (typeof self !== 'undefined') self.globalThis = self
  else if (typeof window !== 'undefined') window.globalThis = window
  else Function('return this')().globalThis = Function('return this')()
}

if (typeof global === 'undefined') {
  globalThis.global = globalThis
}

// 2️⃣ 注入 crypto.getRandomValues（核心）
import '@ethersproject/shims'

// 3️⃣ normalize（你之前那套）
import { nfc, nfd, nfkc, nfkd } from 'unorm'

String.prototype.normalize = function (form) {
  switch (form) {
    case 'NFC': return nfc(this)
    case 'NFD': return nfd(this)
    case 'NFKC': return nfkc(this)
    case 'NFKD': return nfkd(this)
    default: return this
  }
}





