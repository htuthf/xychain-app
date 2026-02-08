<script setup>
	import {
		ref,
		shallowRef
	} from 'vue';

	import {
		onLoad,
		onReady,
		onShow
	} from '@dcloudio/uni-app'

	import Home from '@/components/home.vue'
	import Rank from '@/components/rank.vue'
	import Browser from '@/components/browser.vue'
	import RWA from '@/components/rwa.vue'
	const tabActive = ref('home')
	const activePage = shallowRef(null)
	const changeTab = (name) => {
		console.log(name)
		switch (name) {
			case 'home':
				activePage.value = Home;
				tabActive.value = name;
				break;
			case 'rank':
				activePage.value = Rank;
				tabActive.value = name;
				break;
			case 'scan':
				activePage.value = Home;
				break;
			case 'browser':
				activePage.value = Browser;
				tabActive.value = name;
				break;
			case 'raw':
				activePage.value = RWA;
				tabActive.value = name;
				break;
		}
	}

	onLoad(() => {
		activePage.value = Home
	})
</script>

<template>
	<view class="page-container">
		<component :is="activePage"></component>
		<up-tabbar class="custom-tabbar" backgroundColor="transparent" :border="false" :value="tabActive"
			@change="changeTab" :fixed="true" :placeholder="false" :safeAreaInsetBottom="true">
			<up-tabbar-item text="Home" name="home">
				<template #active-icon>
					<image class="tabbar-icon" src="/static/home/home_active.png"></image>
				</template>
				<template #inactive-icon>
					<image class="tabbar-icon" src="/static/home/home.png"></image>
				</template>
			</up-tabbar-item>
			<up-tabbar-item text="Rank" name="rank">
				<template #active-icon>
					<image class="tabbar-icon" src="/static/home/rank_active.png"></image>
				</template>
				<template #inactive-icon>
					<image class="tabbar-icon" src="/static/home/rank.png"></image>
				</template>
			</up-tabbar-item>
			<up-tabbar-item text="" mode="midButton" name="scan">
				<template #active-icon>
					<image class="scan-icon" src="/static/home/scan.png"></image>
				</template>
				<template #inactive-icon>
					<image class="scan-icon" src="/static/home/scan.png"></image>
				</template>
			</up-tabbar-item>
			<up-tabbar-item text="Browser" name="browser">
				<template #active-icon>
					<image class="tabbar-icon" src="/static/home/brower_active.png"></image>
				</template>
				<template #inactive-icon>
					<image class="tabbar-icon" src="/static/home/brower.png"></image>
				</template>
			</up-tabbar-item>
			<up-tabbar-item text="RAW" name="raw">
				<template #active-icon>
					<image class="tabbar-icon" src="/static/home/rwa_active.png"></image>
				</template>
				<template #inactive-icon>
					<image class="tabbar-icon" src="/static/home/rwa.png"></image>
				</template>
			</up-tabbar-item>
		</up-tabbar>
	</view>
</template>
<style>

</style>
<style lang="scss">
	.page-container {
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	}
</style>