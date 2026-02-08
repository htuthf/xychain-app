<template>
	<view>
		<web-view :src='src'></web-view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from "vue";
	import {
		onLoad,
		onReady,
		onShow
	} from '@dcloudio/uni-app'
	const src = ref('')
	onLoad((options) => {
		console.log(options.src)
		src.value = options.src
	})
</script>

<style>

</style>