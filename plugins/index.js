import {
	ethers
} from "ethers";

import dayjs from 'dayjs'


import{UniRpcProvider } from '@/plugins/uniRpcProvider.js'
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
	return new UniRpcProvider(ethrpc, {
		name: "custom",
		chainId: 9000 // 改成你的链ID
	})
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