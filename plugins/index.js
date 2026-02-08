import {
	ethers
} from "ethers";
import dayjs from 'dayjs'
export const pickRandomIndexes = (total, count) => {
	const indexes = Array.from({
		length: total
	}, (_, i) => i)

	for (let i = indexes.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[indexes[i], indexes[j]] = [indexes[j], indexes[i]]
	}

	return indexes.slice(0, count).sort((a, b) => a - b)
}
export const verifyMnemonic = (words, userInput) => {
	return Object.entries(userInput).every(([position, value]) => {
		const index = Number(position)
		return words[index] === value.trim()
	})
}


//生成key
export const deriveKey = async (password, salt) => {
	const enc = new TextEncoder();
	const keyMaterial = await crypto.subtle.importKey(
		"raw",
		enc.encode(password),
		"PBKDF2",
		false,
		["deriveKey"]
	);

	return crypto.subtle.deriveKey({
			name: "PBKDF2",
			salt,
			iterations: 100_000,
			hash: "SHA-256",
		},
		keyMaterial, {
			name: "AES-GCM",
			length: 256
		},
		false,
		["encrypt", "decrypt"]
	);
}


//加密

export const encryptPrivateKey = async (privateKey, password) => {
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const key = await deriveKey(password, salt);

	const encrypted = await crypto.subtle.encrypt({
			name: "AES-GCM",
			iv
		},
		key,
		new TextEncoder().encode(privateKey)
	);

	return {
		cipherText: Array.from(new Uint8Array(encrypted)),
		iv: Array.from(iv),
		salt: Array.from(salt),
	};
}
//解密
export const decryptPrivateKey = async (data, password) => {
	const {
		cipher,
		iv,
		salt
	} = data;

	const key = await deriveKey(password, new Uint8Array(salt));

	const decrypted = await crypto.subtle.decrypt({
			name: "AES-GCM",
			iv: new Uint8Array(iv)
		},
		key,
		new Uint8Array(cipher)
	);

	return new TextDecoder().decode(decrypted);
}

//加密
export const encryptData = async (plainText, password) => {
	const enc = new TextEncoder();
	const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM 必须
	const salt = crypto.getRandomValues(new Uint8Array(16)); // 用来派生 key

	const key = await deriveKey(password, salt);

	const cipherBuffer = await crypto.subtle.encrypt({
			name: "AES-GCM",
			iv
		},
		key,
		enc.encode(plainText)
	);

	return {
		cipherText: Array.from(new Uint8Array(cipherBuffer)),
		iv: Array.from(iv),
		salt: Array.from(salt),
	};
}




export function filterAddress(val, strLength = 18, lastLength = 5) {
	if (!val) {
		return '-'
	}
	let length = val.length;
	let start = val.substring(0, strLength)
	let end = val.substring(length - lastLength, length)
	return `${start}...${end}`
}

export const ethrpc = "http://18.167.160.220:8545"
export const Provider = () => {
	return new ethers.JsonRpcProvider(ethrpc)
}

export const RetainDecimal = (val, size = 3) => {
	if (!val || val === 'null') return '0'
	if (typeof val === 'string') {
		val = +val
	}
	return parseInt(val * Math.pow(10, size)) / Math.pow(10, size)
}
export const toThousands = (val) => {
	let initNum = parseInt(val)
	let decimal = +RetainDecimal(val - initNum, 6)
	let decimalString = decimal ? (decimal + '').split('.')[1] : ''
	let num = initNum.toString()
	let result = '';
	while (num.length > 3) {
		result = ',' + num.slice(-3) + result;
		num = num.slice(0, num.length - 3);
	}
	let endString = decimalString ? '.' + decimalString : ''
	if (num) {
		result = num + result + endString;
	}
	return result;
}

export const filterDate = (val, format = 'MMM DD, YYYY') => {
	return dayjs(val).format(format)
}

export const formatEther = (val) => {
	let formatEther = ethers.utils.formatEther(val)
	if (typeof formatEther === 'string') {
		formatEther = +formatEther
	}
	return formatEther
}