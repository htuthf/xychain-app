<script>
	import CustomBar from '@/components/customBar.vue'
	export default {
		components: {
			CustomBar
		},
		props: {
			blocks: {
				type: Object,
				default: {}
			},
			marketStatus: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				navHeight: 44,
				sortType: true
			}
		},
		computed: {
			getSortData() {
				const stocksArray = Object.entries(this.blocks).map(([symbol, data]) => ({
					symbol: symbol, // 股票代码（如 META）
					price: parseFloat(data.price), // 转为数字类型的价格
					changePercent: parseFloat(data.change_percent) // 转为数字类型的涨跌幅
				}));

				if (this.sortType) {
					return [...stocksArray].sort((a, b) => a.changePercent - b.changePercent);
				} else {
					return [...stocksArray].sort((a, b) => b.changePercent - a.changePercent);
				}
			}
		},
		methods: {
			changeSortType() {
				this.sortType = !this.sortType
			},
			getIcon(icon) {
				switch (icon) {
					case 'NVDA':
						return '/static/rwa/nvda.png';
					case 'META':
						return '/static/rwa/meta.png';
					case 'TSLA':
						return '/static/rwa/tsla.png';
					case 'GOOG':
						return '/static/rwa/goog.png';
					case 'AAPL':
						return '/static/rwa/appl.png';
					case 'MSFT':
						return '/static/rwa/msft.png';
					case 'AMZN':
						return '/static/rwa/amzn.png';
					case 'TSM':
						return '/static/rwa/tsm.png';
					case 'AVGO':
						return '/static/rwa/avgo.png';
					case 'MU':
						return '/static/rwa/mu.png';
				}
			},
			swipeChange(index) {},
			swipeClick(index) {},
		},
		mounted() {
			const sysInfo = uni.getSystemInfoSync()
			const statusBarHeight = sysInfo.statusBarHeight + 12 // 鐘舵�佹爮
			this.navHeight = statusBarHeight + 44 // 44 = 鑷畾涔夊鑸爮楂樺害
		}
	}
