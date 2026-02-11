<script>
	import {
		ethers
	} from "ethers";

	import socket from '@/plugins/socket.js'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		formatEther,
		toThousands
	} from '@/plugins/index.js'

	import {
		request
	} from '@/plugins/request.js'
	export default {

		data() {
			return {
				balance: 0,
				statusBarHeight: 0,
				tokenList: []
			}
		},
		computed: {
			...mapGetters(['encryptedData', 'appPin']),
			formatBalance() {
				if (!this.balance) return 0
				return toThousands(this.balance)
			}
		},
		methods: {
			tokenDetails(type) {
				uni.navigateTo({
					url: `/pages/token/token?type=${type}`
				})
			},
			async getBalance() {
				try {
					uni.showLoading({
						mask: true,
						title: ''
					})

					const wallet = await ethers.Wallet.fromEncryptedJson(this.encryptedData, this.appPin)
					let {
						data
					} = await request({
						url: `/addresses/${wallet.address}`,
						method: 'get'
					})
					this.balance = formatEther(data.balance)
				} catch (e) {
					console.error(e)
					uni.showToast({
						title: e.reason,
						icon: 'none',
						// image: '/static/icon/choice.png',
						mask: true,
					})
				} finally {
					uni.hideLoading()
				}
			},
			handleGoPage(page) {
				uni.navigateTo({
					url: page
				})
			},
			goNext() {},
			clickMidButton() {},
		},

		mounted() {
			const sysInfo = uni.getSystemInfoSync()
			console.log(sysInfo)
			this.statusBarHeight = sysInfo.statusBarHeight + 12 // 鐘舵�佹爮
			this.navHeight = this.statusBarHeight + 44 // 44 = 鑷畾涔夊鑸爮楂樺害
			this.getBalance()
			const $this = this;
			socket.connectSocket()
			socket.onMessage(data => {
				// console./log('socket data:', data)
				$this.tokenList = data.data
				// 假设后端推送的是数组
				// if (Array.isArray(data)) {
				// 	this.list = data
				// }
			})
		}
	}
