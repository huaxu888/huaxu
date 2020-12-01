<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN-->
		<cu-custom bgColor="bg-whitesss" :isBack="true" class="text-black">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">买单收款提现</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">买单收款提现</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->
		<view v-if="sorts == 1">
			<view style="margin: 30upx;background-color: #ffffff;border-radius: 20upx;" class="flex justify-between"  @tap="bindUser">
				
					<view class="item u-border-bottom" >
						<view style="width: 100upx;height: 100upx;background-color: #000000;border-radius: 100upx;line-height: 100upx; text-align: center;">
							<text style="color: #ebe5c1;">{{chuLi(list.name)}}</text>
						</view>
						<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
						<view class="title-wrap" style="margin-left: 20upx;">
							<view style="margin-top: 10upx;">
								<text style="font-size: 28upx;">{{ list.title }}</text>
								<text style="padding: 6upx 12upx;background-color: #ffe6e8;color: #fe5479;font-size: 24upx;margin-left: 10upx;border-radius: 5upx;">默认</text>
							</view>
							<view style="margin-top: 10upx;">
								<text style="color: #999999;">{{yinHang(list.BankNo)}}</text>
							</view>
						</view>
					</view>
				<view style="margin-right: 30upx;margin-top: 50upx;">
					<text class="hxIcon-rightArrow" style="font-size: 26upx;"></text>
				</view>
			</view>
		</view>
		
		<view v-if="sorts != 1">
			<view v-if="sorts == 2">
				<view style="margin: 30upx;background-color: #ffffff;border-radius: 20upx;" class="flex justify-between"  @tap="bindUser">
						<view class="item u-border-bottom" >
							<view style="width: 100upx;height: 100upx;background-color: #000000;border-radius: 100upx;line-height: 100upx; text-align: center;">
								<text style="color: #ebe5c1;">{{chuLi(lists.name)}}</text>
							</view>
							<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
							<view class="title-wrap" style="margin-left: 20upx;">
								<view style="margin-top: 10upx;">
									<text style="font-size: 28upx;">{{ lists.title }}</text>
									<text style="padding: 10upx 20upx;background-color: #f5e9e2;color: #f86b40;font-size: 24upx;margin-left: 10upx;border-radius: 5upx;">默认</text>
								</view>
								<view style="margin-top: 10upx;">
									<text style="color: #999999;">{{yinHang(lists.BankNo)}}</text>
								</view>
							</view>
						</view>
					<view style="margin-right: 30upx;margin-top: 50upx;">
						<text class="hxIcon-rightArrow" style="font-size: 26upx;"></text>
					</view>
				</view>
			</view>
			<view style="margin: 30upx;background-color: #ffffff;border-radius: 20upx;" class="flex justify-between" @tap="bindBank()" v-if="sorts != 2">
				<view >
					<view class="item u-border-bottom">
						<view style="border-radius: 100upx;line-height: 100upx; text-align: center;width: 100upx;height: 100upx;">
							<text class="hxIcon-morentouxiang" style="font-size: 80upx;color: #999999;"></text>
						</view>
					</view>
				</view>
				<view style="margin-right: 30upx;margin-top: 50upx;">
					<text>未绑定</text>
					<text class="hxIcon-rightArrow" style="font-size: 26upx;"></text>
				</view>
			</view>
		</view>
		
		<view class="padding" style="margin: 30upx;padding-bottom: 60upx;background-color: #ffffff;border-radius: 20upx;">
			<view class="text-bold margin-top-sm" style="font-size: 28upx;">提现：</view>
			<view class=" margin-top  flex align-center " style="border-bottom: 1px solid #F0F0F0; margin-bottom: 0upx;">
				<text style="font-size: 46upx;" class="margin-right-xs">&yen;</text>
				<input type="digit" placeholder-style="font-size: 14px;color: #ddd;"  maxlength="11"
				 :adjust-position="false" confirm-type="done" placeholder="" :value="changeMoney(zkJin)" style="font-size: 65upx;height: 80upx; " disabled/>
				<!-- <text style="font-size: 30upx;white-space:nowrap; color: #EC3B46;font-size: 28upx;" class="margin-right-xs" @tap="allWithDrawal()">全部提现</text> -->
			</view>
			<view class="margin-tb  text-sm" style="color:#b9b9b9;">可提现金额
				<text style="color:#333333;">{{changeMoney(zkJin)}}</text>元
			</view>
			<view class="flex justify-center " style="margin-top: 80upx;" @tap="tiXian">
				<button class="cu-btn shadow text-lg sure" style="width: 100%;">
					立即提现
				</button>
			</view>
			<view style="color: #b9b9b9;margin-top: 50upx;font-size: 24upx;">
				<text>·为了保证资金安全，每个账户一天仅能提现一次</text>
				<view style="margin-top: 20upx;">
					<text>·当前提现到账时间为{{times()}}，周末及节假日顺延</text>
				</view>
			</view>
		</view>
		
		<view class="cu-modal bottom-modal " :class="inputPassWord?'show':''">
			<view class="cu-dialog">
				<uni-grid @close="hidePassModal" @fullclose="fullclose" />
			</view>
		</view>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	export default {
		data() {
			return {
				list: 
					{
						id: 1,
						title: '',
						name:'',
						BankNo:'',
					}
				,
				lists: 
					{
						id: 1,
						title:this.$store.state.userInfo.ZhiFuBaoNo,
						name:this.$store.state.userInfo.ZhiFuBaoNick,
						BankNo:this.$store.state.userInfo.ZhiFuBaoID,
					}
				,
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
				zkJin: 0,
				sorts: 0,
				StoreID:0,
				getData:{
					StoreID:0,
					num:0,
					userid:this.$store.state.userInfo.ID,
					pwd:'',
					sort:0,
				},
				inputPassWord: false,
			}
		},
		onLoad(option) {
			
			console.log(option);
			this.StoreID = option.StoreID
			this.$http.ziJin(this.$store.state.userInfo.ID,option.StoreID).then(res => {
				console.log(res);
				this.zkJin = res.wxf
				this.zfJin = res.yhqwxf
				this.tgJin = res.tgwxf
			})
			
			this.StoreID = option.StoreID
			this.$Request.get(this.$store.state.getShopBankList,{StoreID: this.StoreID}).then(res=>{
				console.log(res);
				if(res.IsSuccess){
					res.Data.forEach((r,i) => {
						console.log(r);
						if(r.IsDefault){
							this.list.title = r.BankName
							this.list.BankNo = r.BankNo
							this.list.name = r.BankUserName
							this.BankNos = r.BankNo
							console.log('成功');
							
							if(this.BankNos){
								this.sorts = 1
							} else {
								if(this.$store.state.userInfo.ZhiFuBaoNo){
									this.sorts = 2
									this.lists.title = this.$store.state.userInfo.ZhiFuBaoNo
									this.lists.BankNo = this.$store.state.userInfo.ZhiFuBaoID
									this.lists.name = this.$store.state.userInfo.ZhiFuBaoNick
								} else {
									this.sorts = 0
								}
							}
							
							console.log(this.sorts);
							
							if(option.sort == 1){
								this.sorts = 1
							}
							if(option.sort == 2){
								this.sorts = 2
								this.lists.title = this.$store.state.userInfo.ZhiFuBaoNo
								this.lists.BankNo = this.$store.state.userInfo.ZhiFuBaoID
								this.lists.name = this.$store.state.userInfo.ZhiFuBaoNick
							}
							console.log(this.sorts);
						} else {
							console.log('失败');
						}
					})
				} else {
					console.log('失败');
					if(this.$store.state.userInfo.ZhiFuBaoNo){
						this.sorts = 2
						this.lists.title = this.$store.state.userInfo.ZhiFuBaoNo
						this.lists.BankNo = this.$store.state.userInfo.ZhiFuBaoID
						this.lists.name = this.$store.state.userInfo.ZhiFuBaoNick
					} else {
						this.sorts = 0
					}
				}
			})
			
		},
		onShow() {
			this.times() 
			
		},
		watch: {
			
		},
		methods: {
			changeMoney(money) {
				return this.$api.formatAmount(money);
			},
			bindUser() {
				uni.redirectTo({
					url:'/pages/shopManagement/sonPage/bindUsers/bindUser?StoreID=' + this.StoreID + '&iid=1'
				});
			},
			times() {
				var date = new Date();
				date.setDate(date.getDate() + 3);
				return date.getFullYear() +"/"+ (date.getMonth()+1) +"/"+ date.getDate()
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
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if(index != idx) this.list[idx].show = false;
				})
			},
			tiXian(){
				if(this.zkJin>=100){
					uni.showModal({
						title: '提现说明',
						content: `提现到账时间${this.times()},如遇周末及法定节假日顺延！`,
						showCancel:true,
						confirmText: '继续提现',
						success: (res) => {
							if (res.confirm) {
								console.log('点击确定');
								console.log(this.getData.pwd);
								if (this.lists.title || this.list.BankNo) {
									this.inputPassWord = true
								} else {
									uni.showModal({
										content: '您还未添加提现账号,请先添加',
										cancelText: '知道了',
										confirmText: '去添加',
										success: res => {
											if (res.confirm) {
												uni.navigateTo({
													url:'/pages/person/bindBanks?StoreID=' + this.StoreID
												})
											}
										},
									});
								}
							}
						}
					})
				} else {
					this.$api.msg('提现金额有误，请重试！',2000)
				}
				return
			},
			hidePassModal: function(res) {
				this.inputPassWord = false;
			},
			fullclose: async function(res) {
				console.log(this.money);
				let self = this,
					pwd2 = res.pwd
				this.getData.pwd = res.pwd
				this.inputPassWord = false;
				let { IsSuccess, Msg } = await this.$http.verifyPin(this.$store.state.userInfo.ID, pwd2)
				if (IsSuccess) {
					this.getData.num = this.zkJin
					this.getData.userid = this.$store.state.userInfo.ID
					this.getData.sort = this.sorts
					this.getData.StoreID = this.StoreID
					
					this.$Request.get(this.$store.state.cashOutUrl,this.getData).then(res=>{
						if(res.IsSuccess){
							setTimeout(()=>{
								this.$api.msg(res.Msg,2000,'success')
							},500)
							uni.redirectTo({
								url:`/pages/prestoreDetail/isSuccess?type=tx&money=${this.zkJin}&StoreID=${this.StoreID}&userid=${this.getData.userid}&sort=1`
							})
						}else if(!res.IsSuccess){
							let msg = res.Msg
							this.$api.msg(res.Msg,2000)
						}
						return
					})
					this.$api.msg('提现申请已提交，请等待审核通过')
				} else {
					this.$api.msg('交易密码不正确')
				}
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
		background: #fe5479;
		color: #fff;
		border-radius: 15upx;
		
	}
</style>

