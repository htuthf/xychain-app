<script setup>
	import {
		ref,
		computed,
		nextTick
	} from "vue";
	import {
		onLoad,
		onReady,
		onShow
	} from '@dcloudio/uni-app'
	import {
		Wallet
	} from "ethers";
	import {
		pickRandomIndexes,
		verifyMnemonic
	} from "@/plugins";

	import CustomBar from '@/components/customBar.vue'

	const navHeight = ref(44)
	const overlayStyle = ref({
		background: 'rgba(52, 56, 76, 0.3)',
		backdropFilter: 'blur(2px)',
		webkitBackdropFilter: 'blur(2px)'
	})

	const disabled = ref(false)
	const inputWords = ref([])



	const verifyPopup = ref(false)
	const handleClose = () => {
		inputWords.value = []
		verifyPopup.value = false
	}


	const handleGoto = (type) => {
		disabled.value = true

	}

	const blocks = ref([{
		icon: '/static/rwa/nvda.png',
		title: 'NVDA AlphaMeta',
		price: 0.3454364,
		amount: 41.83,
		rate: 2.36
	}, {
		icon: '/static/rwa/goog.png',
		title: 'GOOG AlphaMeta',
		price: 0.3454364,
		amount: 41.83,
		rate: 2.36
	}, {
		icon: '/static/rwa/appl.png',
		title: 'AAPL AlphaMeta',
		price: 0.3454364,
		amount: 41.83,
		rate: 2.36
	}, {
		icon: '/static/rwa/msft.png',
		title: 'MSFT AlphaMeta',
		price: 0.3454364,
		amount: 41.83,
		rate: 2.36
	}, {
		icon: '/static/rwa/amzn.png',
		title: 'AMZN AlphaMeta',
		price: 0.3454364,
		amount: 41.83,
		rate: 2.36
	}, {
		icon: '/static/rwa/meta.png',
		title: 'META AlphaMeta ',
		price: 0.3454364,
		amount: 41.83,
		rate: -2.36
	}, {
		icon: '/static/rwa/tsm.png',
		title: 'TSM AlphaMeta',
		price: 0.3454364,
		amount: 41.83,
		rate: 2.36
	}, {
		icon: '/static/rwa/tsla.png',
		title: 'TSLA AlphaMeta',
		price: 0.3454364,
		amount: 41.83,
		rate: -2.36
	}, {
		icon: '/static/rwa/avgo.png',
		title: 'AVGO AlphaMeta',
		price: 0.3454364,
		amount: 41.83,
		rate: 2.36
	}, {
		icon: '/static/rwa/mu.png',
		title: 'MU AlphaMeta',
		price: 0.3454364,
		amount: 41.83,
		rate: 2.36
	}])


	const sortType = ref(true)
	const changeSortType = () => {
		sortType.value = !sortType.value
	}
	const getSortData = computed(() => {
		return [...blocks.value].sort((a, b) => {
			if (sortType.value) {
				return a.rate - b.rate
			} else {
				return b.rate - a.rate
			}
		})
	})
	const swipeChange = (index) => {}
	const swipeClick = (index) => {}
	onLoad(async () => {
		await nextTick()
		uni.createSelectorQuery()
			.select('.header')
			.boundingClientRect(rect => {
				console.log('rect', rect)
				navHeight.value = rect.height
			})
			.exec()
	})
</script>

<template>
	<view class="page-body">
		<custom-bar :is-back="false" title="RWA"></custom-bar>
		<view class="page-main" :style="{paddingTop: navHeight + 'px'}">

			<view class="title-cell">
				Hot
			</view>
			<view class="swiper">
				<up-swiper :height="94" :circular="true" :list="blocks" @change="swipeChange" @click="swipeClick"
					bgColor="#1D1F25">
					<template v-slot:default="{item}">
						<view class="swipe-item">
							<view class="top-wrapper">
								<view class="token-wrapper">
									<image :src="item.icon" mode="widthFix" class="token-icon"></image>
									<view class="token-name">
										{{item.title}}
									</view>
								</view>
								<view class="token-value">
									<image v-show="item.rate>0" src="/static/home/up-icon.png" mode="widthFix"
										class="arrow-icon"></image>
									<image v-show="item.rate<=0" src="/static/home/down-icon.png" mode="widthFix"
										class="arrow-icon"></image>
									<view class="value-text" :class="item.rate<=0?'down-text':'up-text'">
										{{item.rate}}%
									</view>
								</view>
							</view>

							<view class="token-value">
								${{item.price}}
							</view>
						</view>
					</template>
				</up-swiper>
			</view>



			<view class="list-container">
				<view class="top-wrapper">
					<view class="left-text">
						Stock
					</view>
					<view class="right-text">
						<view class="text">
							Market Cap
						</view>
						<view class="sort" @click="changeSortType">
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
							<image :src="item.icon" mode="widthFix" class="token-icon"></image>

						</view>

						<view class="name-wrapper">
							<view class="rank-wrapper">

								<view class="token-name">
									{{item.title}}
								</view>
							</view>

							<view class="token-text">
								$ {{item.price}}
							</view>
						</view>
					</view>
					<view class="right-wrapper">
						<view class="balance-text">
							{{item.amount}}M
						</view>
						<view class="arrow-wrapper">
							
							<image v-show="item.rate>0" src="/static/home/up-icon.png" mode="widthFix"
								class="arrow-icon"></image>
							<image v-show="item.rate<=0" src="/static/home/down-icon.png" mode="widthFix"
								class="arrow-icon"></image>
							<view class="arrow-text" :class="item.rate<=0?'down-text':'up-text'">
								{{item.rate}}%(24h)
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