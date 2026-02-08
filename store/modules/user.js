import {
	defineStore
} from 'pinia'

export const useUserStore = defineStore('user', {
	state: () => ({
		mnemonic: '',
		address: '',
		privateKey: '',
		newPin:''
	}),
	
	persist: {
		storage: {
			getItem: (key) => uni.getStorageSync(key),
			setItem: (key, value) => uni.setStorageSync(key, value),
			removeItem: (key) => uni.removeStorageSync(key),
		}
	}
})