<script setup>
	import {
		ref,
		computed
	} from "vue";
	import {
		onLoad,
		onReady,
		onShow,onUnload
	} from '@dcloudio/uni-app'

	import {
		storeToRefs
	} from 'pinia'
	import {
		useUserStore
	} from '@/store/index.js'
	import { filterAddress } from "@/plugins";
	const userStore = useUserStore()
	const {
		address
	} = storeToRefs(userStore)

	import CustomBar from '@/components/customBar.vue'

	const navHeight = ref(44)

	const getAddress = computed(()=>{
			return address.value.toLocaleLowerCase().replace(/^0x/, 'AlphaMeta')
	})
	const disabled = ref(false)

	const handleGoto = (type) => {
		disabled.value = true

		uni.reLaunch({
			url: '/pages/home/home'
		})
		disabled.value = false;
	}

	onReady(() => {
		uni.createSelectorQuery()
			.select('.header')
			.boundingClientRect(rect => {
				console.log('rect', )
				navHeight.value = rect.height
			})
			.exec()
	})
	function blockBack() {
	  history.pushState(null, '', location.href)
	}
	onUnload(() => {
		// #ifdef H5
		window.removeEventListener('popstate', blockBack)
		// #endif
	})
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
								{{filterAddress(getAddress,9,4)}}
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