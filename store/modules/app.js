import {
	defineStore
} from 'pinia'

export const useAppStore = defineStore('app', {
	state: () => ({
	
		offPayment: false,
		encryptedData: null,
		appPin:null
	}),

	getters: {
		isLogin: (state) => !!state.token
	},

	actions: {
		setToken(token) {
			this.token = token
		},
		logout() {
			this.token = ''
			this.userInfo = null
		}
	},

	persist: {
		storage: {
			getItem: (key) => uni.getStorageSync(key),
			setItem: (key, value) => uni.setStorageSync(key, value),
			removeItem: (key) => uni.removeStorageSync(key),
		}
	}
})