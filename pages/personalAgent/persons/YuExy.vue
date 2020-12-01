<template>
	<view>
		<cu-custom bgColor="bg-whitesss" class="text-black" :isBack="true" style="border-bottom: 2upx solid #e4e4e4;">
			<block slot="content">{{Title}}</block>
		</cu-custom>
		
		<view style="padding: 0 50upx;">
			<rich-text :nodes="htmlNodes"></rich-text>
		</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default {
		components: {
			
		},
		data() {
			return {
				htmlNodes:[],
				Title:''
			}
		},
		onLoad(option) {
			this.$http.yuExy(0).then(res => {
				var richtext = res.Content //取出富文本字符串
				const regex = new RegExp('<img', 'gi'); //找到找对img标签
				richtext = richtext.replace(regex, `<img style="max-width: 100%;"`) //正则替换
				res.Content = richtext //重新赋值
				this.htmlNodes = htmlParser(res.Content);
				this.Title = res.Title
			})
		},
		onShow() {
			
		},
		
		methods: {
			
		},
		onPullDownRefresh() {
		
		},
		onReachBottom() {
			
		},
	}
</script>


<style>
	page{
		background: #FFFFFF;
	}
</style>

<style scoped>
	
</style>
