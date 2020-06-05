<template>
	<view class="search_result">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">搜索结果</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">搜索结果</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view>
			<view v-for="(item,i) of infoList" :key="i">
				<search-content :itemObj="item"></search-content>
			</view>
		</view>
	</view>
</template>

<script>
	import {getPageAllInfo as searchPageMixins } from '../../mixins/qymMixins.js'
	import searchContent from "./components/searchContent"
	export default{
		mixins:[searchPageMixins],
		data(){
			return{
				keyWord:'',
				infoList:[],
				getData:{
					//siteid:,//站点id
					keyword:"",
					Location:""
				},
				searchUrl:this.$store.state.searchUrl,
				longitude:this.$store.state.longitude,
				latitude:this.$store.state.latitude,
			}
		},
		methods:{
			async getCurrentPageInfo(){//获取当前信息	
				this.getData.Location=`${this.longitude},${this.latitude}`
				let reslut = await this.getPageInfo(this.searchUrl,this.getData)
				if(reslut.length===0){
					this.$api.msg('暂无数据')
				}
			},
			back(){
				uni.navigateBack()
			}
		},
		components:{
			searchContent
		},
		onLoad(queryObj){
			this.getData.keyword=queryObj.keyword
			this.getCurrentPageInfo()
		},
		onReady(){
		}
	}
</script>

<style>
</style>
