<template>
	<view class="bg-white">
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">申请预存</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">申请预存</block>
			<!-- #endif -->
		</cu-custom>
		<!-- #endif -->

		<view class="padding-left title_ text-lg align-center flex" style="line-height: 2.5em;background: #F0F0F0;">
			<view class="text-bold">预存信息</view>
		</view>

		<view class="input_content">
			<form>
				<view class="cu-form-group" v-for="(item,i) of inputAry" :key="i" :class="i===inputAry.length-1?'border_bottom':''">
					<view class="title">{{item.textName}}</view>
					<input name="input" :adjust-position="adjustPosition" v-model="item.value" type="digit" :placeholder="i===1?'折扣范围为0-10':''"></input>
					<view class="title text-gray">{{item.company}}</view>
				</view>
			</form>
		</view>

		<view class="btn_ bg-white flex justify-center">
			<view class="padding flex flex-direction" style="width: 80%;">
				<button class="cu-btn bg-red margin-tb-sm lg" @tap="submit">提交审核</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				getData:{
					StoreID:'',
					Scores:'',
					FanliScore:''	
				},
				inputAry: [{
					textName: '申请预存的金额',
					company: '元',
					value: '',
					key:'Scores',
					placeholder:'请输入金额'
				}, {
					textName: '平台返还折扣',
					company: '折',
					value: '',
					key:'FanliScore',
					placeholder:'折扣范围为：0-10折'
				}],
				adjustPosition: false,
			}
		},
		async onLoad(route){
			this.getData.StoreID=route.StoreID
		},
		async onShow(){
			let res =  await this.isBindBank()
			if(!res){
				let resolve =await this.$api.showModal({
					title: '您还未绑定提现账户？',
					content: '前去绑定商铺提现账户',
					showCancel:true,
					confirmText:'前去绑定',
					cancelText:'取消绑定',
					cancelColor:'#DC143C'
				})
				if(resolve){
					uni.navigateTo({
						url:`/pages/shopManagement/sonPage/shopBank/addBank?storeid=${this.getData.StoreID}`
					})
				}else{
					uni.navigateBack({})
				}
			}
		},
		methods: {
			async isBindBank(){
				let res = await this.$Request.get(this.$store.state.getShopBankList,{
					storeid:this.getData.StoreID
				},false)
				if(res.IsSuccess){
					return true
				}else{
					return false
				}
				console.log(res)
			},
			submit() { //提交审核
				for(let item of this.inputAry){
					if(item.value===''){
						this.$api.msg(`请填写${item.textName}`,2000)
						return 
					}
					var num = item.value * 1
					if(num <= 0){
						this.$api.msg(`请填写正确的${item.textName}`,2000)
						return 
					}
					var key = item.key
					if(key in this.getData){
						this.getData[key]=item.value
					}
					var Scores =  this.inputAry[0].value*1//金额
					var FanliScore = this.inputAry[1].value*1//折扣
					if(FanliScore > 0 && FanliScore <= 10){
						var FanliScore = FanliScore+''
						if(FanliScore.length > 3){
							this.$api.msg('折扣小数必须为1位小数')
							this.inputAry[1].value = ((this.inputAry[1].value*1).toString().substring(0,3))*1
							console.log(FanliScore,Scores)
							return
						}
						if(Scores%100!=0){
							console.log(FanliScore,Scores)
							this.$api.msg('申请预存的金额必须为100的倍数')
							return
						}
						this.getData.FanliScore = this.getData.Scores*1 * (this.getData.FanliScore*1/10)
						this.getData.Scores = this.getData.Scores*1
						console.log(this.getData)
						this.$Request.get(this.$store.state.jionrunscoresUrl,this.getData).then(res=>{
							if(res.IsSuccess){
								uni.navigateTo({
									url:`/pages/changeBusiness/waitSubmit?type=prestore&myStoreID=${this.getData.StoreID}`
								})
							}
						})
					}else{
						this.$api.msg('折扣必须为0-10的正数')
					}
					
				}
			},
			back() {
				uni.navigateBack()
			},
		}
	}
</script>


<style scoped>
	.changeBusiness_ {
		height: 100%;
	}

	.border_bottom {
		border-bottom: 1px solid #DDDDDD;
	}

	.btn_ {}
</style>
