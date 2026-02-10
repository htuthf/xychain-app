<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		ethers
	} from "ethers";

	import {
		toThousands,
		filterDate,
		formatEther,
		filterAddress
	} from '@/plugins/index.js'

	import CustomBar from '@/components/customBar.vue'
	import uQRCode from '@/plugins/uqrcode.js' //引入uqrcode.js

	export default {
		components: {
			CustomBar
		},
		data() {
			return {
				navHeight: 44,
				disabled: false,
				AlphaMetaAddress: '',
				address: '',
			}
		},
		computed: {
			...mapGetters(['encryptedData', 'appPin']),
			fomartAddress() {
				if (!this.address) return ''
				const addres = this.address.toLocaleLowerCase().replace(/^0x/, 'AlphaMeta')
				return filterAddress(addres, 9, 4)
			},
			formatBalance() {
				if (!this.balance) return 0
				return toThousands(this.balance)
			}
		},
		methods: {
			handleScan() {
				uni.scanCode({
					onlyFromCamera: true, // 只允许相机扫码
					scanType: ['qrCode'], // 可加 barCode
					success: (res) => {
						console.log('扫码结果:', res.result)
						console.log('类型:', res.scanType)
					},
					fail: (err) => {
						console.log('扫码失败', err)
					}
				})
			},
			async getWalletInfo() {
				try {
					uni.showLoading({
						title: '',
						mask: true,
					})
					let data = await ethers.Wallet.fromEncryptedJson(this.encryptedData, this.appPin)
					console.log(data.address)
					this.address = data.address
					this.AlphaMetaAddress = data.address.toLocaleLowerCase().replace(/^0x/, 'AlphaMeta')
				} catch (error) {
					//TODO handle the exception
				} finally {
					uni.hideLoading()
				}
			},
			handleCopy() {
				uni.setClipboardData({
					data: this.address,
					success() {
						uni.showToast({
							title: 'Copy Success',
							icon: 'none'
						})
					}
				})
			},
			initQrCode() {
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.address,
					size: 200,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: uQRCode.errorCorrectLevel.H,
					success: res => {}
				})
			},
			filterAddress
		},
		onReady() {
			const sysInfo = uni.getSystemInfoSync()
			const statusBarHeight = sysInfo.statusBarHeight + 12 // 状态栏
			this.navHeight = statusBarHeight + 44 // 44 = 自定义导航栏高度
		},
		async onLoad() {
			await this.getWalletInfo()
			this.initQrCode()
		}
	}
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
					<canvas canvas-id="qrcode" style="width: 200px;height:200px;margin: 0 auto;" />
					<!-- <up-qrcode cid="ex4" :size="200" :val="address"></up-qrcode> -->
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