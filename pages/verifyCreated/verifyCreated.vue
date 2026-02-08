<script setup>
	import {
		ref,
		computed
	} from "vue";
	import {
		onLoad,
		onReady,
		onShow
	} from '@dcloudio/uni-app'
	import {
		Wallet
	} from "ethers";
	import {
		getWallet
	} from "@/runtime/walletRuntime";

	import {
		storeToRefs
	} from 'pinia'

	import {
		useUserStore,
		useAppStore
	} from '@/store/index.js'

	const userStore = useUserStore()
	const {
		mnemonic,
		privateKey,
		address
	} = storeToRefs(userStore)
	import {
		pickRandomIndexes,
		verifyMnemonic
	} from "@/plugins";



	import CustomBar from '@/components/customBar.vue'

	const navHeight = ref(44)
	const overlayStyle = ref({
		background: 'rgba(52, 56, 76, 0.3)',
		backdropFilter: 'blur(2px)',
		webkitBackdropFilter: 'blur(2px)'
	})

	const disabled = ref(false)
	const words = ref([])
	const randomIndex = ref([])
	const inputWords = ref({})
	const getWords = computed(() => {
		return mnemonic.value.split(' ')
	})
	const getRandomIndex = () => {
		console.log(getWords.value.toString())
		randomIndex.value = pickRandomIndexes(12, 6)
	}

	const verifyInputWords = computed(() => {
		const inputWordsKeys = Object.keys(inputWords.value)
		if (!inputWordsKeys.length) return true
		const isValid = verifyMnemonic(getWords.value, inputWords.value)
		return !isValid
	})

	const verifyPopup = ref(false)
	const handleClose = () => {
		verifyPopup.value = false
	}
	const appStore = useAppStore()
	const {
		encryptedData,
		appPin
	} = storeToRefs(appStore)

	const handleGoto = async (type) => {
		disabled.value = true
		try {
			switch (type) {
				case 'createPin':
					const inputWordsKeys = Object.keys(inputWords.value)
					if (!inputWordsKeys.length) return false
					console.log(getWords.value, inputWords.value)
					const isValid = verifyMnemonic(getWords.value, inputWords.value)
					console.error(isValid)
					if (!isValid) {
						verifyPopup.value = true
						return false;
					}
					if (appPin.value) {
						const wallet = getWallet()
						const encryptedJson = await wallet.encrypt(appPin.value)
						encryptedData.value = encryptedJson
						uni.reLaunch({
							url: '/pages/home/home'
						});
					} else {
						uni.navigateTo({
							url: '/pages/createPin/createPin'
						});
					}

					disabled.value = false;
					break;
				case 'import':
					uni.navigateTo({
						url: '/pages/import/import'
					})
					disabled.value = false;
					break;
			}
		} catch (error) {
			console.error(error)
			//TODO handle the exception
		}
	}
	const verifyWord = (key) => {
		const inputWord = inputWords.value[key]
		if (!inputWord) return false
		if (getWords.value[key] === inputWord.trim()) {
			return false
		}
		return true
	}

	onReady(() => {
		uni.createSelectorQuery()
			.select('.header')
			.boundingClientRect(rect => {
				navHeight.value = rect.height
			})
			.exec()
	})
	onLoad(() => {
		getRandomIndex()
	})
</script>

<template>
	<view class="page-container">
		<custom-bar></custom-bar>
		<view class="page-body" :style="{paddingTop: navHeight + 'px'}">
			<view class="title">Welcome AlphaMeta!</view>
			<view class="sub-title">
				Verification Step: Please enter the following words from your recovery phrase to confirm your
				backup. Example: If prompted for words
				<text v-for="(key,index) in randomIndex" :key="index">#{{key+1}},</text>
				enter them in order.
			</view>
			<view class="words-container">
				<view class="word-item" v-for="(key,index) in randomIndex" :key="index">
					<view class="word-index">
						{{key+1}}.
					</view>
					<view class="word-input-wrap">
						<input class="word-input" type="text" v-model="inputWords[key]">
					</view>
				</view>
			</view>
			<view class="button-group">
				<button class="button start-button" @click="handleGoto('createPin')">
					<text>
						Continue
					</text>
				</button>
				<button :disabled="disabled" class="button create-button" @click="handleGoto('import')">
					<text>
						Use Existing Wallet
					</text>
				</button>
			</view>
		</view>


		<u-popup :show="verifyPopup" :overlayStyle="overlayStyle" mode="center">
			<view class="popup-body">
				<view class="error-wrape">
					<image src="/static/common/error-icon.png" mode="widthFix" class="error-icon"></image>
				</view>

				<view class="title">
					Verification Failed!
				</view>
				<view class="sub-title">
					The words you entered didn't match our records. Please try again carefully.
				</view>
				<button class="button" @click="handleClose">
					<text>Done</text>
				</button>

			</view>
		</u-popup>
	</view>
