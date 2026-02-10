<template>
	<view>
		<web-view :src='src'>
			
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					src:''
			}
		},
		methods: {
			
		},
		onLoad(option) {
			this.src=option.src
			console.log(option)
		}
	}
</script>

<style>

</style>
