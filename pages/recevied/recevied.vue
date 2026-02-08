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
		Wallet
	} from "ethers";
	import {
		storeToRefs
	} from 'pinia'
	import {
		useAppStore
	} from '@/store/index.js'
	const appStore = useAppStore()
	const {
		encryptedData,
		appPin
	} = storeToRefs(appStore)
	import {
		filterAddress
	} from "@/plugins";
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

	const handleScan = () => {

	}
	const address = ref('')
	const AlphaMetaAddress = ref('')
	const getWalletInfo = async () => {
		try {
			let data = await Wallet.fromEncryptedJson(encryptedData.value, appPin.value)
			console.log(data.address)
			address.value = data.address
			AlphaMetaAddress.value = data.address.toLocaleLowerCase().replace(/^0x/, 'AlphaMeta')
		} catch (error) {
			//TODO handle the exception
		}
	}
	const handleCopy = () => {
		uni.setClipboardData({
			data: address.value,
			success() {
				uni.showToast({
					title: 'Copy Success',
					icon: 'none'
				})
			}
		})
	}
	onLoad(() => {
		getWalletInfo()
	})
</script>

<template>
	<view class="page-container">
		<custom-bar title="Receive AlphaMeta" :is-right="true">
			<template #right>
				<image @click="handleScan" src="/static/common/scan.png" mode="widthFix" class="scan-icon"></image>
			</template>

		</custom-bar>

		<view class="page-body" :style="{paddingTop: navHeight + 'px'}">


			<view class="scan-title">
				Scan the QR code or copy the address to receive AlphaMeta
			</view>
			<view class="code-wrapper">
				<view class="code-content">
					<up-qrcode cid="ex4" :size="200" :val="address"></up-qrcode>
				</view>
				<view class="address-wrap">
					<image src="/static/common/AlphaMeta.png" mode="widthFix" class="token-icon"></image>
					<view class="address-text">
						{{filterAddress((AlphaMetaAddress))}}
					</view>
					<image src="/static/common/copy.png" @click="handleCopy" mode="widthFix" class="copy-icon"></image>
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

			.scan-title {
				color: #FCFCFD;
				text-align: center;
				font-family: Inter;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 40rpx;
				margin-bottom: 64rpx;
			}

			.code-wrapper {
				.code-content {
					width: 540rpx;
					height: 540rpx;

					border-radius: 40rpx;
					background: #0D0D0D;
					box-shadow: 0 0 80rpx 0 rgba(32, 38, 175, 0.06);
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 48rpx;
				}

				.address-wrap {
					display: flex;
					align-items: center;
					justify-content: center;
					grid-column-gap: 8rpx;

					.token-icon {
						width: 40rpx;
						height: 40rpx;
					}

					.address-text {
						color: #FCFCFD;
						text-align: center;
						font-family: Inter;
						font-size: 28rpx;
						font-style: normal;
						font-weight: 400;
						line-height: 40rpx;

					}

					.copy-icon {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}

		}
	}
</style>