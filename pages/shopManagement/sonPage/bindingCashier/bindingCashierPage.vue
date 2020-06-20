<template>
	<view>
		<view v-if="infoObj.list.length == 0">
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-colors" class="text-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content"></block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="backText"></block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
			
			<view class="flex flex-direction align-center" style="width: 100%;background-color: rgb(250, 222, 189);height: 800upx;margin-bottom: 50upx;">
				<text style="background-image: url(https://img.huaxuapp.com/yggl_03.png);width: 90upx;height: 90upx;
				background-repeat: no-repeat;background-size: cover;margin-top: 80upx;" ></text>
				<text style="font-size: 42upx;font-weight: 800;margin-top: 30upx;">员工管理</text>
				<text style="margin-top: 40upx;font-size: 28upx;">添加店员到员工管理，可以协助门店生意</text>
				<view style="width: 380upx;padding: 20upx 0;text-align: center;background-color: #a36926;color: #FFFFFF;
					margin-top: 50upx;border-radius: 16upx;font-size: 34upx;" @tap="goAdd"><text>添加员工</text>
				</view>
			</view>
			
			<view style="height: 1000upx;position: absolute;top: 690upx;background-color: #FFFFFF;width: 100%;border-radius: 40upx 40upx 0 0;">
				<view style="padding-top: 50upx;">
					<view><text style="font-size: 36upx;font-weight: 800;margin-left: 30upx;">店长被添加后可以做什么？</text></view>
					<view class="hxIcon-weibiaoti-- whats"><text class="whatss">拥有店铺功能管理权</text></view>
					<view class="hxIcon-quanxian whats"><text class="whatss">拥有店铺收款和提现权限</text></view>
					<view class="hxIcon-shoukuanguanli whats"><text class="whatss">查看门店收款详情</text></view>
					<view class="hxIcon-add-staff whats"><text class="whatss">添加收银员</text></view>
				</view>
				<view>
					<view><text style="font-size: 36upx;font-weight: 800;margin-left: 30upx;margin-top: 30upx;">收银员被添加后可以做什么？</text></view>
					<view class="hxIcon-quanxian whats"><text class="whatss">拥有店铺收款权限</text></view>
					<view class="hxIcon-shoukuanguanli whats"><text class="whatss">查看个人收款详情</text></view>
				</view>
			</view>		
		</view>
	
	
		<view  v-if="infoObj.list.length > 0">
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-colorss" class="text-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">员工管理</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="backText">员工管理</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
			<!-- <view class="content_list" >
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
			</view> -->
			<!-- <view style="padding: 15upx 0;border-bottom: 1px solid #ececec;">
				<u-collapse style="padding: 0 30upx;">
					
						<u-collapse-item title="店长" style="font-weight: 600;">
							<view style="font-weight: normal;" class="flex" v-for="(item,i) of infoObj.list" :key="i" v-if="item.SQSort == 2">
								<view><image :src="item.FaceURL ? item.FaceURL : 'https://img.huaxuapp.com/mrtx.png'" mode="aspectFill" class="touxiang"></image></view> 
								<view style="margin-left: 20upx;font-weight: 600;color: #000000;">{{item.Nick}}<view style="font-weight: normal;margin-top: 6upx;color: #b5b5b5;">{{item.Phone}}</view> </view> 
							</view>
						</u-collapse-item>
						<u-collapse-item title="收银员" style="font-weight: 600;">
							<view style="font-weight: normal;" class="flex" v-for="(item,i) of infoObj.list" :key="i" v-if="item.SQSort == 1">
								<view><image :src="item.FaceURL ? item.FaceURL : 'https://img.huaxuapp.com/mrtx.png'" mode="aspectFill" class="touxiang"></image></view> 
								<view style="margin-left: 20upx;font-weight: 600;color: #000000;">{{item.Nick}}<view style="font-weight: normal;margin-top: 6upx;color: #b5b5b5;">{{item.Phone}}</view> </view> 
							</view>
						</u-collapse-item>
						
				</u-collapse>
			</view> -->
			<view>
				<view class="flex" style="padding: 30upx 30upx;justify-content: space-between;border-bottom: 1px solid #ececec;" @tap="dian">
					<text style="font-weight: 600;">店长({{lengths}})</text><text :class="[indexs==1?'cuIcon-unfold':'cuIcon-right']"></text>
				</view>
				<block v-for="(item, index) in list" :key="index" v-if="indexs==1">
					<u-swipe-action btn-width="180" :show="item.show" :index="index" @click="click"
					 @open="open" :options="optionss">
					 
						<view class="item u-border-bottom" v-if="item.SQSort==2" @tap="goToDetail(item)">
							<image mode="aspectFill" :src="item.FaceURL" class="touxiang"/>
							<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
							<view class="title-wrap" style="margin-left: 20upx;">
								<text class="title u-line-2" style="font-size: 34upx;">{{ item.Nick }}</text>
								<text class="title u-line-2" style="margin-top: 5upx; color: #999999;">{{ item.Phone }}</text>
							</view>
						</view>
					</u-swipe-action>
				</block>
				
				<view class="flex" style="padding: 30upx 30upx;justify-content: space-between;border-bottom: 1px solid #ececec;" @tap="shou">
					<text style="font-weight: 600;">收银员({{lengthss}})</text><text :class="[indexs==2?'cuIcon-unfold':'cuIcon-right']"></text>
				</view>
				
				<block v-for="(item, index) in list" :key="index"  v-if="indexs==2">
					
					<u-swipe-action  btn-width="160" :show="item.show" :index="index" @click="clicks"
					@open="open" :options="options" v-if="SqSort!=1">
					
						<view class="item u-border-bottom" v-if="item.SQSort==1" @tap="goToDetails(item)">
							<image mode="aspectFill" :src="item.FaceURL" class="touxiang"/>
							<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
							<view class="title-wrap"  style="margin-left: 20upx;">
								<text class="title u-line-2" style="font-size: 34upx;">{{ item.Nick }}</text>
								<text class="title u-line-2" style="margin-top: 5upx; color: #999999;">{{ item.Phone }}</text>
							</view>
						</view>
					</u-swipe-action>
					
					<u-swipe-action  btn-width="160" :show="item.show" :index="index" @click="clicks"
					@open="open" :options="options" v-if="SqSort==1" disabled>
					
						<view class="item u-border-bottom" v-if="item.SQSort==1" @tap="goToDetails(item)">
							<image mode="aspectFill" :src="item.FaceURL" class="touxiang"/>
							<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
							<view class="title-wrap"  style="margin-left: 20upx;">
								<text class="title u-line-2" style="font-size: 34upx;">{{ item.Nick }}</text>
								<text class="title u-line-2" style="margin-top: 5upx; color: #999999;">{{ item.Phone }}</text>
							</view>
						</view>
					</u-swipe-action>
				</block>
			</view>
			
			<view class="flex flex-direction align-center" style="width: 100%;" v-if="SqSort != 1">
				<view style="width: 380upx;padding: 20upx 0;text-align: center;border: 1px solid #000000;
					margin-top: 50upx;border-radius: 16upx;font-size: 34upx;" @tap="goAdd"><view class="hxIcon-add" style="font-size: 36upx;"><text style="margin-left: 20upx;">添加员工</text></view>
				</view>
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
				},
				infoObjs:{
					list:[]
				},
				infoObjss:{
					list:[]
				},
				indexs: 0,
				list: [],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [
					{
						text: '设为店长',
						style: {
							backgroundColor: '#f5ddc2',
							color: '#7b5e36'
						}
					},
					{
						text: '移除',
						style: {
							backgroundColor: '#ee6640',
						}
					}
				],
				optionss: [
					{
						text: '设为收银员',
						style: {
							backgroundColor: '#f5ddc2',
							color: '#7b5e36'
						}
					},
					{
						text: '移除',
						style: {
							backgroundColor: '#ee6640'
						}
					}
				],
				index1: 0,
				lengths: 0,
				lengthss: 0
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
						this.infoObj.list = res.Data
						this.list = res.Data
						
						let arr = []
						let arrs = []
						if(this.list.length > 0){
							this.list.forEach(res => {
								if(res.SQSort == 1){
									arr.push(res)
									if(arr.length >= 0){
										this.lengthss = arr.length
										this.lengths = arrs.length
									}
								}else if(res.SQSort == 2){
									arrs.push(res)
									if(arrs.length >= 0){
										this.lengths = arrs.length
										this.lengthss = arr.length
									}
								}
								
							})
						}
						
						// if(this.infoObj.list.length===0){
						// 	this.$api.msg('暂无数据',2000)
						// }
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
							// if(this.lengths == 1){
							// 	this.lengths = 0
							// }
							// if(this.lengthss == 1){
							// 	this.lengthss = 0
							// }
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
				var Name = item.Nick
				var Phone=item.Phone
				var UserID = item.UserID
				var storeid = item.StoreID
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/bindingCashier/bindingDetail?PicUrl=${PicUrl}&Name=${Name}&Phone=${Phone}&UserID=${UserID}&storeid=${storeid}`
				})
			},
			goToDetails(item){
				console.log(item)
				var PicUrl =item.FaceURL
				var Name = item.Nick
				var Phone=item.Phone
				var UserID = item.UserID
				var storeid = item.StoreID
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/bindingCashier/bindingDetails?PicUrl=${PicUrl}&Name=${Name}&Phone=${Phone}&UserID=${UserID}&storeid=${storeid}`
				})
			},
			dian(){
				if(this.indexs == 1){
					this.indexs = 0
				} else {
					this.indexs = 1
				}
			},
			shou(){
				if(this.indexs == 2){
					this.indexs = 0
				} else {
					this.indexs = 2
				}
			},
			click(index, index1) {
				if(index1 == 1) {
					this.delItem(this.list[index])
				} else {
					this.list[index].show = false;
					this.index1 = index1;
					this.jurisdiction(this.list[index])
				}
			},
			clicks(index, index1) {
				if(index1 == 1) {
					this.delItem(this.list[index])
				} else {
					this.list[index].show = false;
					this.jurisdiction(this.list[index])
				}
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if(index != idx) this.list[idx].show = false;
				})
			}
		},
	}
</script>

<style>
	/* page{
		background: #F0F0F0;
	} */
	page {
		background: #FFFFFF;
	}
	.btn_item_{
		border:2upx solid #DDDDDD;
		border-radius: 10upx;
	}
	
	.whats {
		margin: 50upx 60upx;
		color: #aeaeae;
		font-size: 34upx;
	}
	
	.whatss {
		margin: 0 30upx;
		color: #000000;
		font-size: 30upx;
	}
	
	.touxiang {
		width: 90upx;
		height: 90upx;
		border-radius: 12upx;
		margin-top: 25upx;
	}
	
	.item {
		display: flex;
		padding: 20rpx;
	}
	
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
</style>
