<template>
	<view class="page-container">
		<view class="logo-container">
			<view class="token-panel">
				<image src="/static/index/Rectangle.png" class="token-bg" mode="widthFix"></image>
				<image src='/static/index/token.png' class="token-icon token" mode="widthFix"></image>
			</view>
			<view class="meta-panel">
				<image src="/static/index/Rectangle1.png" class="token-bg" mode="widthFix"></image>
				<image src='/static/index/AlphaMeta.png' class="token-icon alphameta" mode="widthFix"></image>
			</view>
			<view class="btc-panel">
				<image src="/static/index/Rectangle2.png" class="token-bg" mode="widthFix"></image>
				<image src='/static/index/btc.png' class="token-icon btc" mode="widthFix"></image>
			</view>
			<view class="eth-panel">
				<image src="/static/index/Rectangle3.png" class="token-bg" mode="widthFix"></image>
				<image src='/static/index/eth.png' class="token-icon eth" mode="widthFix"></image>
			</view>
		</view>

		<view class="main-container">
			<view class="title">
				Start Your Web3 Journey
			</view>
			<view class="sub-title">
				All you need to access the Web3 world — right in your pocket.
			</view>
			<view class="button-group">
				<button :disabled="disabled" class="button start-button" @click="handleGoto('import')">
					<text>
						Get Started
					</text>
				</button>
				<button :disabled="disabled" class="button create-button" @click="handleGoto('create')">
					<text>
						Create New Wallet
					</text>
				</button>
			</view>

		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				disabled: false
			}
		},
		onLoad() {

		},
		methods: {
			handleGoto(type) {
				console.log(type)
				this.disabled = true
				switch (type) {
					case 'create':
						uni.navigateTo({
							url: '/pages/create/create'
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
		}
	}
</script>


<style lang="scss" scoped>
	.page-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		.logo-container {
			display: flex;
			justify-content: space-between;

			.token-icon {
				width: 112rpx;
				height: 112rpx;
				position: absolute;
			}

			.token-panel {
				width: 140rpx;
				height: 604rpx;
				position: relative;

				.token-bg {
					width: 100%;
					height: 100%;
				}

				.token {
					left: 0;
					animation: token 2s infinite ease-in-out;
				}
			}

			.meta-panel {
				width: 184rpx;
				height: 514rpx;
				position: relative;

				.token-bg {
					width: 100%;
					height: 100%;
				}

				.alphameta {
					left: 36rpx;
					animation: token 2s infinite ease-in-out;
				}
			}

			.btc-panel {
				width: 184rpx;
				height: 740rpx;
				position: relative;

				.token-bg {
					width: 100%;
					height: 100%;
				}

				.btc {
					left: 36rpx;
					animation: token 5s infinite ease-in-out;
				}
			}

			.eth-panel {
				width: 134rpx;
				height: 866rpx;
				position: relative;

				.token-bg {
					width: 100%;
					height: 100%;
				}

				.eth {
					right: 0;
					animation: token 2s infinite ease-in-out;
				}
			}

		}

		.main-container {
			padding: 0 40rpx;

			.title {
				color: #F6F8FF;
				font-family: "Ubuntu Sans";
				font-size: 72rpx;
				font-weight: bold;
				line-height: 86rpx;
				margin-bottom: 24rpx;
			}

			.sub-title {
				font-size: 36rpx;
				font-family: "Inter";
				font-weight: 400;
				line-height: 44rpx;
				color: #5D6588;
				letter-spacing: -0.5rpx;
				margin-bottom: 72rpx;
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
	}

	@keyframes token {
		0% {
			top: 0;
		}

		50% {
			top: calc(100% - 136rpx);
		}

		100% {
			top: 0;
		}
	}
</style>