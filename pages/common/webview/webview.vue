<template>
	<view class="webview-page">
	    <web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
        onLoad(option) {
            if (option.url) {
                this.url = option.url
            }
        },
		methods: {
			
		}
	}
</script>

<style>

</style>