</script>
<template>
	<view class="page-body">
		<view class="header-container">
			<!-- <video src="/static/media/bg.mp4" autoplay loop muted playsinline :controls="false"	:show-center-play-btn="false" class="home-bg"></video> -->
			<!-- <image src="/static/home/homeBg.png" mode="widthFix" class="home-bg"></image> -->
			<image src="/static/Home_bg-750px.gif" mode="widthFix" class="home-bg"></image>
			<view class="header-body" :style="{paddingTop:statusBarHeight+'px'}">
				<view class="top-wrapper">
					<view class="left-wrapper">
						<view class="sub-title">
							Welcome
						</view>
						<view class="title">
							AlphaMeta
						</view>
					</view>
					<image src="/static/home/menu-icon.png" mode="widthFix" class="menu-icon"
						@click="handleGoPage('/pages/setup/setup')"></image>
				</view>

				<view class="balance-wrapper">
					<view class="balance-text">
						Total Balance
					</view>
					<view class="banlace-value">
						{{formatBalance}}
					</view>
				</view>
				<view class="group-wrapper">
					<view class="nav-item" @click="handleGoPage('/pages/recevied/recevied')">
						<image src="/static/home/Received.png" mode="widthFix" class="nav-icon"></image>
						<view class="text">
							Received
						</view>
					</view>
					<view class="nav-item">
						<image src="/static/home/topUp.png" mode="widthFix" class="nav-icon"></image>
						<view class="text">
							Top Up
						</view>
					</view>
					<view class="nav-item" @click="handleGoPage('/pages/node/node')">
						<image src="/static/home/node.png" mode="widthFix" class="nav-icon"></image>
						<view class="text">
							Node
						</view>
					</view>
					<view class="nav-item">
						<image src="/static/home/more.png" mode="widthFix" class="nav-icon"></image>
						<view class="text">
							More
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="page-main">
			<view class="top-wrapper">
				<view class="left-text">
					Token
				</view>
				<view class="right-text">
					View all
				</view>
			</view>
			<view class="list">
				<view class="token-item" @click="tokenDetails('AlphaMeta')">
					<view class="left-wrapper">
						<image src="/static/home/meta-token.png" mode="widthFix" class="token-icon"></image>
						<view class="name-wrapper">
							<view class="token-name">
								AlphaMeta
							</view>
							<view class="token-text">
								AlphaMeta
							</view>
						</view>
					</view>
					<view class="right-wrapper">
						<view class="balance-text">
							{{formatBalance}}
						</view>
						<!-- <view class="arrow-wrapper">
							<image src="/static/home/up-icon.png" mode="widthFix" class="arrow-icon"></image>
							<view class="arrow-text up">
								2.36%
							</view>
						</view> -->
					</view>
				</view>
				<view class="token-item" v-for="(item,key) in tokenList">
					<view class="left-wrapper">
						<image v-if="key==='eth'" src="/static/home/eth-token.png" mode="widthFix" class="token-icon">
						</image>
						<image v-if="key==='btc'" src="/static/home/btc-token.png" mode="widthFix" class="token-icon">
						</image>

						<view class="name-wrapper">
							<view class="token-name">
								{{key==='eth'?'Ethereum':key==='btc'?'Bitcoin':''}}
							</view>
							<view class="token-text">
								{{key.toUpperCase()}}
							</view>
						</view>
					</view>
					<view class="right-wrapper">
						<view class="balance-text">
							${{item.price}}
						</view>
						<view class="arrow-wrapper">
							<image v-if="item.change_percent>=0" src="/static/home/up-icon.png" mode="widthFix"
								class="arrow-icon"></image>
							<image v-else src="/static/home/down-icon.png" mode="widthFix" class="arrow-icon"></image>
							<view class="arrow-text " :class="item.change_percent>=0?'up':'down'">
								{{item.change_percent}}%
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
	.page-body {
		.page-main {
			background-color: #141518;
			position: relative;
			top: -140rpx;
			padding: 40rpx;
			border-top-left-radius: 48rpx;
			border-top-right-radius: 48rpx;
		}
	}

	.header-container {
		position: relative;

		.home-bg {
			width: 750rpx;
			height: 750rpx;
		}

		.header-body {
			position: absolute;
			width: 750rpx;
			height: 620rpx;
			box-sizing: border-box;
			left: 0;
			top: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-bottom: 24rpx;

			.top-wrapper {
				padding: 24rpx 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left-wrapper {
					.sub-title {
						color: #ffffff;

						font-family: Inter;
						font-size: 28rpx;
						font-weight: 400;
						line-height: 44rpx;
						/* 21.7px */
					}

					.title {
						color: #ffffff;

						font-family: Inter;
						font-size: 36rpx;
						font-weight: 500;
						line-height: 36rpx;
						/* 27.9px */
					}
				}

				.menu-icon {
					width: 96rpx;
					height: 96rpx;
				}
			}

			.balance-wrapper {
				.balance-text {
					color: #ffffff;
					text-align: center;
					font-family: Inter;
					font-size: 32rpx;
					font-weight: 400;
					line-height: 1;
					/* 25.6px */
					letter-spacing: -0.32px;
				}

				.banlace-value {
					color: #ffffff;
					text-align: center;
					font-family: Inter;
					font-size: 64rpx;
					font-weight: 600;
					line-height: 88rpx;
					/* 44.8px */
				}
			}

			.group-wrapper {
				padding: 24rpx 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.nav-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					gap: 12rpx;

					.nav-icon {

						width: 92rpx;
						height: 92rpx;

					}

					.text {
						color: #ffffff;
						text-align: center;
						font-family: Inter;
						font-size: 28rpx;
						font-style: normal;
						font-weight: 500;
						line-height: 44rpx;
					}
				}
			}

		}
	}

	.page-main {
		.top-wrapper {
			height: 44rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left-text {
				color: #FFF;
				text-align: center;
				font-family: Inter;
				font-size: 36rpx;

				font-weight: 500;

			}

			.right-text {
				color: #1E68F6;
				text-align: center;
				font-family: Inter;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 500;

			}
		}

		.list {
			.token-item {
				padding: 32rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #1E1F25;

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
							color: #ffffff;
							text-overflow: ellipsis;
							font-family: Inter;
							font-size: 32rpx;
							font-style: normal;
							font-weight: 500;
							line-height: 50rpx;
							/* 25.6px */
							letter-spacing: -0.32px;
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
						color: #D7DFEF;
						text-align: right;
						text-overflow: ellipsis;
						font-family: Inter;
						font-size: 28rpx;
						font-style: normal;
						font-weight: 500;
						line-height: 44rpx;
						/* 21.7px */
					}

					.arrow-wrapper {
						display: flex;
						align-items: center;
						justify-content: flex-end;

						.arrow-icon {
							width: 28rpx;
							height: 28rpx;
						}

						.arrow-text {
							overflow: hidden;
							text-align: right;
							text-overflow: ellipsis;
							font-family: Inter;
							font-size: 24rpx;
							font-weight: 400;
							line-height: 32rpx;

							/* 16.8px */
							&.up {
								color: #11CABE;
							}

							&.down {
								color: #FA2256;
							}
						}
					}
				}
			}
		}
	}
</style>