<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-whitesss" :isBack="true" class="text-black">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">银行卡管理</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">银行卡管理</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view v-if="BankNos">
			<view>
				<u-swipe-action :show="item.show" :index="index" 
						v-for="(item, index) in list" :key="item.id" 
						@click="click" @open="open"
						:options="options">
					<view class="item u-border-bottom"   @tap="bindBank()">
						<view style="width: 100upx;height: 100upx;background-color: #000000;border-radius: 100upx;line-height: 100upx; text-align: center;">
							<text style="color: #ebe5c1;">{{chuLi(item.name)}}</text>
						</view>
						<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
						<view class="title-wrap" style="margin-left: 20upx;">
							<view style="margin-top: 10upx;">
								<text style="font-size: 30upx;">{{ item.title }}</text>
								<text style="padding: 6upx 12upx;;background-color: #ffe6e8;color: #fe5479;font-size: 24upx;margin-left: 10upx;border-radius: 5upx;">默认</text>
							</view>
							<view style="margin-top: 10upx;">
								<text style="color: #999999;">{{yinHang(item.BankNo)}}</text>
							</view>
						</view>
					</view>
				</u-swipe-action>
				
				<!-- <view class="text-center flex justify-between" style="background-color: #FFFFFF;margin-top: 30upx;padding:30upx;" @tap="bindBank()">
					<view>
						<text class="hxIcon-add" style="margin-right: 10upx;color: #999999;"></text>
						<text style="font-size: 28upx;">修改银行卡</text>
					</view>
					<view>
						<text class="hxIcon-rightArrow" style="font-size: 24upx;"></text>
					</view>
				</view> -->
			</view>
		</view>
		
		<view v-if="!BankNos">
			<view style="text-align: center;background-color: #FFFFFF;padding-top: 30upx;padding-bottom: 30upx;">
				<view style="font-size: 36upx;font-weight: 600;margin-bottom: 20upx;">
					<text>无银行账户</text>
				</view>
				<view style="font-size: 28upx;color:#999999;margin-bottom: 20upx;margin-top: 20upx;">
					<text>添加银行卡后</text>
				</view>
				<view style="font-size: 28upx;color:#999999">
					<text>将自动绑定银行账户</text>
				</view>
			</view>
			<view>
				<view class="text-center flex justify-between" style="background-color: #FFFFFF;margin-top: 30upx;padding:30upx;" @tap="bindBank()">
					<view>
						<text class="hxIcon-add" style="margin-right: 10upx;color: #999999;"></text>
						<text style="font-size: 28upx;">添加银行卡</text>
					</view>
					<view>
						<text class="hxIcon-rightArrow" style="font-size: 24upx;"></text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>


<script>
	export default {
		data() {
			return {
				list: [
					{
						id: 1,
						title: '',
						name: '',
						BankNo:'',
						show: false
					}
				],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				BankNos:'',
				StoreID:0,
				StoreBankID: 0
			}
		},
		onLoad(router) {
			
			this.StoreID = router.StoreID
			this.$Request.get(this.$store.state.getShopBankList,{StoreID: this.StoreID}).then(res=>{
				console.log(res);
				if(res.IsSuccess){
					this.list[0].title = res.Data[0].BankName
					this.list[0].BankNo = res.Data[0].BankNo
					this.list[0].name = res.Data[0].BankUserName
					this.BankNos = res.Data[0].BankNo
					this.StoreBankID = res.Data[0].StoreBankID
				}
			})
		},
		onShow() {
			
		},
		watch: {
			
		},
		methods: {
			chuLi(name){
				let newStr;
				if (name.length >= 2) {
					newStr = name.substr(0, 1) + '*';
				}
				return newStr;
			},	
			yinHang(bankNumber){
				return bankNumber.substr(0,4)+"********"+bankNumber.substr(-4);
			},
			bindBank(){
				uni.navigateTo({
					url:'/pages/person/bindBanks?StoreID=' + this.StoreID
				});
			},
			click(index, index1) {
				if(index1 == 1) {
					this.list.splice(index, 1);
					this.$u.toast(`删除了第${index}个cell`);
				} else {
					this.list[index].show = false;
					this.$u.toast(`删除成功`);
					this.list[0].title = '';
					this.list[0].BankNo = '';
					this.list[0].name = '';
				}
				
				this.$Request.get(this.$store.state.deletShopBank,{
					storebankid:this.StoreBankID}).then(res=>{
					this.list[0].title = '';
					this.list[0].BankNo = '';
					this.list[0].name = '';
					
					console.log(`删除成功`);
					uni.redirectTo({
						url:'/pages/person/bankCards',
					})
				})
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
		components: {}
	}
</script>

<style scoped lang="scss">
	page{
		background: #f8f8f8;
	}
	
	.item {
			display: flex;
			padding: 20rpx;
		}
		
	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
	
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
</style>

