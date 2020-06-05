<template>
	<view class="hx_tab flex justify-between padding-lr">
		<view v-for="(item,i) of tabList" :key="i" class="flex justify-center align-center padding-sx tab_item" @tap="tabSelect(item)" :class="showTabFlag===item.id?'tapClass':''">
			<view class="text-sm">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
export default{
	props:{
		tabList:{//标签的列表
			type:Array,
			default:()=>[{name:'离我最近',id:1},{name:'大家喜欢',id:2},{name:'热度最高',id:3},{name:'新店推荐',id:4}],
		},
		showTabFlag:{//目标标签的样式改变
			type:Number,
			default:1
		}
		
	},
	methods:{
		tabSelect(obj){//点击图标的时候发生的事件
			this.$emit('tabSelect',obj)
		},
		
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
