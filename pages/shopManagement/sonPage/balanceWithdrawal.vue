<template>
	<view> 
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="balance-nav" class="text-white" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">{{title}}</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
				<block slot="backText">{{title}} </block>
			<!-- #endif -->
		</cu-custom>	
		<!-- #endif -->
		<view>
			<view class="flex justify-between align-center padding">
				<text class="text-lg">
					提现金额
					<text class="text-sm text-gray">【当前可提现{{ wxf > 0 ? wxf : -wxf}}】</text>
				</text>
				<text class="text-df text-green" v-if="type==='xiaofeiTX'" @tap="goToBalanceDetail">提现明细</text>
			</view>
			<view class="padding-top-xl padding padding-bottom flex align-end" style="border-bottom: 2upx solid #DDDDDD;">
				<text class="text-bold margin-right-sm" style="font-size: 80upx;">￥</text>
				<input type="text" @input="inputHandle" placeholder-style="font-size: 100upx;"  disabled="disabled" style="font-size:100upx;height:100upx;"  v-model="StoreRest_" :focus="true" >
			</view>
			
			<view class="padding-tb-sm padding" v-if="type==='xiaofeiTX'">
				<text class="text-xs" style="color:rgb(205,205,205);">将扣除提现协议中设置的{{koufeiBL*100}}%提现手续费</text>
			</view>
			
			<view class="btn_ bg-white padding-lr flex justify-center">
				<view class="flex flex-direction" style="width: 100%;">
					<button class="cu-btn bg-red margin-tb-sm lg"  @tap="submit">全部提现</button>
				</view>
			</view>
			
			<view class="btn_ bg-white padding-lr flex justify-center">
				<view class="flex flex-direction" style="width: 100%;">
					<button class="cu-btn bg-red margin-tb-sm lg"  @tap="goToShopBank">绑定商铺提现账户</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onShow(){
			this.userInfo=this.$store.state.userInfo
		},
		onLoad(option){
			this.$http.myStore(this.$store.state.userInfo.ID, option.storeid)
				.then(res => {
					this.getData.StoreID = option.storeid
					if (res.IsSuccess) {
						console.log(res);
						this.fanhuanBL = res.Store.FanHuanBL
						this.koufeiBL = (1 * 1000 - this.fanhuanBL * 1000) / 1000
						this.IsBank = res.IsBank
						this.wxf = res.Wxf
						this.StoreRest_ = Math.abs(this.wxf)
					} else {
						this.$api.msg(res.Msg)
					}
				})
				.catch(err => {
					console.log(err);
				})
		},
		data(){
			return {
				getData:{
					num:0,
					userid:this.$store.state.userInfo.ID
				},
				StoreRest:0,
				StoreRest_:0,
				type:'xiaofeiTX',
				koufeiBL:0,
				fanhuanBL: 0,
				wxf: 0,
				getYcData:{
					userid:this.$store.state.userInfo.ID,
					num:-1
				},
				userInfo:this.$store.state.userInfo,
				faRenId:'',
				IsBank:''
			}
		},
		methods:{
			async hxXfTxian(){//消费提现
				if (!this.IsBank) {
					uni.showModal({
						title: '提现失败',
						content: '提现操作需要绑定银行卡，您当前尚未绑定银行卡',
						showCancel: false,
						confirmText: '去绑卡',
						success: (res) => {
							if (res.confirm) {
								this.goToShopBank()
							}
						}
					})
					return
				}
				if (!this.StoreRest_ || this.StoreRest_ > this.wxf) {
					this.StoreRest_ = 0
					uni.showToast({
						title: '金额不正确',
						icon: 'none'
					})
					return
				}
				this.getData.num = this.StoreRest_
				this.getData.userid = this.$store.state.userInfo.ID
				return this.$Request.get(this.$store.state.cashOutUrl,this.getData).then(res=>{
					if(res.IsSuccess){
						setTimeout(()=>{
							this.$api.msg(res.Msg,2000,'success')
						},500)
						uni.navigateTo({
							url:`/pages/prestoreDetail/isSuccess?type=tx&money=${this.StoreRest_}`
						})
					}else if(!res.IsSuccess){
						let msg = res.Msg
						this.$api.msg(res.Msg,2000)
					}
					return res
				})
			},
			async hxYcTxian(){//预存提现
				let val = await this.$Request.get(this.$store.state.getYccashout,this.getYcData)
				if(val.IsSuccess){
					setTimeout(()=>{
						this.$api.msg(res.Msg,2000,'success')
					},500)
					uni.navigateTo({
						url:`/pages/prestoreDetail/isSuccess?type=tx&money=${this.getYcData.num}`
					})
				}else{
					console.log(val.Msg)
					this.$api.msg(val.Msg,2000)
				}
				return val
			},
			inputHandle(e){
				this.getData.num = e.detail.value*1
			},
			back(){
				uni.navigateBack({})
			},
			async submit(){
				if(this.type === 'xiaofeiTX'){//消费提现
					let res = await this.hxXfTxian()
				// 	let nowUserId = this.userInfo_.ID
				// 	if(nowUserId!=this.faRenId){//非法人操作
				// 		if(this.IsBank==='true'){
				// 			let res = await this.hxXfTxian()
				// 			console.log(res)
				// 			return res
				// 		}else{
				// 			console.log(3349)
				// 			this.$api.msg('请该店法人绑定银行卡')
				// 		}
				// 	}else{//法人操作
				// 		this.$api.showModal(
				// 			{
				// 				title:'消费提现',
				// 				content:'您确定要全部提现嘛?(提现时必须绑定银行卡)'
				// 			}
				// 		).then(async res=>{
				// 			if(res){
				// 				// if(){//没有绑定对公账号
				// 				// 	if(){//如果绑定了私人账号
				// 				// 		let res =  await this.$api.showModal({title:'消费提现',content:'您是否要复用个人绑定银行卡'})//
				// 				// 		if(res){
				// 				// 			//去提现 对私卡
				// 				// 		}else{//取消对私卡
				// 				// 			let resolve =  await this.$api.showModal({title:'消费提现',content:'您是否要绑定店铺提现银行账号'})//
				// 				// 			if(resolve){//确定
												
				// 				// 			}else{
				// 				// 				this.$api.msg('取消提现',2000)
				// 				// 			}
				// 				// 		}
				// 				// 	}else{//没绑定私人账号
				// 				// 		let resolve =  await this.$api.showModal({title:'消费提现',content:'您是否要绑定店铺提现银行账号'})//
				// 				// 		if(resolve){//确定
											
				// 				// 		}else{
				// 				// 			this.$api.msg('取消提现',2000)
				// 				// 		}
				// 				// 	}
				// 				// }else{//直接提现
									
				// 				// }
				// 				if(this.userInfo.BankNo===''){
				// 					let bankData = await uni.navigateTo({
				// 						url:'/pages/person/bindBank?type=2',
				// 					})
				// 					this.$api.msg('请绑定银行卡',2000)
				// 				}else{
				// 					let res = await this.hxXfTxian()
				// 					return res
				// 				}
				// 			}else{
				// 				this.$api.msg('取消提现',2000)
				// 			}
				// 		})
				// 	}
				}else{//预存提现
					let res = await this.hxYcTxian()
				// 	let nowUserId = this.userInfo_.ID
				// 	if(nowUserId!=this.faRenId){//非法人操作
				// 		if(this.IsBank==='true'){
				// 			let res = await this.hxYcTxian()
				// 			return res
				// 		}else{
				// 			this.$api.msg('请该店法人绑定银行卡')
				// 		}
				// 	}else{//法人操作
				// 		this.$api.showModal(
				// 			{
				// 				title:'预存提现',
				// 				content:'您确定要全部提现嘛?(提现时必须绑定银行卡)'
				// 			}
				// 		).then(async res=>{
				// 			if(res){
				// 				if(this.userInfo.BankNo===''){
				// 					let bankData = await uni.navigateTo({
				// 						url:'/pages/person/bindBank?type=2',
				// 					})
				// 					this.$api.msg('请绑定银行卡',2000)
				// 				}else{	
				// 					let res = await this.hxYcTxian()
				// 					console.log(res)
				// 					return res
				// 				}
								
				// 			}else{
				// 				this.$api.msg('取消提现',2000)
				// 			}
				// 		})
				// 	}
				}
			},
			goToBalanceDetail(){
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/balanceDetailPage?storeid=${this.getData.StoreID}`
				})
			},
			goToShopBank(){
				uni.navigateTo({
					url:`/pages/shopManagement/sonPage/shopBank/bankList?storeid=${this.getData.StoreID}`
				})
			}
		},
		computed:{
			title(){
				if(this.type==='xiaofeiTX'){
					return '消费提现'
				}else{
					return '预存提现'
				}
			}
		}
	}
</script>

<style>
</style>
