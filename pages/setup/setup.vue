<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'

	import CustomBar from '@/components/customBar.vue'
	export default {
		components: {
			CustomBar
		},
		data() {
			return {
				navHeight: 44,
				version: '0.0.1',
				versionCode: 0,
				logoutPopup: false,
				overlayStyle: {
					background: 'rgba(52, 56, 76, 0.3)',
					backdropFilter: 'blur(2px)',
					webkitBackdropFilter: 'blur(2px)'
				}
			}
		},
		methods: {
			...mapActions(['setEncryptedData', 'setAppPin', 'setOffPayment']),
			getVersion() {
				//#ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid, async (widgetInfo) => {
					console.log(widgetInfo)
					version.value = widgetInfo.version;
					versionCode.value = widgetInfo.versionCode;
				});
				//#endif
			},
			handleOut() {
				this.logoutPopup = true
			},
			handleCancel() {
				this.logoutPopup = false
			},
			handleConfirm() {
				this.setEncryptedData(null)
				this.setOffPayment(false)
				this.setAppPin(null)
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			handleGo(page) {
				uni.navigateTo({
					url: page
				})
			}
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
		<custom-bar title="Set Up"></custom-bar>

		<view class="page-body" :style="{paddingTop: navHeight + 'px'}">
			<view class="cell-title">
				Account management
			</view>
			<view class="cell mb-28" @click="handleGo('/pages/accountManagement/accountManagement')">
				<view class="left-wrapper">
					<image src="/static/common/user.png" mode="widthFix" class="cell-icon"></image>
					<view class="cell-text">
						Account management
					</view>
				</view>
				<image src="/static/common/arrow-right.png" mode="widthFix" class="cell-right"></image>
			</view>

			<view class="cell-title">
				Security
			</view>
			<view class="cell mb-16" @click="handleGo('/pages/paymentSetting/paymentSetting')">
				<view class="left-wrapper">
					<image src="/static/common/lock.png" mode="widthFix" class="cell-icon"></image>
					<view class="cell-text">
						Payment settings
					</view>
				</view>
				<image src="/static/common/arrow-right.png" mode="widthFix" class="cell-right"></image>
			</view>

			<view class="cell mb-28" @click="handleGo('/pages/seedPhrase/seedPhrase')">
				<view class="left-wrapper">
					<image src="/static/common/security-safe.png" mode="widthFix" class="cell-icon"></image>
					<view class="cell-text">
						Seed Phrase
					</view>
				</view>
				<image src="/static/common/arrow-right.png" mode="widthFix" class="cell-right"></image>
			</view>

			<view class="cell-title">
				Set
			</view>
			<view class="cell mb-28" @click="handleGo('/pages/networkSettings/networkSettings')">
				<view class="left-wrapper">
					<image src="/static/common/global.png" mode="widthFix" class="cell-icon"></image>
					<view class="cell-text">
						Network Settings
					</view>
				</view>
				<image src="/static/common/arrow-right.png" mode="widthFix" class="cell-right"></image>
			</view>

			<view class="cell-title">
				Other
			</view>
			<view class="cell mb-16" @click="handleGo('/pages/aboutUs/aboutUs')">
				<view class="left-wrapper">
					<image src="/static/common/message-question.png" mode="widthFix" class="cell-icon"></image>
					<view class="cell-text">
						About us
					</view>
				</view>
				<image src="/static/common/arrow-right.png" mode="widthFix" class="cell-right"></image>
			</view>

			<view class="cell mb-16">
				<view class="left-wrapper">
					<image src="/static/common/notification.png" mode="widthFix" class="cell-icon"></image>
					<view class="cell-text">
						Edition
					</view>
				</view>
				<view class="version-text">
					{{version}}({{versionCode}})
				</view>
			</view>
			<view class="cell" @click="handleOut">
				<view class="left-wrapper">
					<image src="/static/common/logout.png" mode="widthFix" class="cell-icon"></image>
					<view class="cell-text">
						Logout
					</view>
				</view>
				<image src="/static/common/arrow-right.png" mode="widthFix" class="cell-right"></image>
			</view>
		</view>

		<u-popup :show="logoutPopup" :overlayStyle="overlayStyle" bgColor="transparent" mode="center">
			<view class="popup-body">
				<image src="/static/common/close.png" class="closed-icon" mode="widthFix" @click="handleCancel"></image>
				<view class="title">
					Are you sure you want to logout?
				</view>
				<view class="sub-title">
					Make sure you’ve saved your work or completed any ongoing tasks before logging out.
				</view>
				<view class="button-group">
					<button class="button primary" @click="handleCancel">
						<text>No</text>
					</button>
					<button class="button default" @click="handleConfirm">
						<text>Log Out</text>
					</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<style scoped lang="scss">
	.page-container {
		.page-body {
			padding: 0 40rpx 40rpx;

			.cell-title {
				color: #FFF;
				font-family: "Ubuntu Sans";
				font-size: 36rpx;
				font-style: normal;
				font-weight: 700;
				line-height: 155%;
				margin-bottom: 24rpx;
			}

			.mb-28 {
				margin-bottom: 56rpx;
			}

			.mb-16 {
				margin-bottom: 32rpx;
			}

			.cell {
				display: flex;
				height: 104rpx;
				padding: 0 24rpx;
				justify-content: space-between;
				align-items: center;

				border-radius: 24rpx;
				background: #1D1F25;

				.left-wrapper {
					display: flex;
					align-items: center;

					.cell-icon {
						width: 40rpx;
						height: 40rpx;
						margin-right: 16rpx;
					}

					.cell-text {
						color: #FFF;
						font-family: Inter;
						font-size: 28rpx;
						font-style: normal;
						font-weight: 500;
						line-height: 155%;
						/* 21.7px */
						letter-spacing: -0.28px;
					}


				}

				.version-text {
					color: #5D6588;
					text-align: right;

					/* Body/XSmall/Regular */
					font-family: Inter;
					font-size: 24rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 155%;
					/* 18.6px */
					letter-spacing: -0.24px;
				}

				.cell-right {
					width: 36rpx;
					height: 36rpx;
				}
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
			position: relative;

			.closed-icon {
				position: absolute;
				top: 64rpx;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
			}

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
				width: 380rpx;
				color: #ffffff;
				text-align: center;
				font-family: Inter;
				font-size: 36rpx;
				font-weight: 600;
				line-height: 46rpx;
				margin-bottom: 16rpx;
			}

			.sub-title {
				color: #5D6588;
				text-align: center;
				font-family: Inter;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 155%;
				/* 21.7px */
				letter-spacing: -0.28px;
				margin-bottom: 48rpx;
			}

			.button-group {
				width: 100%;
				display: flex;
				grid-column-gap: 24rpx;



			}

			.button {
				width: 100%;
				height: 104rpx;
				color: #FFF;
				text-align: center;
				font-family: "Ubuntu Sans";
				font-size: 32rpx;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				display: flex;
				align-items: center;
				justify-content: center;

				&.primary {
					border-radius: 100rpx;
					background: linear-gradient(266deg, #002263 -0.27%, #1E68F6 98.58%, #246CF9 98.59%);
				}

				&.default {
					border-radius: 100rpx;
					border: 1px solid #FFF;
					background-color: transparent;
				}

			}

		}
	}
</style>