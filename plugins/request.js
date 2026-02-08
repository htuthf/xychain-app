import {BaseUrl} from '@/config/index'

const uniRequest = (options) => {
    return new Promise(async (resolve, reject) => {
        const {
            data,
            header = {
                'content-type': 'application/json'
            },
            method = 'POST',
            dataType = 'json',
            showLoader = true
        } = options

        if (showLoader) {
            uni.showLoading({
                mask: true
            })
        }
        let url = options.url
        if (!options.isConfig) {
            url = BaseUrl + options.url
        }
        uni.request({
            url: url,
            method: method,
            data: data,
            header: header,
            dataType: dataType,
            showLoader: showLoader,
            async success(res) {
                resolve(res)
            },
            async fail(err) {
                console.log('fail:err', err)
                reject(err)
            },
            complete() {
                let t = setTimeout(() => {
                    uni.hideLoading()
                    clearTimeout(t)
                }, 500)
            }
        })
    })
}
export const request = (options) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await uniRequest(options)

            if (options.isReturn) return response
            const res = response.data;
            if (res.code !== 200 ) {
                uni.showToast({
                    title: res.msg,
                    icon: 'none',
                    // image: '/static/icon/choice.png',
                    mask: true,
                })
                return reject(res)
            } else {
                return resolve(response.data)
            }

        } catch (e) {
			uni.showToast({
			    title: e,
			    icon: 'none',
			    // image: '/static/icon/choice.png',
			    mask: true,
			})
            reject(e)
        }
    })
}
