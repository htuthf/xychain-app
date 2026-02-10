<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		ethers
	} from "ethers";

	import {
		Provider,
		toThousands,
		filterDate,
		formatEther,
		filterAddress
	} from '@/plugins/index.js'
	import {
		request
	} from '@/plugins/request.js'
	import CustomBar from '@/components/customBar.vue'
	export default {
		components: {
			CustomBar
		},
		data() {
			return {
				navHeight: 44,
				disabled: false,
				balance: 0,
				address: '',
				title: '',
				finished: false,
				history: [],
				query: {
					limit: 10,
					page: 0
				}
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
			handleGoto(type) {
				this.disabled = true

				uni.reLaunch({
					url: '/pages/home/home'
				})
				this.disabled = false;
			},
			async getBalance() {
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
					let provider = Provider()
					let data = await provider.getBalance(wallet.address)
					console.log('balance====>', data)
					this.balance = formatEther(data)


				} catch (error) {
					console.error(error)
					//TODO handle the exception
				} finally {
					uni.hideLoading()
				}
			},
			async getData() {
				try {
					this.query.page += 1

					let {
						data
					} = await request({
						url: `/addresses/${this.address}/transactions`,
						method: 'get',
						data: this.query
					})
					console.log(data)
					this.history = this.history.concat(data.items)

					if (data.items.length < this.query.limit) {
						this.finished = true
					}
				} catch (e) {
					console.error(e)
				}
			},
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
			handleReceived() {
				uni.navigateTo({
					url: '/pages/recevied/recevied'
				})
			},
			toThousands,
			filterDate,
			formatEther,

		},
		onReachBottom() {
			if (this.finished) {
				return false;
			}
			this.getData()
		},
		onReady() {
			const sysInfo = uni.getSystemInfoSync()
			const statusBarHeight = sysInfo.statusBarHeight + 12 // 状态栏
			this.navHeight = statusBarHeight + 44 // 44 = 自定义导航栏高度
		},
		async onLoad(options) {
			this.title = options.type + ' Token'
			await this.getBalance()
			this.getData()
		}
	}
</script>

<template>
	<view class="page-container">
		<custom-bar :title="title" bg-class="" :is-right="true">
			<template #right>
				<image @click="handleScan" src="/static/common/scan.png" mode="widthFix" class="scan-icon"></image>
			</template>
		</custom-bar>
		<scroll-view scroll-y="true" class="page-body">
			<view class="main">
				<view class="top-wrapper" :style="{paddingTop: navHeight + 'px'}">
					<view class="title">
						Total Balance
					</view>
					<view class="banlace-value">
						{{toThousands(balance)}}
					</view>
					<view class="button-group flex item-center space-between" @click="handleReceived">
						<button class="btn">
							<image src="/static/token/Received.png" mode="widthFix" class="btn-icon"></image>
							<text>Received</text>
						</button>
						<button class="btn">
							<image src="/static/token/TopUp.png" mode="widthFix" class="btn-icon"></image>
							<text>Top Up</text>
						</button>
					</view>
				</view>

				<view class="list-wrapper">
					<view class="list-title">
						Transaction Records
					</view>

					<view class="list">
						<view class="token-item" v-for="(item,index) in history">
							<view class="left-wrapper">
								<image v-show="item.tx_class==='eoa_transfer'" src="/static/token/received-icon.png"
									mode="widthFix" class="token-icon"></image>
								<view class="name-wrapper">
									<view class="token-name">
										Receive
									</view>
									<view class="token-text">
										{{filterDate(item.timestamp*1000)}}
									</view>
								</view>
							</view>
							<view class="right-wrapper">
								<view class="balance-text " :class="item.tx_class==='eoa_transfer'?'receive':'send'">
									{{item.tx_class==='eoa_transfer'?'+':'-'}} {{toThousands(formatEther(item.value))}}
								</view>
								<view class="time">
									{{filterDate(item.timestamp*1000,'hh:mm A')}}
								</view>
							</view>
						</view>

					</view>
				</view>

			</view>
		</scroll-view>


	</view>
