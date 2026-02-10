<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style  lang="scss">
	/*每个页面公共css */


	html,
	body,
	page {
		height: 100%;
		background: #141518;
	}
	
	page {
		min-height: 100vh;
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: border-box;
	}
	
	@font-face {
		font-family: "Ubuntu Sans";
		src: url("/static/fonts/UbuntuSans-Bold.ttf") format("truetype");
		font-weight: normal;
		font-style: normal;
	}
	
	@font-face {
		font-family: "Inter";
		src: url("/static/fonts/Inter-Light.ttf") format("truetype");
		font-weight: normal;
		font-style: normal;
	}
	
	.custom-tabbar {
		.u-tabbar__content{
			background-color: transparent !important;
		}
		.u-tabbar__content__item-wrapper {
			height: 120rpx !important;
			background-image: url('/static/home/tabbar-bg.png') !important;
			background-size: 750rpx 120rpx !important;
			background-repeat: no-repeat !important;
			background-color: transparent !important;
		}
	
		.u-tabbar-item__icon--mid-button {
			background-color: transparent !important;
			bottom: 20rpx !important;
		}
	
		.u-tabbar-item--mid-button-cover {
			height: 120rpx !important;
			background-color: transparent !important;
		}
	
		.tabbar-icon {
			width: 48rpx;
			height: 48rpx;
		}
	
		.scan-icon {
			width: 112rpx;
			height: 112rpx;
			margin-bottom: 80rpx;
		}
	
	
	}
</style>
