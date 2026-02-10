<script>
	import {
		ethers
	} from "ethers";
	import {
		mapActions,
		mapGetters
	} from 'vuex'

	import {
		setWallet
	} from "@/runtime/walletRuntime";
	import CustomBar from '@/components/customBar.vue'
	export default {
		components: {
			CustomBar
		},
		data() {
			return {
				navHeight: 44,
				disabled: false
			}
		},
		computed: {
			...mapGetters(['mnemonic']),
			getWords() {
				return this.mnemonic.split(' ')
			}

		},
		methods: {
			...mapActions(['setMnemonic']),
			getMnemonic() {
				const wallet = ethers.Wallet.createRandom();
				this.setMnemonic(wallet.mnemonic.phrase)
				setWallet(wallet)
			},
			handleGoto(type) {
				this.disabled = true
				switch (type) {
					case 'verifyCreated':
						uni.navigateTo({
							url: '/pages/verifyCreated/verifyCreated'
						});
						this.disabled = false;
						break;
					case 'import':
						uni.navigateTo({
							url: '/pages/import/import'
						})
						this.disabled = false;
						break;
				}
			}
		},
		onReady() {
			const sysInfo = uni.getSystemInfoSync()
			const statusBarHeight = sysInfo.statusBarHeight + 12 // 状态栏
			this.navHeight = statusBarHeight + 44 // 44 = 自定义导航栏高度
		},
		onLoad() {
			this.getMnemonic()
		}
	}
</script>

<template>
	<view class="page-container">
		<custom-bar></custom-bar>
		<view class="page-body" :style="{paddingTop: navHeight + 'px'}">
			<view class="title">Welcome AlphaMeta!</view>
			<view class="sub-title">
				For maximum security, write down your seed phrase on paper and store it in a safe place.
			</view>
			<view class="words-container">
				<view class="word-item" v-for="(word,index) in getWords" :key="index">
					<view class="word-index">
						{{index+1}}.
					</view>
					<view class="word-text">
						{{word}}
					</view>
				</view>
			</view>
			<view class="button-group">
				<button :disabled="disabled" class="button start-button" @click="handleGoto('verifyCreated')">
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
				min-height: 400rpx;
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