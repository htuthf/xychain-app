const app = {
	state: {
		offPayment: uni.getStorageSync('offPayment') || false,
		encryptedData: uni.getStorageSync('encryptedData') || null,
		appPin: uni.getStorageSync('appPin') || null,
	},
	mutations: {
		SET_OFFPAYMENT(state, value) {
			state.offPayment = value
			uni.setStorageSync('offPayment', value)
		},
		SET_ENCRYPTEDDATE(state, value) {
			console.log(value)
			state.encryptedData = value
			uni.setStorageSync('encryptedData', value)
		},
		SET_APPPIN(state, value) {
			state.appPin = value
			uni.setStorageSync('appPin', value)
		}
	},
	actions: {
		setOffPayment({
			commit
		}, value) {
			commit('SET_OFFPAYMENT', value)
		},
		setEncryptedData({
			commit
		}, value) {
			commit('SET_ENCRYPTEDDATE', value)
		},
		setAppPin({
			commit
		}, value) {
			commit('SET_APPPIN', value)
		}
	}
}
export default app