</template>

<style scoped lang="scss">
	.page-container {
		.page-body {
			padding: 0 40rpx;

			.title {
				color: #FFF;
				font-family: "Ubuntu Sans";
				font-size: 48rpx;
				font-style: normal;
				font-weight: 700;
				line-height: 72rpx;
				color: #ffffff;
				margin: 24rpx 0 12rpx 0;
			}

			.sub-title {
				color: #5D6588;
				font-family: Inter;
				font-size: 28rpx;
				font-weight: 400;
				line-height: 43rpx;
				/* 21.7px */
				letter-spacing: -0.28px;
				margin-bottom: 48rpx;
			}

			.words-container {
				min-height: 232rpx;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				padding: 40rpx 32rpx;

				gap: 16rpx 32rpx;
				border-radius: 24rpx;
				background: #1D1F25;
				margin-bottom: 72rpx;

				.word-item {
					display: flex;
					align-items: center;

					height: 68rpx;
					padding: 8rpx 0;

					box-sizing: border-box;
					border-bottom: 1px solid #272933;



					&.error {
						border-color: #FA2256;
					}

					&:focus-within {
						border-color: #272933;
					}

					.word-index {
						color: #5D6588;
						font-family: Inter;
						font-size: 14px;
						font-style: normal;
						font-weight: 500;
						line-height: normal;
						margin-right: 4rpx;
					}

					.word-input-wrap {

						.word-input {
							color: #F6F8FF;
							font-family: Inter;
							font-size: 14px;
							font-style: normal;
							font-weight: 400;

							caret-color: #1e68f6;
						}
					}
				}
			}
		}


		.button-group {
			display: flex;
			flex-direction: column;
			grid-row-gap: 24rpx;
			padding-bottom: 36rpx;
		}

		.button {
			width: 100%;
			height: 96rpx;
			font-size: 32rpx;
			color: #ffffff;
			font-weight: 700;
			line-height: 1;
			padding: 32rpx 64rpx;
			border-radius: 96rpx;

			&.start-button {
				background: linear-gradient(266deg, #002263 -0.27%, #1E68F6 98.58%, #246CF9 98.59%);
			}

			&.create-button {
				background: transparent;
			}

			&:after {
				content: none;
			}
		}



		.popup-body {
			width: 670rpx;
			background: #0D0D0D;
			border-radius: 32rpx;
			padding: 64rpx 32rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;

			.error-wrape {
				width: 144rpx;
				height: 144rpx;
				margin-bottom: 48rpx;

				.error-icon {
					width: 144rpx;
					height: 144rpx;
				}
			}

			.title {
				color: #ffffff;
				text-align: center;
				font-family: Inter;
				font-size: 36rpx;
				font-weight: 600;
				line-height: 46rpx;
				margin-bottom: 16rpx;
			}

			.sub-title {
				padding: 0 40rpx;
				color: #5D6588;
				text-align: center;
				font-family: Inter;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 44rpx;
				letter-spacing: -0.28px;
				margin-bottom: 48rpx;

			}

			.button {
				width: 100%;
				height: 96rpx;
				font-size: 32rpx;
				color: #ffffff;
				font-weight: 700;
				line-height: 1;
				padding: 32rpx 64rpx;
				border-radius: 96rpx;


				background: linear-gradient(266deg, #002263 -0.27%, #1E68F6 98.58%, #246CF9 98.59%);

			}
		}
	}
</style>