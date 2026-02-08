let wallet  = null

export function setWallet(w) {
	wallet = w
}

export function getWallet() {
	if (!wallet) {
		throw new Error('钱包未解锁')
	}
	return wallet
}

export function clearWallet() {
	wallet = null
}