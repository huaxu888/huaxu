<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-whitesss" :isBack="true" class="text-black">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">选择到账方式</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">选择到账方式</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		
		<view style="height: 30upx;background-color: #f1f1f1;">
			
		</view>
		
		<view v-if="BankNos">
			<view v-for="(item, index) in list" :key="index" @tap="zheLi(item)"  style="background-color: #ffffff;border-radius: 20upx;padding-right: 60upx;padding-left: 20upx;" class="flex justify-between u-border-bottom">
				<view class="item">
					<view style="width: 100upx;height: 100upx;background-color: #000000;border-radius: 100upx;line-height: 100upx; text-align: center;">
						<text style="color: #ebe5c1;">{{chuLi(item.name)}}</text>
					</view>
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap" style="margin-left: 20upx;">
						<view style="margin-top: 10upx;">
							<text style="font-size: 28upx;">{{ item.title }}</text>
							<!-- <text style="padding: 10upx 20upx;background-color: #f5e9e2;color: #f86b40;font-size: 24upx;margin-left: 10upx;border-radius: 5upx;">默认</text> -->
						</view>
						<view style="margin-top: 10upx;">
							<text style="color: #999999;">{{yinHang(item.BankNo)}}</text>
						</view>
					</view>
				</view>
				<!-- <view style="margin-top: 40upx;">
					<text class="cuIcon-check" style="font-size: 40upx;color: #fe4e01;"></text>
				</view> -->
			</view>
		</view>
		
		<view v-if="BankNoss">
			<view  v-for="(item, index) in lists" :key="index"  @tap="zheLis(item)" style="background-color: #ffffff;border-radius: 20upx;padding-right: 60upx;padding-left: 20upx;" class="flex justify-between u-border-bottom">
				<view class="item ">
					<view style="width: 100upx;height: 100upx;background-color: #000000;border-radius: 100upx;line-height: 100upx; text-align: center;">
						<text style="color: #ebe5c1;">{{chuLi(item.name)}}</text>
					</view>
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap" style="margin-left: 20upx;">
						<view style="margin-top: 10upx;">
							<text style="font-size: 28upx;">{{ item.title }}</text>
							<!-- <text style="padding: 10upx 20upx;background-color: #f5e9e2;color: #f86b40;font-size: 24upx;margin-left: 10upx;border-radius: 5upx;">默认</text> -->
						</view>
						<view style="margin-top: 10upx;">
							<text style="color: #999999;">{{yinHang(item.BankNo)}}</text>
						</view>
					</view>
				</view>
				<!-- <view style="margin-top: 40upx;" >
					<text class="cuIcon-check" style="font-size: 40upx;color: #fe4e01;"></text>
				</view> -->
			</view>
			
		</view>
		
		<view class=" flex align-center justify-start padding-tb-sm" style="background-color: #ffffff;height: 140upx;" @tap="bindZhi" v-if="!BankNoss">
			<view class="margin-left">
				<image src="https://img.huaxuapp.com/tianjiadianpu_03.png" class="logo margin-left" style="width: 60upx;height: 60upx;">  </image>
			</view>
			<text class="margin-left" style="font-size: 30upx;line-height: 1em;">
				添加支付宝账号
			</text>
		</view>
		
		
		<view class=" flex align-center justify-start padding-tb-sm" style="background-color: #ffffff;height: 140upx;" @tap="bindBank" v-if="!BankNos">
			<view class="margin-left">
				<image src="https://img.huaxuapp.com/tianjiadianpu_03.png" class="logo margin-left" style="width: 60upx;height: 60upx;">  </image>
			</view>
			<text class="margin-left" style="font-size: 30upx;line-height: 1em;">
				添加银行卡
			</text>
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
						BankNo: '',
						show: false
					}
				],
				lists: [
					{
						id: 1,
						title: this.$store.state.userInfo.ZhiFuBaoNo,
						name: this.$store.state.userInfo.ZhiFuBaoNick,
						BankNo:this.$store.state.userInfo.ZhiFuBaoID,
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
				BankNoss:this.$store.state.userInfo.ZhiFuBaoNo,
				StoreID:0,
				iid:0
			}
		},
		onLoad(router) {
			this.StoreID = router.StoreID
			this.iid = router.iid
			
			this.lists.title = this.$store.state.userInfo.ZhiFuBaoNo
			this.lists.name = this.$store.state.userInfo.ZhiFuBaoNick
			this.lists.BankNo = this.$store.state.userInfo.ZhiFuBaoID
			
			this.$Request.get(this.$store.state.getShopBankList,{StoreID: this.StoreID}).then(res=>{
				console.log(res);
				this.list[0].title = res.Data[0].BankName
				this.list[0].BankNo = res.Data[0].BankNo
				this.list[0].name = res.Data[0].BankUserName
				this.BankNos = res.Data[0].BankNo
			})
		},
		onShow() {
			this.lists.title = this.$store.state.userInfo.ZhiFuBaoNo
			this.lists.name = this.$store.state.userInfo.ZhiFuBaoNick
			this.lists.BankNo = this.$store.state.userInfo.ZhiFuBaoID
		},
		watch: {
			
		},
		methods: {
			bindZhi(){
				uni.navigateTo({
					url:'/pages/person/bindZfb'
				})
			},
			chuLi(name){
				let newStr;
				if (name.length >= 2) {
					newStr = name.substr(0, 1) + '*';
				}
				return newStr;
			},	
			yinHang(bankNumber){
				return bankNumber.substr(0,4)+"********"+bankNumber.substr(-4);
			},
			bindBank(){
				uni.navigateTo({
					url:'/pages/person/bindBanks?StoreID=' + this.StoreID
				});
			},
			zheLi(item){
				console.log(item);
				if(this.iid == 1){
					uni.redirectTo({
						url:`/pages/shopManagement/sonPage/witHdraw/zkwitHdraw?BankName=${item.title}&BankUserName=${item.name}&BankNo=${item.BankNo}&sort=1&StoreID=${this.StoreID}`
					})
				}
				if(this.iid == 2){
					uni.redirectTo({
						url:`/pages/shopManagement/sonPage/witHdraw/zfwitHdraw?BankName=${item.title}&BankUserName=${item.name}&BankNo=${item.BankNo}&sort=1&StoreID=${this.StoreID}`
					})
				}
				if(this.iid == 3){
					uni.redirectTo({
						url:`/pages/shopManagement/sonPage/witHdraw/tgwitHdraw?BankName=${item.title}&BankUserName=${item.name}&BankNo=${item.BankNo}&sort=1&StoreID=${this.StoreID}`
					})
				}
				return 
			},
			zheLis(item){
				console.log(item);
				if(this.iid == 1){
					uni.redirectTo({
						url:`/pages/shopManagement/sonPage/witHdraw/zkwitHdraw?ZhiFuBaoNo=${item.title}&ZhiFuBaoNick=${item.name}&ZhiFuBaoID=${item.BankNo}&sort=2&StoreID=${this.StoreID}`
					})
				}
				if(this.iid == 2){
					uni.redirectTo({
						url:`/pages/shopManagement/sonPage/witHdraw/zfwitHdraw?ZhiFuBaoNo=${item.title}&ZhiFuBaoNick=${item.name}&ZhiFuBaoID=${item.BankNo}&sort=2&StoreID=${this.StoreID}`
					})
				}
				if(this.iid == 3){
					uni.redirectTo({
						url:`/pages/shopManagement/sonPage/witHdraw/tgwitHdraw?ZhiFuBaoNo=${item.title}&ZhiFuBaoNick=${item.name}&ZhiFuBaoID=${item.BankNo}&sort=2&StoreID=${this.StoreID}`
					})
				}
				return 
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
	
	.sure {
		margin-top: 20upx;
		height: 88upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(233, 165, 85);
		color: #fff;
		border-radius: 15upx;
		
	}
</style>

