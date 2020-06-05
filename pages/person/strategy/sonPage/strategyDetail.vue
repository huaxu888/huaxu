<template>
	<view>
		<load-ing ref="loading"></load-ing>
		<cu-custom bgColor="bg-hx-white" :isBack="true" class="text-black">
			<block slot="left">返回</block>
			<block slot="content">攻略详情</block>
			<!-- #ifdef APP-PLUS -->
				<!-- <block slot="right" @tap="share"><text class="hxIcon-s padding-right" style="font-size:40upx"></text></block> -->
			<!-- #endif -->
		</cu-custom>
		<view style="width: 100vw; height:2upx;background: #F0F0F0;"></view>
				
		<view style="overflow: hidden;width: 100%;" class="flex justify-center padding .animate{animation:fadeIn 1s 1;}">
			<view class="bg-white">
				<rich-text :nodes="Content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default{
		data(){
			return {
				Content:[],
				getData:{
					nid:0,
					siteid:0
				}
			}
		},
		onLoad(route){
			this.getData.nid = route.nid
			this.getCurryInfo()
			// setTimeout(()=>{
			// 	this.$refs.loading.hidden()
			// },1000)
		},
		methods: {
			getCurryInfo() {
				return this.$Request.get(this.$store.state.huaxudetailUrl,this.getData).then(res=>{
					this.$refs.loading.hidden()
					let richtext = res.Content//取出富文本字符串
					const regex = new RegExp('<img', 'gi');//找到找对img标签
					richtext = richtext.replace(regex, `<img style="max-width: 100%;"`)//正则替换	
					this.Content = htmlParser(`<p style="font-size:0px">${richtext}</p>`)
				})
			}
		},
	}
</script>

<style>
</style>
