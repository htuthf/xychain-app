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

<script>
	export default {
		props: {
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
		},
		data() {
			return {
				statusBarHeight: 0,
				navHeight: 44

			}
		},
		methods: {
			handleBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		mounted() {
			const sysInfo = uni.getSystemInfoSync()
			this.statusBarHeight = sysInfo.statusBarHeight + 12 // 状态栏
			this.navHeight = this.statusBarHeight + 44 // 44 = 自定义导航栏高度
			this.$emit('getNavHeight', this.navHeight)
		}
	}
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