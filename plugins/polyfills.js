/* ========= 1️⃣ 兜底全局对象 ========= */

// iOS / uni-app / WebView 兼容
if (typeof globalThis === 'undefined') {
  // eslint-disable-next-line no-undef
  if (typeof self !== 'undefined') {
    self.globalThis = self
  } else if (typeof window !== 'undefined') {
    window.globalThis = window
  } else {
    // 最极端兜底
    Function('return this')().globalThis = Function('return this')()
  }
}

// ethers / buffer / unorm 会用到
if (typeof global === 'undefined') {
  // eslint-disable-next-line no-undef
  globalThis.global = globalThis
}

/* ========= 2️⃣ normalize polyfill ========= */

import { nfc, nfd, nfkc, nfkd } from 'unorm'

// 无条件覆盖（必须）
String.prototype.normalize = function (form) {
  switch (form) {
    case 'NFC': return nfc(this)
    case 'NFD': return nfd(this)
    case 'NFKC': return nfkc(this)
    case 'NFKD': return nfkd(this)
    default: return this
  }
}

console.log('[polyfill] global + normalize patched')
