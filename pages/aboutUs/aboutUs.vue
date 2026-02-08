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

	const navHeight = ref(44)
	
	const version = ref('0.0.1')
	const versionCode = ref(0)
	const getVersion = () => {
		//#ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid, async (widgetInfo) => {
			console.log(widgetInfo)
			version.value = widgetInfo.version;
			versionCode.value = widgetInfo.versionCode;
		});
		//#endif
	}
	
	onReady(() => {
		uni.createSelectorQuery()
			.select('.header')
			.boundingClientRect(rect => {
				console.log('rect', )
				navHeight.value = rect.height + 20
			})
			.exec()
			getVersion()
	})
</script>

<template>
	<view class="page-container">
		<custom-bar title="About us"></custom-bar>

		<view class="page-body" :style="{paddingTop: navHeight + 'px'}">

			<view class="about-container">
				<image class="about-image" src="/static/common/aboutUs.png" mode="widthFix"></image>

				<view class="title">
					AlphaMeta
				</view>

				<view class="version">
					Version {{version}} ({{versionCode}})
				</view>
				<view class="cell">
					<view class="left-cell">
						Official website
					</view>
					<view class="right-cell">
						https://AlphaMeta.cn
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
	.page-container {
		.page-body {
			padding: 0 40rpx 40rpx;

		.about-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 66rpx 12rpx 8rpx 8rpx;
			justify-content: space-between;
			align-items: center;
			border-radius: 24rpx;
			
		
			.about-image {
				width: 160rpx;
				height: 160rpx;
			}
		
			.title {
				color: #FFF;
				text-align: center;
				font-family: Inter;
				font-size: 48rpx;
				font-style: normal;
				font-weight: 600;
				line-height: 150%;
				/* 36px */
				margin: 16rpx;
			}
		
			.version {
				color: #5D6588;
				text-align: center;
		
				/* Body/XSmall/Regular */
				font-family: Inter;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 155%;
				/* 18.6px */
				letter-spacing: -0.24px;
				margin-bottom: 8rpx;
			}
		
			.cell {
				width: 576rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 32rpx 0;
				border-bottom: 1px solid #19212C;
				.left-cell {
					color: #5D6588;
					
					/* Body/Small/Regular */
					font-family: Inter;
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 155%; /* 21.7px */
					letter-spacing: -0.28px;
				}
		
				.right-cell {
					color: #FFF;
					text-align: right;
					
					/* Body/Small/Medium */
					font-family: Inter;
					font-size: 28rpx;
					font-style: normal;
					font-weight: 500;
					line-height: 155%; /* 21.7px */
					letter-spacing: -0.28px;
				}
			}
		}
		}
	}
</style>