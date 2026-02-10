const user = {
	state: {
		// mnemonic: uni.getStorageSync('mnemonic') || '',
		// newPin: uni.getStorageSync('newPin') || '',

		mnemonic: '',
		newPin: '',
	},
	actions: {
		setMnemonic({
			commit
		}, value) {
			commit('SET_MNEMONIC', value)
		},
		setNewPin({
			commit
		}, value) {
			commit('SET_NEWPIN', value)
		}
	},
	mutations: {
		SET_MNEMONIC: (state, value) => {
			state.mnemonic = value
			// uni.setStorageSync('mnemonic', value)
		},
		SET_NEWPIN: (state, value) => {
			state.newPin = value
			// uni.setStorageSync('newPin', value)
		}
	}
}

export default user