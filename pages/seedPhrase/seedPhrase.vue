<script setup>
	import {
		ref
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
	const disabled = ref(false)
	const words = ref([])
	const appStore = useAppStore()
	const {
		encryptedData,
		appPin
	} = storeToRefs(appStore)
	const getWords = async () => {
		try {
			uni.showLoading({
				mask: true,
				title: ''
			})
			const wallet = await ethers.Wallet.fromEncryptedJson(encryptedData.value, appPin.value)
			words.value = wallet.mnemonic.phrase.split(' ')
		} catch (error) {
			console.error(error)
			//TODO handle the exception
		} finally {
			uni.hideLoading()
		}
	}



	const showMask = ref(true)
	const handleHide = () => {
		showMask.value = false
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
		getWords()
	})
</script>

<template>
	<view class="page-container">
		<custom-bar title="Seed Phrase"></custom-bar>
		<view class="page-body" :style="{paddingTop: navHeight + 'px'}">
			<view class="title">Do not share your mnemonic</view>
			<view class="sub-title">
				If someone gets your mnemonic phrase, they have full control over your wallet
			</view>
			<view class="words-container">
				<view class="mask" @longpress="handleHide" v-if="showMask">
					<view class="text">Make sure no one is looking at your screen</view>
					<view class="text">Tap to reveal your keyphrase</view>

				</view>

				<view class="word-item" v-for="(word,index) in words" :key="index">
					<view class="word-index">
						{{index+1}}.
					</view>
					<view class="word-text">
						{{word}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
	.page-container {
		.page-body {
			padding: 0 40rpx;

			.title {
				color: #FFF;
				font-family: "Ubuntu Sans";
				font-size: 32rpx;
				font-style: normal;
				font-weight: 500;
				line-height: 155%;
				/* 24.8px */
				margin: 40rpx 0 16rpx 0;
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
				min-height: 400rpx;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				padding: 40rpx 32rpx;

				gap: 16rpx 32rpx;
				border-radius: 24rpx;
				background: #1D1F25;
				margin-bottom: 72rpx;
				position: relative;

				.mask {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					border-radius: 24rpx;
					background: rgba(52, 56, 76, 0.30);
					backdrop-filter: blur(4rpx);
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;

					.text {
						color: #FFF;
						text-align: center;
						font-family: Inter;
						font-size: 24rpx;
						font-style: normal;
						font-weight: 400;
						line-height: 28rpx;
						/* 116.667% */
						letter-spacing: 0.36px;
					}
				}

				.word-item {
					display: flex;
					align-items: center;

					height: 68rpx;
					padding: 8rpx 0;

					box-sizing: border-box;
					border-bottom: 1px solid #272933;

					.word-index {
						color: #5D6588;
						font-family: Inter;
						font-size: 14px;
						font-style: normal;
						font-weight: 500;
						line-height: normal;
						margin-right: 4rpx;
					}

					.word-text {
						color: #F6F8FF;
						font-family: Inter;
						font-size: 14px;
						font-style: normal;
						font-weight: 400;
						line-height: normal;
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
	}
</style>