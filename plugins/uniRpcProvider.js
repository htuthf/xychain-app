import { ethers } from "ethers"

export class UniRpcProvider extends ethers.providers.JsonRpcProvider {
  constructor(url, network) {
    super(url, network)
    this._url = url
  }

  async send(method, params) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: this._url,
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        data: {
          jsonrpc: "2.0",
          id: Date.now(),
          method,
          params
        },
        success: (res) => {
          if (res.data && res.data.error) {
            reject(res.data.error)
          } else {
            resolve(res.data.result)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
}