</script>
<template>
	<view class="page-body">
		<custom-bar :is-back="false" title="RWA"></custom-bar>
		<view class="page-main" :style="{paddingTop: navHeight + 'px'}">
			<view class="title-cell">
				Hot
			</view>
			<view class="swiper">
				<swiper class="swiper-container">
					<swiper-item v-for="(item,key,index) in blocks" :key="index" :autoplay="true" :circular="true">
						<view class="swipe-item">
							<view class="top-wrapper">
								<view class="token-wrapper">
									<image :src="getIcon(key)" mode="widthFix" class="token-icon"></image>
									<view class="token-name">
										{{key}}
									</view>
								</view>
								<view class="token-value">
									<image v-show="item.change_percent>0" src="/static/home/up-icon.png" mode="widthFix"
										class="arrow-icon"></image>
									<image v-show="item.change_percent<=0" src="/static/home/down-icon.png"
										mode="widthFix" class="arrow-icon"></image>
									<view class="value-text" :class="item.change_percent<=0?'down-text':'up-text'">
										{{item.change_percent}}%
									</view>
								</view>
							</view>

							<view class="token-value">
								${{item.price}}
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>



			<view class="list-container">
				<view class="top-wrapper">
					<view class="left-text">
						Stock
					</view>
					<view class="right-text" @click="changeSortType">
						<view class="text">
							Market Cap
						</view>
						<view class="sort">
							<image src="/static/common/top.png" v-show="sortType" mode="widthFix"
								class="sort-icon active-top-icon">
							</image>
							<image src="/static/common/bottom.png" v-show="!sortType" mode="widthFix"
								class="sort-icon default-top-icon">
							</image>
							<image src="/static/common/top.png" v-show="!sortType" mode="widthFix"
								class="sort-icon active-bottom-icon">
							</image>
							<image src="/static/common/bottom.png" v-show="sortType" mode="widthFix"
								class="sort-icon default-bottom-icon"></image>
						</view>
					</view>
				</view>

				<view class="token-item" v-for="(item,index) in getSortData" :key="index">
					<view class="left-wrapper">
						<view class="image-wrap">
							<image :src="getIcon(item.symbol)" mode="widthFix" class="token-icon"></image>

						</view>

						<view class="name-wrapper">
							<view class="rank-wrapper">

								<view class="token-name">
									{{item.symbol}}
								</view>
							</view>

							<view class="token-text">
								$ {{item.price}}
							</view>
						</view>
					</view>
					<view class="right-wrapper">
						<!-- <view class="balance-text">
							{{item.amount}}M
						</view> -->
						<view class="arrow-wrapper">

							<image v-show="item.changePercent>0" src="/static/home/up-icon.png" mode="widthFix"
								class="arrow-icon"></image>
							<image v-show="item.changePercent<=0" src="/static/home/down-icon.png" mode="widthFix"
								class="arrow-icon"></image>
							<view class="arrow-text" :class="item.changePercent<=0?'down-text':'up-text'">
								{{item.changePercent}}%(24h)
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
			box-sizing: border-box;
			padding-left: 40rpx;
			padding-right: 40rpx;
		}
	}

	.title-cell {
		margin-bottom: 32rpx;
		color: #FFF;
		font-family: Inter;
		font-size: 36rpx;
		font-style: normal;
		font-weight: 500;
		line-height: 120%;
		/* 21.6px */
	}

	.up-text {
		color: #11CABE !important;
	}

	.down-text {
		color: #FA2256 !important;
	}

	.swiper {
		margin-bottom: 40rpx;
		border-radius: 24rpx;
		overflow: hidden;
		background-color: #1D1F25;

		.swiper-container {
			height: 188rpx;
		}

		.swipe-item {
			padding: 32rpx;
			display: flex;
			flex-direction: column;
			grid-row-gap: 16rpx;

			.top-wrapper {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.token-wrapper {
					display: flex;
					grid-column-gap: 16rpx;

					.token-icon {
						width: 48rpx;
						height: 48rpx;
					}

					.token-name {
						color: #ffffff;
						font-family: Inter;
						font-size: 32rpx;
						font-style: normal;
						font-weight: 400;
						line-height: 54rpx;
					}
				}

				.token-value {
					display: flex;
					align-items: center;
					grid-column-gap: 8rpx;

					.arrow-icon {
						width: 28rpx;
						height: 28rpx;
					}

					.value-text {
						color: #FA2256;
						text-align: right;
						font-family: Inter;
						font-size: 32rpx;
						font-style: normal;
						font-weight: 600;
						line-height: 54rpx;
					}
				}
			}

			.token-value {
				color: #ffffff;
				font-family: Inter;
				font-size: 40rpx;
				font-style: normal;
				font-weight: 600;
				line-height: 54rpx;
			}
		}
	}

	.group-wrapper {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 48rpx;
		margin-bottom: 40rpx;

		.item-wrapper {
			padding: 24rpx 32rpx;
			display: flex;
			align-items: center;
			grid-column-gap: 24rpx;
			border-radius: 24rpx;
			background: #1D1F25;

			.circle-icon {
				width: 72rpx;
				height: 72rpx;
			}

			.text-wrapper {
				.value {
					color: #FFF;
					font-family: Inter;
					font-size: 32rpx;
					font-weight: 500;
					line-height: 50rpx;
					letter-spacing: -0.32px;
				}

				.title {
					color: #5D6588;
					font-family: Inter;
					font-size: 28rpx;
					font-weight: 400;
					line-height: 44rpx;
					letter-spacing: -0.28px;
				}
			}
		}
	}

	.list-container {
		.top-wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left-text {
				color: #FFF;
				text-align: center;
				font-family: Inter;
				font-size: 36rpx;
				font-weight: 500;
				line-height: 44rpx;
				/* 21.6px */
			}

			.right-text {

				/* 19.6px */
				display: flex;

				.text {
					color: #1E68F6;
					text-align: center;
					font-family: Inter;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 40rpx;
				}

				.sort {
					width: 40rpx;
					height: 40rpx;
					display: flex;
					grid-row-gap: 4rpx;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					position: relative;

					.sort-icon {
						width: 12rpx;
						height: 8rpx;
					}

					.active-top-icon {
						transform: rotate(0)
					}

					.default-top-icon {
						transform: rotate(-180deg)
					}

					.active-bottom-icon {
						transform: rotate(-180deg)
					}

					.default-bottom-icon {
						transform: rotate(0)
					}
				}
			}
		}

		.token-item {
			padding: 32rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left-wrapper {
				display: flex;
				align-items: center;

				.image-wrap {
					width: 96rpx;
					height: 96rpx;
					margin-right: 24rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #1D1F25;
					border-radius: 96rpx;
				}

				.token-icon {
					width: 48rpx;
					height: 48rpx;
				}

				.name-wrapper {
					.rank-wrapper {
						display: flex;
						align-items: center;
						grid-column-gap: 8rpx;

						.rank-index {
							border-radius: 4rpx;
							background: rgba(30, 104, 246, 0.10);
							display: flex;
							padding: 2rpx 10rpx;

							color: #1E68F6;
							text-align: center;
							font-family: "Noto Sans";
							font-size: 20rpx;
							font-weight: 500;

						}
					}

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
</style>