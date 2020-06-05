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
			<view class="text-bold">店铺信息</view>
		</view>

		<view class="input_content">
			<form>
				<view class="cu-form-group" v-for="(item,i) of inputAry" :key="i" :class="i===inputAry.length-1?'border_bottom':''">
					<view class="title">{{item.textName}}</view>
					<input name="input" :adjust-position="adjustPosition" v-model="item.value" :disabled="i===0?true:false" ></input>
					<view class="title text-gray">{{item.company}}</view>
				</view>
			</form>
		</view>

		<view class="btn_ bg-white flex justify-center">
			<view class="padding flex flex-direction" style="width: 80%;">
				<button class="cu-btn bg-red margin-tb-sm lg" @tap="submit">保存并下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPageAllInfo as mixins
	} from '../../../../mixins/qymMixins.js'
	export default {
		mixins: [mixins],
		data() {
			return {
				sqZzobj: {},
				getData: {
					UserID: this.$store.state.userInfo.ID,
					StoreID: '',
					MianJi: '',
					FangZhu: '',
					HasPerson: '',
					TouRu: '',
					Yye: ''
				},
				inputAry: [{
					textName: '店铺名称',
					company: '',
					value: '',
				}, {
					textName: '经营面积',
					company: 'm²',
					value: '',
					key: 'MianJi',
				}, {
					textName: '房租剩余年限',
					company: '年',
					value: '',
					key: 'FangZhu',
				}, {
					textName: '从业人数',
					company: '人',
					value: '',
					key: 'HasPerson',
				}, {
					textName: '装修投入',
					company: '元',
					value: '',
					key: 'TouRu',
				}, {
					textName: '日均营业额',
					company: '元',
					value: '',
					key: 'Yye',
				}],
				adjustPosition: false,
				StoreName: ''
			}
		},
		async onLoad(route) {
			this.getrouteInfo(route)
		},
		async onShow() {
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
			}else{
				this.getCurryStorage(1)
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
			back() {
				uni.navigateBack({})
			},
			getrouteInfo(route) {
				this.getData.StoreID = route.StoreID
				this.StoreName = route.StoreName
				this.inputAry[0].value = this.StoreName
			},
			submit() { //提交审核
				let i = 0 
				for (let item of this.inputAry) {
					i++
					var num = item.value*1
					if(i != 1 && num!=num){
						this.$api.msg(`请填写正确的${item.textName}`,2000)
						return 
					}
					if(item.value===''){
						this.$api.msg(`请填写${item.textName}`,2000)
						return 
					}
					var key = item.key
					if (key in this.getData) {
						this.getData[key] = item.value
					}
				}
				return this.$Request.get(this.$store.state.firstrunscoresUrl, this.getData).then(res => {
					console.log(res)
					if (res.IsSuccess) {
						console.log(110)
						this.setStorage(res.sqZzobj, 1)
						uni.navigateTo({
							url: `/pages/shopManagement/sonPage/jionrunscores/jionrunscoresTwoPage?StoreID=${this.getData.StoreID}`
						})
					}else{
						this.$api.msg(res.Msg,2000)
					}
				})
			}
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
