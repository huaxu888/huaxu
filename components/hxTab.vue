<template>
	<view class="hx_tab flex  padding-lr">
		<view class="flex justify-center align-center padding-sx tab_item" @tap="tabSelects" :class="index===0?'tapClass':''">
			<view class="text-sm">全部</view>
		</view>
		<view v-for="(item,i) of tabList" :key="i" class="flex justify-center align-center padding-sx tab_item" @tap="tabSelect(item,i)" :class="index===i+1?'tapClass':''">
			<view class="text-sm">{{item.StoreSortName}}</view>
		</view>
	</view>
</template>

<script>
export default{
	props:{
		tabList:{//标签的列表
			type:Array,
			default:()=>[],
		},
		showTabFlag:{//目标标签的样式改变
			type:Number,
			default:1
		},
		getData:{
			type:Object,
			default:()=>{},
		},
		infoList:{
			type:Array,
			default:[],
		}
	},
	data(){
		return {
			index:0,
			getData:{},
			infoList:[]
		}
	},
	methods:{
		tabSelect(obj,i){//点击图标的时候发生的事件
			this.$emit('tabSelect',obj)
			console.log(obj);
			console.log(i);
			this.index = i + 1
		},
		tabSelects(){
			this.index = 0
			this.$http.fenLeis(this.getData.storesortid,0,this.getData.SiteID,1,this.getData.page,10,this.getData.Location).then(res=>{
				this.infoList = res
			})
		}
	}
}
</script>

<style scoped>
	.tab_item{
		width:20%;
		border-radius: 80upx;
		color:black;
		background-color:rgb(240,240,239) ;
		border:1px solid rgba(0,0,0,0);
		transition:background-color 0.3s;color:0.3s;border-color:0.5s;
	}
	.tab_item:active{
		border:1px solid red;
		background-color:white;
		color: red;
	}
	.tapClass{
		background-color:white;
		color:red;
		border:1px solid red;
	}
</style>
