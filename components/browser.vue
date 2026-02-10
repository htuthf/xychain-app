<script>
	import CustomBar from '@/components/customBar.vue'

	export default {
		components: {
			CustomBar
		},
		data() {
			return {
				navHeight: 44,
				tabActive: 'DeFi',
				tokenList: {
					DeFi: [{
							icon: '/static/brower/OpenSea@2x.png',
							title: 'OpenSea',
							url: 'https://opensea.io/'
						},
						{
							icon: '/static/brower/BLUR@2x.png',
							title: 'BLUR',
							url: 'https://blur.io/'
						},
						{
							icon: '/static/brower/LarvaLabs@2x.png',
							title: 'LarvaLabs',
							url: 'https://www.larvalabs.com/'
						},
						{
							icon: '/static/brower/Rarible@2x.png',
							title: 'Rarible',
							url: 'https://rarible.com/'
						},
						{
							icon: '/static/brower/SuperRare@2x.png',
							title: 'SuperRare',
							url: 'https://superrare.com/'
						},
						{
							icon: '/static/brower/Foundation@2x.png',
							title: 'Foundation',
							url: 'https://foundation.app/'
						}
					],
					NFTs: [{
							icon: '/static/brower/Ethereum@2x.png',
							title: 'Ethereum',
							url: 'https://ethereum.org/'
						}, {
							icon: '/static/brower/Polygon@2x.png',
							title: 'Polygon',
							url: 'https://polygon.com/'
						}, {
							icon: '/static/brower/Binance Chain@2x.png',
							title: 'Binance Chain',
							url: 'https://www.bnbchain.org/'
						}, {
							icon: '/static/brower/Arbitrum@2x.png',
							title: 'Arbitrum',
							url: 'https://arbitrum.io/'
						}, {
							icon: '/static/brower/Optimism@2x.png',
							title: 'Optimism',
							url: 'https://www.optimism.io/'
						},
						{
							icon: '/static/brower/Solana@2x.png',
							title: 'Solana',
							url: 'https://solana.com/'
						},
					]
				}
			}
		},
		computed: {
			getToken() {
				return this.tokenList[this.tabActive]
			}
		},
		methods: {
			changeTab(name) {
				this.tabActive = name
			},
			handleGo(row) {
				uni.navigateTo({
					url: `/pages/webview/webview?src=${row.url}`
				})
			}
		},
		mounted() {
			const sysInfo = uni.getSystemInfoSync()
			const statusBarHeight = sysInfo.statusBarHeight + 12 // 状�栏
			this.navHeight = statusBarHeight + 44 // 44 = 自定义导航栏高度
		}
	}
</script>
<template>
	<view class="page-body">
		<custom-bar :is-back="false" title="Browser"></custom-bar>
		<view class="page-main" :style="{paddingTop: navHeight + 'px'}">
			<view class="browser-card">
				<view class="left-wrapper">
					<view class="title">
						Your Web 3 Nacigator
					</view>
					<view class="sub-title">
						The easiest way to discover web3 For the curious !
					</view>
				</view>
				<view class="image-wrapper">
					<image src="/static/home/browser_image.png" mode="widthFix" class="browser-image"></image>
				</view>
			</view>
			<view class="title-cell">
				Bookmarks
			</view>
			<view class="tabs">
				<view class="tab" :class="{active:tabActive==='DeFi'}" @click="changeTab('DeFi')">DeFi</view>
				<view class="tab" :class="{active:tabActive==='NFTs'}" @click="changeTab('NFTs')">NFTs</view>
			</view>


			<view class="list-container">

				<view class="token-item" v-for="(item,index) in getToken" :key="index" @click="handleGo(item)">
					<view class="left-wrapper">
						<image :src="item.icon" mode="widthFix" class="token-icon"></image>
						<view class="name-wrapper">
							<view class="token-name">
								{{item.title}}
							</view>
							<view class="token-text">
								{{item.subTitle}}
							</view>
						</view>
					</view>
					<view class="right-wrapper">
						<image src="/static/token/link.png" mode="widthFix" class="link-icon"></image>
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

	.browser-card {
		display: flex;
		align-items: center;
		padding: 24rpx 32rpx;
		gap: 20rpx;
		border-radius: 24rpx;
		background: #1D1F25;
		margin-top: 8rpx;
		margin-bottom: 44rpx;

		.left-wrapper {
			.title {
				color: #ffffff;
				font-family: Inter;
				font-size: 32rpx;
				font-style: normal;
				font-weight: 600;
				line-height: 106%;
				margin-bottom: 8rpx;
			}

			.sub-title {
				color: #5D6588;
				font-family: Inter;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 155%;
				/* 21.7px */
				letter-spacing: -0.28px;
			}
		}


		.image-wrapper {
			width: 204rpx;
			height: 176rpx;
			aspect-ratio: 51/44;

			.browser-image {
				width: 100%;
				height: 100%;
			}
		}
	}


	.title-cell {
		color: #FFF;
		font-family: Inter;
		font-size: 36rpx;
		font-style: normal;
		font-weight: 500;
		line-height: 120%;
		/* 21.6px */
	}

	.tabs {
		display: flex;
		align-items: center;
		grid-column-gap: 16rpx;
		margin: 24rpx 0 32rpx 0;

		.tab {
			border-radius: 48rpx;
			display: flex;
			padding: 16rpx 32rpx;
			align-items: center;
			justify-content: center;
			border: 1px solid #272933;
			color: #ffffff;

			&.active {
				color: #272933;
				border: 1px solid #272933;
				background: #FCFCFD;
			}

		}
	}

	.list-container {

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
				.link-icon {
					width: 40rpx;
					heigh: 40rpx;
				}
			}
		}
	}
</style>