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
	import {
		storeToRefs
	} from 'pinia'
	import {
		useUserStore,useAppStore
	} from '@/store/index.js'
	const navHeight = ref(44)
	const userStore = useUserStore()
	const appStore = useAppStore()
	const {
		offPayment
	} = storeToRefs(appStore)
	onReady(() => {
		uni.createSelectorQuery()
			.select('.header')
			.boundingClientRect(rect => {
				console.log('rect', )
				navHeight.value = rect.height + 20
			})
			.exec()
	})

	const handleGo = (page) => {
		uni.navigateTo({
			url: page
		})
	}
	const overlayStyle = ref({
		background: 'rgba(52, 56, 76, 0.3)',
		backdropFilter: 'blur(2px)',
		webkitBackdropFilter: 'blur(2px)'
	})
	const offVerifyPopup = ref(false)
	const onVerifyPopup = ref(false)
	const successVerifyPopup = ref(false)
	const changeSwitch = (val) => {
		if (offPayment.value) {
			offVerifyPopup.value = true
		} else {
			onVerifyPopup.value = true
		}
	}

	const handleCancel = () => {
		offVerifyPopup.value = false
		onVerifyPopup.value = false
	}
	const handleOffConfirm = () => {
		uni.navigateTo({
			url: '/pages/offPaymentVerification/offPaymentVerification'
		})
	}

	const handleConfirm = () => {
		offPayment.value = !offPayment.value
		offVerifyPopup.value = false
		onVerifyPopup.value = false
		if (offPayment.value) {
			successVerifyPopup.value = true
		}
	}

	const handleClose = () => {
		successVerifyPopup.value = false
	}

</script>

<template>
	<view class="page-container">
		<custom-bar title="Set Up"></custom-bar>

		<view class="page-body" :style="{paddingTop: navHeight + 'px'}">
			<view class="cell-title mb-16">
				Payment settings
			</view>
			<view class="cell mb-12" @click="handleGo('/pages/changePwd/changePwd')">
				<view class="left-wrapper">
					<image src="/static/setup/gauge.png" mode="widthFix" class="cell-icon"></image>
					<view class="cell-text">
						Change Password
					</view>
				</view>
				<image src="/static/common/arrow-right.png" mode="widthFix" class="cell-right"></image>
			</view>
			<view class="cell mb-12" @click="handleGo('/pages/resetPwd/resetPwd')">
				<view class="left-wrapper">
					<image src="/static/setup/lock.png" mode="widthFix" class="cell-icon"></image>
					<view class="cell-text">
						Reset Password
					</view>
				</view>
				<image src="/static/common/arrow-right.png" mode="widthFix" class="cell-right"></image>
			</view>
			<view class="cell">
				<view class="left-wrapper">
					<image src="/static/setup/refresh-ccw.png" mode="widthFix" class="cell-icon"></image>
					<view class="cell-text">
						Payment Verification On/Off
					</view>
				</view>
				<up-switch v-model="offPayment" :asyncChange="true" activeColor="#1E68F6" inactiveColor="#1D1F25"
					@change="changeSwitch" class="custom-switch"></up-switch>
			</view>
		</view>



		<u-popup :show="offVerifyPopup" :overlayStyle="overlayStyle" mode="center">
			<view class="popup-body">
				<view class="title">
					Password Verification Off
				</view>
				<view class="sub-title">
					If you need to close, log in, transfer, pledge, and other related processes will not require
					password verification, whether to close
				</view>
				<view class="button-group">
					<button class="button primary" @click="handleCancel">
						<text>No</text>
					</button>
					<button class="button default" @click="handleOffConfirm">
						<text>Yes</text>
					</button>
				</view>
			</view>
		</u-popup>

		<u-popup :show="onVerifyPopup" :overlayStyle="overlayStyle" mode="center">
			<view class="popup-body">

				<view class="title">
					Password Verification On
				</view>
				<view class="sub-title">
					If it needs to be enabled, related processes such as login, transfer, and pledge will require
					password verification. Whether to enable it
				</view>
				<view class="button-group">
					<button class="button primary" @click="handleCancel">
						<text>No</text>
					</button>
					<button class="button default" @click="handleConfirm">
						<text>Yes</text>
					</button>
				</view>
			</view>
		</u-popup>
		<u-popup :show="successVerifyPopup" :overlayStyle="overlayStyle" mode="center">
			<view class="popup-body">
				<view class="title">
					Open successfully
				</view>
				<view class="sub-title">
					The password is successfully opened, and the relevant on-chain interactions will be password
					verified
				</view>
				<button class="button primary" @click="handleClose">
					<text>Done</text>
				</button>
			</view>
		</u-popup>
	</view>
</template>
<style lang="scss">
	.page-container {
		.custom-switch {
			.u-switch__node {
				background-color: #0D0D0D !important;
			}
		}

	}
</style>
<style scoped lang="scss">
	.page-container {
		.page-body {
			padding: 0 40rpx 40rpx;

			.cell-title {
				color: #FFF;
				font-family: "Ubuntu Sans";
				font-size: 32rpx;
				font-style: normal;
				font-weight: 500;
				line-height: 155%;
			}

			.mb-12 {
				margin-bottom: 24rpx;
			}

			.mb-16 {
				margin-bottom: 32rpx;
			}

			.cell {
				display: flex;
				height: 110rpx;
				padding: 0 32rpx;
				justify-content: space-between;
				align-items: center;
				border-radius: 24rpx;
				border: 0.5px solid rgba(255, 255, 255, 0.10);
				background: #131313;

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