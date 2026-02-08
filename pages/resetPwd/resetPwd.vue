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
		ethers
	} from "ethers";
	import {
		storeToRefs
	} from 'pinia'
	import {
		useAppStore,
		useUserStore
	} from '@/store/index.js'

	import CustomBar from '@/components/customBar.vue'

	const navHeight = ref(44)
	const overlayStyle = ref({
		background: 'rgba(52, 56, 76, 0.3)',
		backdropFilter: 'blur(2px)',
		webkitBackdropFilter: 'blur(2px)'
	})

	const disabled = ref(false)
	const inputWords = ref(['piece', 'aspect', 'cabbage', 'utility', 'own', 'vivid', 'front', 'volcano', 'sell', 'kick',
		'into', 'shop'
	])



	const verifyPopup = ref(false)
	const handleClose = () => {
		inputWords.value = []
		verifyPopup.value = false
	}
	const appStore = useAppStore()
	const {
		encryptedData,
		appPin
	} = storeToRefs(appStore)

	const handleGoto = async (type) => {

		try {
			disabled.value = true
			uni.showLoading({
				mask:true,
				title:""
			})
			const words = inputWords.value.join(' ')
			const hdNode = ethers.utils.HDNode.fromMnemonic(words.trim())
			const child = hdNode.derivePath("m/44'/60'/0'/0/0")
			const wallet = new ethers.Wallet(child.privateKey)
			const oldWallet = await ethers.Wallet.fromEncryptedJson(encryptedData.value, appPin.value)
			console.log(wallet.address)
			console.log(oldWallet.address)
			if (wallet.address === oldWallet.address) {
				uni.redirectTo({
					url: '/pages/resetNewPwd/resetNewPwd'
				})
			} else {
				verifyPopup.value = true
			}

		} catch (error) {
			verifyPopup.value = true
			console.error(error)
			//TODO handle the exception
		} finally {
			disabled.value = false
			uni.hideLoading()
		}


	}

	onReady(() => {
		uni.createSelectorQuery()
			.select('.header')
			.boundingClientRect(rect => {
				console.log('rect', )
				navHeight.value = rect.height
			})
			.exec()
	})
</script>

<template>
	<view class="page-container">
		<custom-bar title="Reset Password"></custom-bar>
		<view class="page-body" :style="{paddingTop: navHeight + 'px'}">
			<view class="title">
				Recover with Seed Phrase
			</view>
			<view class="sub-title">
				Enter your wallet's recovery phrase to set a new password. This is the only way to regain access to your
				account if you've forgotten your password.
			</view>
			<view class="words-container">
				<view class="word-item" v-for="(key,index) in 12" :key="key">
					<view class="word-index">
						{{key}}.
					</view>
					<view class="word-input-wrap">
						<input class="word-input" type="text" v-model="inputWords[index]">
					</view>
				</view>
			</view>
			<view class="button-group">
				<button class="button start-button" @click="handleGoto">
					<text>
						Continue
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
					Invalid Recovery Phrase
				</view>
				<view class="sub-title">
					The mnemonic phrase you entered does not match our records. Please check each word for errors and
					try again.
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