<template>
	<view class="custom-bar header" :class="bgClass"
		:style="{ height: navHeight + 'px', paddingTop: statusBarHeight + 'px'}">
		<view class="back-block" v-if="isBack" @click="handleBack">
			<image class="back-icon" mode="widthFix" src="/static/common/back-icon.png"></image>
		</view>
		<view class="title-block">
			<view class="title">
				{{ title }}
			</view>
		</view>
		<view class="right-block" v-if="isRight">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad,
		onReady,
		onShow
	} from '@dcloudio/uni-app'

	defineProps({
		title: {
			type: String,
			default: ''
		},
		isBack: {
			type: Boolean,
			default: true
		},
		isRight: {
			type: Boolean,
			default: false
		},
		bgClass: {
			type: String,
			default: 'default'
		}
	})
	const emit = defineEmits(['getNavHeight', 'click'])
	const statusBarHeight = ref(0)
	const navHeight = ref(44)

	const handleBack = () => {
		uni.navigateBack({
			delta: 1
		})
	}
	onLoad(() => {
		const sysInfo = uni.getSystemInfoSync()
		statusBarHeight.value = sysInfo.statusBarHeight + 12 // 状态栏
		navHeight.value = statusBarHeight.value + 44 // 44 = 自定义导航栏高度
		emit('getNavHeight', navHeight.value)
	})
</script>

<style lang="scss">
	.custom-bar {
		position: fixed;
		width: 100vw;
		z-index: 999;
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;

		&.default {
			background: #141518;
		}

		.back-block {
			border-radius: 88rpx;
			background: rgba(26, 26, 26, 0.60);

			.back-icon {
				width: 88rpx;
				height: 88rpx;
			}
		}

		.title-block {
			position: absolute;

			left: 50%;
			transform: translateX(-50%);
			white-space: nowrap;

			.title {
				font-family: "Ubuntu Sans";
				font-size: 40rpx;
				font-weight: 700;
				color: #ffffff;
			}
		}

		.right-block {
			position: absolute;

			right: 40rpx;

			white-space: nowrap;
		}
	}
</style>