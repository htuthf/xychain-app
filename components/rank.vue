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
	import uCharts from '@qiun/ucharts'
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

		switch (type) {
			case 'account':

				console.log(inputWords.value)

				// const words = inputWords.value.join(' ')


				try {
					const words = 'siege also region glass find stairs frown adjust aunt guide float horn'
					const wallet = Wallet.fromPhrase(words)
					console.log(wallet)
					uni.navigateTo({
						url: '/pages/importAccount/importAccount'
					});

				} catch (error) {
					console.error(error)
					verifyPopup.value = true
					return false
					//TODO handle the exception
				} finally {
					disabled.value = false;
				}
				break;
			case 'create':
				uni.redirectTo({
					url: '/pages/create/create'
				})
				disabled.value = false;
				break;
		}
	}
	const initChart = () => {


		const ctx = uni.createCanvasContext('returnChart')



		const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		const values = [3, 5, 2, 7.36, 6, 3, 4]
		new uCharts({
			type: 'column',
			context: ctx,
			canvasId: 'returnChart',
			width: '100%',
			height: '100%',
			background: '#0f1115',
			animation: true,

			categories,
			series: [{
				name: 'Return',
				data: values,
				color: '#2a2d34'
			}],

			xAxis: {
				fontColor: '#6b7280',
				disableGrid: true
			},

			yAxis: {
				min: 0,
				max: 9,
				splitNumber: 3,
				gridType: 'dash',
				gridColor: '#2a2d34',
				fontColor: '#6b7280',
				format: v => v + '%'
			},

			tooltip: {
				showBox: true,
				bgColor: '#3b82f6',
				fontColor: '#fff',
				format: item => `Return\n${item.data}%`
			},

			extra: {
				column: {
					width: 32
				},
				barBorderRadius: [
					6,
					6,
					6,
					6
				]
			},

			// ⭐ 核心：绘制完成后手动画高亮
			afterDraw: (ctx, chartData) => {
				drawActiveColumn(ctx, chartData)
			}
		})
	}
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
	onLoad(() => {
		initChart()
	})
</script>

<template>
	<view class="page-body">
		<custom-bar :is-back="false" title="Rank"></custom-bar>
		<view class="page-main" :style="{paddingTop: navHeight + 'px'}">
			<view class="balance-wrapper">
				<view class="title">
					Statistics
				</view>
				<view class="balance-value">
					$625,895.89
				</view>
			</view>
			<view class="chart-contianer">
				<canvas id="returnChart" canvas-id="returnChart" class="chart-canvas" />
			</view>
			<view class="group-wrapper">
				<view class="item-wrapper">
					<image src="/static/home/circle_up.png" mode="widthFix" class="circle-icon"></image>
					<view class="text-wrapper">
						<view class="value">
							$54.24
						</view>
						<view class="title">
							Earnings
						</view>
					</view>
				</view>
				<view class="item-wrapper">
					<image src="/static/home/circle_down.png" mode="widthFix" class="circle-icon"></image>
					<view class="text-wrapper">
						<view class="value">
							$54.24
						</view>
						<view class="title">
							Return(24h)
						</view>
					</view>
				</view>
			</view>

			<view class="list-container">
				<view class="top-wrapper">
					<view class="left-text">
						Token
					</view>
					<view class="right-text">
						View all
					</view>
				</view>

				<view class="token-item" v-for="i in 10" :key="i">
					<view class="left-wrapper">
						<image src="/static/home/meta-token.png" mode="widthFix" class="token-icon"></image>
						<view class="name-wrapper">
							<view class="rank-wrapper">
								<view class="rank-index">{{i}}</view>
								<view class="token-name">
									AlphaMeta
								</view>
							</view>

							<view class="token-text">
								AlphaMeta
							</view>
						</view>
					</view>
					<view class="right-wrapper">
						<view class="balance-text">
							$45,43
						</view>
						<view class="arrow-wrapper">
							<image src="/static/home/up-icon.png" mode="widthFix" class="arrow-icon"></image>
							<view class="arrow-text up">
								2.36%
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

	.balance-wrapper {
		padding-top: 8rpx;
		padding-bottom: 48rpx;

		.title {
			color: #5D6588;

			font-family: Inter;
			font-size: 32rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 50rpx;
			/* 25.6px */
			letter-spacing: -0.32px;
		}

		.balance-value {
			color: #ffffff;
			font-family: Inter;
			font-size: 64rpx;
			font-style: normal;
			font-weight: 600;
			line-height: 88rpx;
			/* 44.8px */
		}
	}

	.chart-contianer {
		height: 410rpx;
		margin-bottom: 48rpx;

		.charts {
			height: 410rpx;
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
				color: #1E68F6;
				text-align: center;
				font-family: Inter;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 40rpx;
				/* 19.6px */
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

				.token-icon {
					width: 96rpx;
					height: 96rpx;
					margin-right: 24rpx;
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