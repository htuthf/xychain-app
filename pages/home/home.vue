<script>
	import socket from '@/plugins/socket.js'
	import {
		SOCKET_URL
	} from '@/config/index.js'
	import Home from '@/components/home.vue'
	import Rank from '@/components/rank.vue'
	import Browser from '@/components/browser.vue'
	import RWA from '@/components/rwa.vue'
	export default {
		components: {
			Home,
			Rank,
			Browser,
			RWA,
		},
		data() {
			return {
				tabActive: 'home',
				activePage: '',
				tokenList: {},
				rwaBlocks: {},
				marketStatus: {},
				collectionList: []
			}
		},
		methods: {
			changeTab(name) {
				console.log(name)
				switch (name) {
					case 'home':
						this.activePage = 'Home';
						this.tabActive = name;
						break;
					case 'rank':
						this.activePage = 'Rank';
						this.tabActive = name;
						break;
					case 'scan':
						uni.scanCode({
							onlyFromCamera: true, // 只允许相机扫码
							scanType: ['qrCode'], // 可加 barCode
							success: (res) => {
								console.log('扫码结果:', res.result)
								console.log('类型:', res.scanType)
							},
							fail: (err) => {
								console.log('扫码失败', err)
							}
						})
						break;
					case 'browser':
						this.activePage = 'Browser';
						this.tabActive = name;
						break;
					case 'raw':
						this.activePage = 'RWA';
						this.tabActive = name;
						break;
				}
			}
		},
		onLoad() {
			this.activePage = 'Home'
		},
		onShow() {
			const $this = this;
			socket.connectSocket(SOCKET_URL)
			socket.onMessage(data => {
				// console.log('socket data:', data)
				if (data.type === 'tickers_update') {
					$this.tokenList = data.data
				} else if (data.type === 'collection_update') {
					const findIndex = $this.collectionList.findIndex(item => item.symbol === data.symbol)

					if (findIndex > -1) {
						$this.collectionList.splice(findIndex, 1, {
							error: null,
							floorPriceETH: data.floorPriceETH,
							floorPriceUSDT: data.floorPriceUSDT,
							lastUpdate: data.lastUpdate,
							name: data.name,
							symbol: data.symbol,
						})
					}

				} else if (data.type === 'all_collections') {
					$this.collectionList = data.collections;
				} else if (data.type === 'stocks_update') {

					$this.rwaBlocks = data.data;
					$this.marketStatus = data.marketStatus || {}

				}
				// 
				// 假设后端推送的是数组
				// if (Array.isArray(data)) {
				// 	this.list = data
				// }
			})
		},
		onUnload() {
			socket.closeSocket()
			console.error('onUnload')
		},
		onHide() {
			socket.closeSocket()
			console.error('onHide')
		}
	}
</script>



<template>
	<view class="page-container">
		<component :tokenList="tokenList" :rankList="collectionList" :is="activePage" :blocks="rwaBlocks"
			:marketStatus="marketStatus"></component>
		<u-tabbar class="custom-tabbar" :value="tabActive" @change="changeTab" :fixed="true" :placeholder="false"
			:safeAreaInsetBottom="true">
			<u-tabbar-item text="Home" name="home">
				<image class="tabbar-icon" slot="active-icon" src="/static/home/home_active.png"></image>
				<image class="tabbar-icon" slot="inactive-icon" src="/static/home/home.png"></image>
			</u-tabbar-item>
			<u-tabbar-item text="Rank" name="rank">
				<image class="tabbar-icon" slot="active-icon" src="/static/home/rank_active.png"></image>
				<image class="tabbar-icon" slot="inactive-icon" src="/static/home/rank.png"></image>
			</u-tabbar-item>
			<u-tabbar-item text="" mode="midButton" name="scan">
				<image class="tabbar-icon scan-icon" slot="active-icon" src="/static/home/scan.png"></image>
				<image class="tabbar-icon scan-icon" slot="inactive-icon" src="/static/home/scan.png"></image>
			</u-tabbar-item>
			<u-tabbar-item text="Browser" name="browser">
				<image class="tabbar-icon" slot="active-icon" src="/static/home/brower_active.png"></image>
				<image class="tabbar-icon" slot="inactive-icon" src="/static/home/brower.png"></image>
			</u-tabbar-item>
			<u-tabbar-item text="RAW" name="raw">
				<image class="tabbar-icon" slot="active-icon" src="/static/home/rwa_active.png"></image>
				<image class="tabbar-icon" slot="inactive-icon" src="/static/home/rwa.png"></image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>
<style>

</style>
<style lang="scss">
	.page-container {
		box-sizing: border-box;
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	}
</style>