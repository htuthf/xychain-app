<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		ethers
	} from "ethers";
	import {
		filterAddress
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
				address: ''
			}
		},
		computed: {
			...mapGetters(['encryptedData', 'appPin']),
			fomartAddress() {
				if (!this.address) return ''
				const addres = this.address.toLocaleLowerCase().replace(/^0x/, 'AlphaMeta')
				return filterAddress(addres, 9, 4)
			}
		},
		methods: {
			handleGoto(type) {
				this.disabled = true

				uni.reLaunch({
					url: '/pages/home/home'
				})
				this.disabled = false;
			},
			async getAddress() {
				try {
					uni.showLoading({
						mask: true,
						title: ''
					})
					console.log(this.encryptedData)
					console.log(this.appPin)
					const wallet = await ethers.Wallet.fromEncryptedJson(this.encryptedData, this.appPin)

					console.log(wallet)
					this.address = wallet.address

				} catch (error) {
					console.error(error)
					//TODO handle the exception
				} finally {
					uni.hideLoading()
					// uni.hideLoading()
				}
			}

		},
		onReady() {
			const sysInfo = uni.getSystemInfoSync()
			const statusBarHeight = sysInfo.statusBarHeight + 12 // 状态栏
			this.navHeight = statusBarHeight + 44 // 44 = 自定义导航栏高度
		},
		onLoad() {
			this.getAddress()
		}
	}
</script>



<template>
	<view class="page-container">
		<custom-bar></custom-bar>
		<view class="page-body" :style="{paddingTop: navHeight + 'px'}">
			<view class="title">
				Import Account
			</view>
			<view class="sub-title">
				Select the wallet account to import.
			</view>
			<view class="address-container">
				<view class="address-title"> 
					Address
				</view>
				<view class="address-wrapper">
					<view class="left-wrapper">
						<view class="token-wrapper">
							<image src="/static/common/AlphaMeta.png" mode="widthFix" class="token-icon"></image>
						</view>
						<view class="address-text">
							{{fomartAddress}}
						</view>
					</view>
					<view class="radio-wrapper">
						<image src="/static/common/Radios.png" mode="widthFix" class="radios-icon"></image>
					</view>
				</view>
			</view>
			<view class="button-group">
				<button class="button" @click="handleGoto">
					<text>
						Import wallet
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
				margin-bottom: 56rpx;
			}

			.address-container {

				margin-bottom: 72rpx;

				.address-title {
					color: #ffffff;
					font-family: Inter;
					font-size: 28rpx;

					font-weight: 500;
					line-height: 44rpx;
					/* 21.7px */
					letter-spacing: -0.28px;
					margin-bottom: 16rpx;
				}

				.address-wrapper {
					display: flex;
					padding: 30rpx 32rpx;
					justify-content: space-between;
					align-items: center;

					border-radius: 12px;
					border: 1px solid #19212C;

					.left-wrapper {
						display: flex;
						grid-column-gap: 28rpx;
						align-items: center;

						.token-wrapper {
							width: 48rpx;
							height: 48rpx;

							.token-icon {
								width: 48rpx;
								height: 48rpx;
							}
						}

						.address-text {
							color: #ffffff;
							font-family: Inter;
							font-size: 32rpx;
							font-weight: 400;
							line-height: 50rpx;
							/* 25.6px */
							letter-spacing: -0.32px;
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

			background: linear-gradient(266deg, #002263 -0.27%, #1E68F6 98.58%, #246CF9 98.59%);



			&:after {
				content: none;
			}
		}

	}
</style>