</template>

<style scoped lang="scss">
	.page-container {
		.scan-icon {
			width: 96rpx;
			height: 96rpx;
		}

		.page-body {


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

			.main {
				.list {}
			}

			.top-wrapper {
				box-sizing: border-box;
				padding: 0 40rpx 40rpx;
				display: flex;
				height: 590rpx;
				flex-direction: column;
				align-items: center;
				justify-content: flex-end;
				border-radius: 0 0 48rpx 48rpx;
				background: rgba(29, 31, 37, 0.60);

				.title {
					color: #ffffff;
					text-align: center;
					font-family: Inter;
					font-size: 32rpx;
					font-weight: 400;
					line-height: 160%;
					/* 25.6px */
					letter-spacing: -0.32px;
					margin-bottom: -10rpx;
				}

				.banlace-value {
					margin-bottom: 28rpx;
					color: #ffffff;
					text-align: center;
					font-family: Inter;
					font-size: 64rpx;

					font-weight: 600;
					line-height: 140%;
					/* 44.8px */
				}

				.button-group {
					grid-column-gap: 30rpx;
					margin-bottom: 40rpx;

					.btn {
						box-sizing: border-box;
						display: flex;
						width: 320rpx;
						height: 96rpx;
						padding: 8rpx 8rpx 8rpx 6rpx;
						align-items: center;
						gap: 18rpx;


						border-radius: 96rpx;
						background: linear-gradient(266deg, #002263 -0.27%, #1E68F6 98.58%, #246CF9 98.59%);
						color: #ffffff;
						font-family: Inter;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 160%;
						/* 25.6px */
						letter-spacing: -0.32px;


						.btn-icon {
							width: 84rpx;
							height: 84rpx;
						}
					}
				}
			}





			.list-wrapper {
				padding: 40rpx;

				.list-title {
					align-self: flex-start;
					color: #FFF;
					font-family: Inter;
					font-size: 36rpx;
					font-style: normal;
					font-weight: 500;
					line-height: 120%;
					/* 21.6px */
				}
			}

			.list {
				.token-item {
					padding: 32rpx 0;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.left-wrapper {
						display: flex;
						align-items: center;

						.token-icon {
							width: 96rpx;
							height: 96rpx;
							margin-right: 24rpx;
						}

						.name-wrapper {

							.token-name {
								overflow: hidden;
								color: #FFF;
								text-overflow: ellipsis;
								font-family: Inter;
								font-size: 32rpx;
								font-style: normal;
								font-weight: 500;
								line-height: 160%;
								/* 25.6px */
								letter-spacing: -0.32px;
								margin-bottom: 4rpx;
							}

							.token-text {
								overflow: hidden;
								color: #5D6588;
								text-overflow: ellipsis;

								/* Body/XSmall/Regular */
								font-family: Inter;
								font-size: 24rpx;
								font-style: normal;
								font-weight: 400;
								line-height: 36rpx;
								/* 18.6px */
								letter-spacing: -0.24px;
							}
						}
					}

					.right-wrapper {
						.balance-text {
							overflow: hidden;

							text-align: right;
							text-overflow: ellipsis;
							font-family: Inter;
							font-size: 28rpx;
							font-style: normal;
							font-weight: 500;
							line-height: 155%;
							/* 21.7px */
							margin-bottom: 4rpx;

							&.send {
								color: #FA2256;
							}

							&.receive {
								color: #11CABE;
							}
						}

						.time {
							overflow: hidden;
							color: #5D6588;
							text-align: right;
							text-overflow: ellipsis;
							font-family: Inter;
							font-size: 24rpx;
							font-weight: 400;
							line-height: 155%;
							/* 18.6px */
							letter-spacing: -0.24px;
						}

					}
				}
			}
		}
	}
</style>