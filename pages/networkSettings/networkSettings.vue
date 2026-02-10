<script>
	import CustomBar from '@/components/customBar.vue'
	export default {
		components: {
			CustomBar
		},
		data() {
			return {
				navHeight: 44,
			}
		},
		methods: {

		},
		onReady() {
			const sysInfo = uni.getSystemInfoSync()
			const statusBarHeight = sysInfo.statusBarHeight + 12 // 状态栏
			this.navHeight = statusBarHeight + 44 // 44 = 自定义导航栏高度
		},
	}
</script>


<template>
	<view class="page-container">
		<custom-bar title="Account management"></custom-bar>

		<view class="page-body" :style="{paddingTop: navHeight + 'px'}">

			<view class="address-container">

				<view class="address-wrapper">
					<view class="left-wrapper">
						<view class="token-wrapper">
							<image src="/static/common/AlphaMeta.png" mode="widthFix" class="token-icon"></image>
						</view>
						<view class="address-content">
							<view class="title">
								AlphaMeta Mainnet
							</view>
							<view class="address-text">
								https://AlphaMeta-mainnet.tech
							</view>
						</view>

					</view>
					<view class="radio-wrapper">
						<image src="/static/common/check.png" mode="widthFix" class="radios-icon"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
	.page-container {
		.page-body {
			padding: 0 40rpx 40rpx;

			.address-container {



				.address-wrapper {
					display: flex;
					padding: 8rpx 12rpx 8rpx 8rpx;
					justify-content: space-between;
					align-items: center;
					border-radius: 24rpx;
					border: 1px solid #19212C;
					background: #0D0D0D;

					.left-wrapper {
						display: flex;
						grid-column-gap: 28rpx;
						align-items: center;

						.token-wrapper {
							width: 104rpx;
							height: 104rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 16rpx;
							background: #141518;

							.token-icon {
								width: 48rpx;
								height: 48rpx;
							}
						}

						.address-content {
							.title {
								color: #FFF;
								font-family: Inter;
								font-size: 32rpx;
								font-style: normal;
								font-weight: 400;
								line-height: 160%;
								/* 25.6px */
								letter-spacing: -0.32px;
							}

							.address-text {
								color: #6C757D;
								font-family: "Noto Sans";
								font-size: 24rpx;
								font-style: normal;
								font-weight: 400;
								line-height: 32rpx;
							}
						}
					}

					.radio-wrapper {
						width: 40rpx;
						height: 40rpx;

						.radios-icon {
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
			}
		}
	}
</style>