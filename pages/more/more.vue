<script setup>
	import {
		ref,
		computed
	} from "vue";
	import CustomBar from '@/components/customBar.vue'

	import {
		onLoad,
		onReady,
		onShow
	} from '@dcloudio/uni-app'

	const navHeight = ref(44)
	onReady(() => {
		uni.createSelectorQuery()
			.select('.header')
			.boundingClientRect(rect => {
				console.log('rect', )
				navHeight.value = rect.height + 20
			})
			.exec()
	})



	const handleCopy = () => {
		uni.setClipboardData({
			data: 'asdfas',
			success() {
				uni.showToast({
					title: 'Copy Success',
					icon: 'none'
				})
			}
		})
	}
</script>

<template>
	<view class="page-container">
		<custom-bar title="AlphaMeta Token" :is-right="true">
			<template #right>
				<image @click="handleScan" src="/static/common/scan.png" mode="widthFix" class="scan-icon"></image>
			</template>
		</custom-bar>

		<view class="page-body" :style="{paddingTop: navHeight + 'px'}">
			<view class="card-wrap">
				<image src="/static/node/nodeCard.png" mode="widthFix" class="card-bg"></image>
				<view class="card-content">
					<view class="top-wrapper">
						<view class="flex item-center space-between ">
							<view class="title">
								Instant Price
							</view>
							<image src="/static/node/refresh.png" mode="widthFix" class="refresh-icon"></image>
						</view>
						<view class="sub-title">
							Staking assets(AlphaMeta)
						</view>
					</view>
					<view class="bottom-wrapper flex item-center space-between">
						<view class="left-wrapper flex item-center">
							<image src="/static/node/send-icon.png" mode="widthFix" class="send-icon"></image>
							<view class="des-text">
								Instant increase
							</view>
						</view>
						<view class="right-wrapper">
							<text>4</text>
							<text>/</text>
							<text>03</text>
						</view>
					</view>

				</view>
			</view>

			<view class="button-group flex item-center space-between">
				<button class="btn disabled">
					<text>Deposit</text>
				</button>
				<button class="btn default">
					<text>Withdraw</text>
				</button>
			</view>
			<view class="title">
				Transaction Records
			</view>
			<view class="list-wrapper">
				<view class="text-tips">
					<view class="tips-title">
						Pending Launch
					</view>
					<view class="tips-text">
						Our Node is currently in development and has not been launched. We look forward to sharing it
						with you soon.
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
	.page-container {
		.scan-icon {
			width: 96rpx;
			height: 96rpx;
		}

		.page-body {
			padding: 0 40rpx 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.flex {
				display: flex;
			}

			.item-center {
				align-items: center;
			}

			.space-between {
				justify-content: space-between;
			}

			.card-wrap {
				position: relative;
				width: 670rpx;
				height: 374rpx;
				margin-bottom: 32rpx;

				.card-bg {
					position: absolute;
					width: 100%;
					height: 100%;
				}

				.card-content {
					box-sizing: border-box;
					height: 100%;
					position: relative;
					z-index: 1;
					padding: 32rpx 40rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.top-wrapper {


						.title {
							color: #FFF;
							font-family: Inter;
							font-size: 44rpx;

							font-weight: 600;
							line-height: 150%;
							/* 33px */
						}

						.refresh-icon {
							width: 40rpx;
							height: 40rpx;
						}

						.sub-title {
							margin-top: 4rpx;
							color: #FFF;
							font-family: Inter;
							font-size: 24rpx;
							font-weight: 400;
							line-height: 155%;
							/* 18.6px */
							letter-spacing: -0.24px;
						}
					}

					.bottom-wrapper {
						.left-wrapper {
							.send-icon {
								width: 48rpx;
								height: 48rpx;
								margin-right: 16rpx;
							}

							.des-text {
								color: #FFF;
								font-family: Inter;
								font-size: 24rpx;

								font-weight: 400;
								line-height: 155%;
								/* 18.6px */
								letter-spacing: -0.24px;
							}
						}

						.right-wrapper {
							color: #FFF;
							text-align: right;
							font-family: Inter;
							font-size: 24rpx;
							font-weight: 400;
							line-height: 150%;
							/* 18px */
							letter-spacing: -0.24px;
						}
					}

				}
			}


			.button-group {
				grid-column-gap: 30rpx;
				margin-bottom: 40rpx;

				.btn {
					box-sizing: border-box;
					display: flex;
					width: 320rpx;
					height: 88rpx;
					padding: 28rpx 20rpx;
					justify-content: center;
					align-items: center;

					border-radius: 88rpx;
					background: #272930;
					text-align: center;
					font-family: "Ubuntu Sans";
					font-size: 28rpx;
					font-weight: 500;

					&.disabled {
						color: #3D3F46;

					}

					&.default {

						color: rgba(255, 255, 255, 0.50);
						border: 1px solid rgba(255, 255, 255, 0.50);
					}
				}
			}

			.title {
				align-self: flex-start;
				color: #FFF;
				font-family: Inter;
				font-size: 36rpx;
				font-style: normal;
				font-weight: 500;
				line-height: 120%;
				/* 21.6px */
			}

			.list-wrapper {
				.text-tips {
					margin-top: 112rpx;
					width: 540rpx;

					.tips-title {
						color: #FFF;
						text-align: center;
						font-family: "Ubuntu Sans";
						font-size: 48rpx;
						font-weight: 700;
						line-height: 150%;
						/* 36px */
						margin-bottom: 16rpx;
					}

					.tips-text {
						color: #5D6588;
						text-align: center;
						font-family: Inter;
						font-size: 28rpx;
						font-weight: 400;
						line-height: 155%;
						/* 21.7px */
						letter-spacing: -0.28px;
					}
				}
			}
		}
	}
</style>