<template>
	<view class="changeBusiness_item flex flex-direction bg-white"  @tap="goToDetail">
		<view class="padding-sm flex align-center gsmc_ justify-between" >
			<view class="flex">
				<text class="hxIcon-dianpu margin-right-sm text-red" style="font-size:40upx;"></text>
				<text class="text-bold text-lg" style="color:#333333">{{title}}</text>
			</view>
			<text class="cuIcon-right" style="font-size:30upx;color:#BFBFBF"></text>
		</view> 
		
		
		<view class="padding-lr-sm padding-bottom-sm flex justify-between align-center" style="line-height: 2em;">
			<view class="flex flex-direction  margin-left line_height_text">
				<text class=" padding-top-sm" style="color:#333333">{{isType==='shopList'?'执照名称':'提供消费额度'}}</text>
				<text  style="color:#BFBFBF" class="text-cut">{{header}}</text>
			</view>
			
			<view style="border-left:1px rgb(211,209,209) solid; width:2upx;height:2em" class="margin-lr"></view>
			
			<view class="flex flex-direction align-center  line_height_text" >
				<text class=" padding-top-sm" style="color:#333333">提交时间</text>
				<text  style="color:#BFBFBF">{{times}}</text>
			</view>
			
			<view style="border-left:1px rgb(211,209,209) solid; width:2upx;height:2em" class="margin-lr"></view>
			 
			<view  class="flex flex-direction align-center margin-right line_height_text" >
				<text class=" padding-top-sm" style="color:#333333">审核状态</text>
				<text  :class="state.class" class="ischeck_item padding-lr-sm">{{state.label}}</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			itemObj:{
				type:Object,
				default:()=>{},
			},
			isType:{
				type:String,
				default:'shopList'
			}
		},
//IsCheck//itemObj.state==='未通过'?'shop_state_noadopt':'shop_state_examining'
		computed:{
			header(){
				return this.isType==='shopList'?this.itemObj.StoreKeyWord:`接受预存额:${this.itemObj.Scores}`
			},
			title(){
				return this.isType==='shopList'?this.itemObj.StoreName:this.itemObj.Scores
			},
			times(){
				return this.time(this.itemObj.AddDate)
			},
			state(){
				if(this.isType==='shopList'){
					if(!this.itemObj.IsLock){
						if(this.itemObj.IsCheck){
							return {
								class:'shop_state_adopt',
								label:'已通过'
							}
						}else{
							return {
								class:'shop_state_noadopt',
								label:'未通过'
							}
						}
					}else{
						if(this.itemObj.IsCheck){
							return {
								class:'shop_state_examining',
								label:'锁定'
							}
						}else{
							return {
								class:'shop_state_noadopt',
								label:'未通过'
							}
						}
					}
				}else{
					if(this.itemObj.IsCheck){
						return {
							class:'shop_state_adopt',
							label:'通过'
						}
					}else{
						return {
							class:'shop_state_noadopt',
							label:'未通过'
						}
					}
				}
			}
			
		},
		methods:{
			time(date_){
				var date = new Date((date_.split('(')[1].split(")")[0])*1)//计算出时间				//转换成 xxx-xx-xx
				return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
			},
			goToDetail(){
				/*if(this.itemObj.IsLock){
					this.$api.msg('您申请的该店铺已锁定',2000)
					return 
				}*/
				if(this.isType==='shopList'){					
					if(this.itemObj.IsCheck){
						uni.navigateTo({
							url:`/pages/shopManagement/shopManagmentPage?StoreID=${this.itemObj.StoreID}&IsLock=${this.itemObj.IsLock}&list=yes`
						})
					}else {
						this.$api.msg('您申请的店铺暂时还未通过，请稍等',2000)
					}
					return 
				}else{
					// if(this.itemObj.IsCheck){
					// 	uni.navigateTo({
					// 		url:`/pages/shopManagement/sonPage/preStore/shopPrestoreDetailPage?FanLiID=${this.itemObj.FanLiID}`
					// 	})
					// }else{
					// 	this.$api.msg('您申请的预存暂时还未通过，请稍等',2000)
					// }
				}
			}
		}
	}
</script>

<style>
	.ischeck_item{
		border-radius: 8upx;
	}
	.line_height_text{
		line-height: 2em;
	}
	.line_height_text:first-child{
		max-width: 200upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.shop_state_adopt{/*通过*/
		/*background:rgb(95,178,87);*/
		color:rgb(95,178,87)
	}
	.shop_state_noadopt{/*未通过*/
		/*background: ;*/
		color:red
	}
	.shop_state_examining{/*锁定*/
		/*background: ;*/
		color:gray;
	}
	.changeBusiness_item{
		border-radius: 10upx;
	}
	
	.gsmc_{
		width:100%;
		position:relative
	}
	.gsmc_:before{
		position:absolute;
		content: '';
		width:92%;
		height:2upx;
		left:4%;
		right:4%;
		background:#DDDDDD;
		bottom:0px;
	}
</style>
