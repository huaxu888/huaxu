<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">绑定营业员</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">绑定营业员</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view class="content_list" >
			<view v-for="(item,i) of infoObj.list" :key="i" style="width: 100%;border-bottom:2upx solid #DDDDDD;" class="bg-white">
				<view class="padding flex align-center justify-between">
					
					<view class="flex align-center">
						<view class="cu-avatar round margin-right-sm" :style="{backgroundImage: `url(${item.FaceURL})` }">
						</view>
						
						<view class="flex flex-direction align-center margin-right-sm">
							<text class="margin-bottom-xs text-cut" style="max-width:175upx;">{{item.Nick}}</text>
							<text class="text-sm">{{item.Phone}}</text>
						</view>
						
						<view class="flex flex-direction align-center">
							<text class="text-sm margin-bottom-xs">营业员状态</text>
							<text class="text-sm">{{item.SQSort===1?'收银员':'店长'}}</text>
						</view>
					</view>

					<view class="flex padding-left-sm" style="border-left: 2upx solid #DDDDDD">
						<text v-if="SqSort != 1" class="padding-lr-xs  margin-right-xs  btn_item_" @tap="delItem(item)">删除</text>
						<text v-if="SqSort != 1" class="padding-lr-xs   margin-right-xs btn_item_" @tap="jurisdiction(item)">权限</text>
						<text class="padding-lr-xs  btn_item_" @tap="goToDetail(item)">详情</text>
					</view>
				</view>
			</view>
			
			<view class="flex flex-direction align-center margin-top" style="width: 100%" @tap="goAdd" v-if="yyyState===2">
				<text style="color: #ec3b46;font-size: 120upx;" class="hxIcon-tianjiashouyinyuan"></text>
				<text>请添加营业员</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		onLoad(route){
			this.routeObj=route
			this.getData.StoreID=route.StoreID
			this.SqSort = route.SqSort || 1
			console.log(this.SqSort);
			this.getCurryInfo()
		},
		onShow(){
			this.getCurryInfo()
		},
		data(){
			return{		
				routeObj:{},
				getData:{},
				SqSort: 1,
				infoObj:{
					list:[]
				}
			}
		},
		methods:{
			delItem(item){
				var data={
					SQID : item.SQID
				}
				this.$Request.get(this.$store.state.deletesyyUrl,data).then(res=>{
					if(res.IsSuccess){
						this.$api.msg(res.Msg,2000)
						this.getCurryInfo()
					}else{
						this.getCurryInfo()
					}
				})
			},
			getCurryInfo(){
				return this.$Request.get(this.$store.state.getsyylistUrl,this.getData).then(res=>{
					if(res.IsSuccess){
						this.infoObj.list=res.Data
						if(this.infoObj.list.length===0){
							this.$api.msg('暂无数据',2000)
						}
						return this.infoObj.list
					}
				})
			},
			goAdd(){
				console.log(this.getData.StoreID)
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/bindingCashier/addBinding?StoreID=${this.getData.StoreID}`
				})
			},
			jurisdiction(item){
				console.log(item)
				var title = "营业员收款权限";
				var content = item.SQSort===2?'是否取消店长管理权限':'是否给予店长管理权限';
				if(item.SQSort===2){
					var Sort = 1
				}else if(item.SQSort===1){
					var Sort = 2
				}
				var data={
					SQID:item.SQID,
					Sort
				}
				uni.showModal({
					title:title,
					content:content,
					success:(res)=>{
						console.log(data)
						if(res.confirm){//确认					
							this.$Request.get(this.$store.state.editsyyUrl,data).then(res=>{
								if(res.IsSuccess){
									this.$api.msg(res.Msg,2000)
									this.getCurryInfo()
								}
							})
						}else if(res.cancel){
							console.log(data)
						}
					},
					fail:(res)=>{
						console.log(res)
					}
				})
			},
			goToDetail(item){
				console.log(item)
				var PicUrl =item.FaceURL
				var Name = item.Name
				var Phone=item.Phone
				var UserID = item.UserID
				var storeid = item.StoreID
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/bindingCashier/bindingDetail?PicUrl=${PicUrl}&Name=${Name}&Phone=${Phone}&UserID=${UserID}&storeid=${storeid}`
				})
			}
		},
	}
</script>

<style>
	page{
		background: #F0F0F0;
	}
	.btn_item_{
		border:2upx solid #DDDDDD;
		border-radius: 10upx;
	}
</style>
