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
		Wallet,
		encryptKeystoreJson
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

	const keyboard = ref([{
			code: 1,
			text: ''
		}, {
			code: 2,
			text: 'ABC'
		}, {
			code: 3,
			text: 'DEF'
		}, {
			code: 4,
			text: 'GHI'
		}, {
			code: 5,
			text: 'JKL'
		}, {
			code: 6,
			text: 'MNO'
		}, {
			code: 7,
			text: 'PQRS'
		}, {
			code: 8,
			text: 'TUV'
		}, {
			code: 9,
			text: 'WXYZ'
		}, {
			code: 'space',
			text: ''
		},
		{
			code: 0,
			text: ''
		},
		{
			code: 'delete',
			text: ''
		}
	])
	const pin = ref('')
	const verifyPopup = ref(false)
	const handleClose = () => {
		pin.value = ''
		verifyPopup.value = false
	}

	const appStore = useAppStore()
	const {
		offPayment,
		appPin,
		encryptedData
	} = storeToRefs(appStore)
	const offVerifyPopup = ref(false)
	const handleInput = async (code) => {
		try {
			pin.value += code
			let pinLength = pin.value.length;
			if (pinLength >= 6) {
				const wallet = await Wallet.fromEncryptedJson(encryptedData.value, appPin.value)
				offPayment.value = true
				offVerifyPopup.value = true

			}
		} catch (error) {
			//TODO handle the exception
			verifyPopup.value = true
			return false
		}
	}
	const handleDelete = () => {
		pin.value = pin.value.substring(0, pin.value.length - 1)
	}


	const handleBack = () => {
		offVerifyPopup.value = false
		uni.navigateBack({
			delta: 1
		});
	}

	onReady(() => {
		uni.createSelectorQuery()
			.select('.header')
			.boundingClientRect(rect => {
				navHeight.value = rect.height
			})
			.exec()
	})
</script>

<template>
	<view class="page-container">
		<custom-bar title="Payment settings"></custom-bar>
		<view class="page-body" :style="{paddingTop: navHeight + 'px'}">
			<view class="title">
				Payment Verification Off
			</view>
			<view class="sub-title">
				Enter initial password
			</view>
			<view class="pin-container">
				<view class="pin-dot" :class="{actived:pin.length>=i,focus:pin.length+1===i}" v-for="i in 6" :key="i">

				</view>
			</view>
			<view class="keyboard-block">
				<view class="key-block" v-for="(item,index) in keyboard" :key="index">
					<button :disabled="pin.length>6" @click="handleInput(item.code)" hover-class="click-class"
						class="button" v-if="item.code!=='space'&&item.code!=='delete'">
						<text class="key-code">{{item.code}}</text>
						<text class="key-text">{{item.text}}</text>
					</button>
					<button hover-class="click-class" class="button" :class="{delete:item.code==='delete'}"
						v-if="item.code==='delete'" @click="handleDelete">
						<image src="/static/common/delete-icon.png" class="deltet-icon" mode="widthFix"></image>
					</button>
				</view>
			</view>
		</view>


		<u-popup :show="verifyPopup" :overlayStyle="overlayStyle" mode="center">
			<view class="popup-body">
				<view class="error-wrape">
					<image src="/static/common/error-icon.png" mode="widthFix" class="error-icon"></image>
				</view>

				<view class="title">
					Wrong password
				</view>
				<view class="sub-title">
					Do you need to reset the password? If so, click Yes
				</view>
				<button class="button" @click="handleClose">
					<text>Done</text>
				</button>

			</view>
		</u-popup>

		<u-popup :show="offVerifyPopup" :overlayStyle="overlayStyle" mode="center">
			<view class="popup-body">
				<view class="title">
					Closed successfully
				</view>
				<view class="sub-title">
					The password is closed successfully, and the relevant on-chain interactions will not be verified by
					password
				</view>
				<button class="button primary" @click="handleBack">
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
				margin-bottom: 96rpx;
			}



			.pin-container {
				display: grid;
				justify-content: center;
				grid-template-columns: repeat(6, 1fr);
				grid-column-gap: 16rpx;

				.pin-dot {
					height: 96rpx;
					border-radius: 20rpx;
					border: 1px solid #1D1F25;
					background: #0D0D0D;
					position: relative;

					&.actived {
						&:before {
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);
							content: '';
							width: 20rpx;
							height: 20rpx;
							border-radius: 20rpx;
							background-color: #ffffff;
						}
					}

					&.focus {
						border-color: #1E68F6;

						&:before {
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);
							content: '丨';
							color: #ffffff;
							animation: blink 1s steps(1) infinite;
						}
					}
				}
			}
		}

		.keyboard-block {
			position: absolute;
			width: 750rpx;
			left: 0;
			bottom: 0;
			padding: 12rpx 12rpx 0 12rpx;
			padding-bottom: calc(104rpx + env(safe-area-inset-bottom));
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-gap: 14rpx 10rpx;





			.key-block {
				.button {
					height: 92rpx;
					line-height: inherit;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					border-radius: 10rpx;
					background: #0D0D0D;
					box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.30);


					&.delete {
						background: transparent;
					}

					&[disabled] {
						background-color: transparent;
					}

					&.click-class {
						background: #333333;
					}

					&::after {
						content: none;
					}
				}

				.key {}

				.key-code {
					color: #e4e4e4;
					font-size: 50rpx;
					font-family: Inter;
				}

				.key-text {
					color: #e4e4e4;
					font-family: Inter;
					font-size: 20rpx;
					font-weight: 700;
					letter-spacing: 2px;
				}

				.deltet-icon {
					width: 46rpx;
					height: 34rpx;
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

	@keyframes blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}
</style>