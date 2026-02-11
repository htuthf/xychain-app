<script>
	import {
		Wallet
	} from "ethers";

	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		getWallet
	} from "@/runtime/walletRuntime";
	import {
		pickRandomIndexes,
		verifyMnemonic
	} from "@/plugins";

	import CustomBar from '@/components/customBar.vue'
	export default {
		components: {
			CustomBar
		},
		data() {
			return {
				navHeight: 44,
				disabled: false,
				verifyPopup: false,
				inputWords: [],
				words: [],
				randomIndex: [],

				overlayStyle: {
					background: 'rgba(52, 56, 76, 0.3)',
					backdropFilter: 'blur(2px)',
					webkitBackdropFilter: 'blur(2px)'
				},
			}
		},
		computed: {
			...mapGetters(['mnemonic', 'appPin']),
			getWords() {
				return this.mnemonic.split(' ')
			},
			verifyInputWords() {
				const inputWordsKeys = Object.keys(this.inputWords)
				if (!inputWordsKeys.length) return true
				const isValid = verifyMnemonic(this.getWords, this.inputWords)
				return !isValid
			}

		},
		methods: {
			...mapActions(['setEncryptedData']),
			getRandomIndex() {
				this.randomIndex = pickRandomIndexes(12, 6)
			},
			handleClose() {
				this.verifyPopup = false
			},
			async handleGoto(type) {
				try {
					this.disabled = true
					switch (type) {
						case 'createPin':
							const inputWordsKeys = Object.keys(this.inputWords)
							if (!inputWordsKeys.length) return false
							const isValid = verifyMnemonic(this.getWords, this.inputWords)
							if (!isValid) {
								this.verifyPopup = true
								return false;
							}
							if (this.appPin) {
								const wallet = getWallet()
								const encryptedJson = await wallet.encrypt(this.appPin, {
									scrypt: {
										N: 1 << 12, // 4096
										r: 8,
										p: 1
									}
								})
								this.setEncryptedData(encryptedJson)

								uni.reLaunch({
									url: '/pages/home/home'
								});
							} else {
								uni.navigateTo({
									url: '/pages/createPin/createPin'
								});
							}
							break;
						case 'import':
							uni.navigateTo({
								url: '/pages/import/import'
							})
							break;
					}
				} catch (error) {
					console.error(error)
					//TODO handle the exception
				} finally {
					this.disabled = false;
				}
			},
			verifyWord(key) {
				const inputWord = this.inputWords[key]
				if (!inputWord) return false
				if (this.getWords[key] === inputWord.trim()) {
					return false
				}
				return true
			}
		},
		onReady() {
			const sysInfo = uni.getSystemInfoSync()
			const statusBarHeight = sysInfo.statusBarHeight + 12 // 状态栏
			this.navHeight = statusBarHeight + 44 // 44 = 自定义导航栏高度
		},
		onLoad() {
			this.getRandomIndex()
		}
	}
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


		<u-popup :show="verifyPopup" :overlayStyle="overlayStyle" bgColor="transparent" mode="center">
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