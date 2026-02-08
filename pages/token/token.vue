<script setup>
	import {
		ref,
		computed,
		reactive
	} from "vue";
	import CustomBar from '@/components/customBar.vue'

	import {
		onLoad,
		onReady,
		onShow,
		onReachBottom
	} from '@dcloudio/uni-app'
	import {
		formatEther
	} from 'ethers'
	import {
		Provider,
		toThousands,
		filterDate
	} from '@/plugins/index.js'
	import {
		request
	} from '@/plugins/request.js'
	const navHeight = ref(44)

	const title = ref('')
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
	const handleScan = () => {}
	const query = reactive({
		limit: 10,
		page: 0
	})
	const finished = ref(false)
	const history = ref([])
	const address = ref('')
	const getData = async () => {
		try {
			query.page += 1
			query.address = ''
			let {
				data
			} = await request({
				url: `/addresses/${address.value}/transactions`,
				method: 'get',
				data: query
			})
			console.log(data)
			history.value = history.value.concat(data.items)

			if (data.items.length < query.limit) {
				finished.value = true
			}


		} catch (e) {
			console.error(e)
		}
	}
	const balance = ref(0)
	const getBalance = async () => {
		try {
			let provider = Provider()
			let data = await provider.getBalance(address.value)
			console.log('balance====>', data)
			balance.value = formatEther(data)
			console.log(address.value)

			// this.balance = formatEther(balance)
		} catch (e) {
			console.error(e)
			uni.showToast({
				title: e.reason,
				icon: 'none',
				// image: '/static/icon/choice.png',
				mask: true,
			})

		}
	}
	
	const handleReceived = ()=>{
		uni.navigateTo({
			url:'/pages/recevied/recevied'
		})
	}
	onReachBottom(() => {
		if (finished.value) {
			return false;
		}
		getData()
	})
	onLoad(options => {
		console.log(options)
		title.value = options.type + ' Token'
		address.value = options.address
		getData()
		getBalance()
	})
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
						$ {{toThousands(balance)}}
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