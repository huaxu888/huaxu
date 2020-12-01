<template>
	<view>
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">添加优惠券</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">添加优惠券</block>
			<!-- #endif -->
		</cu-custom>
		<view>
			<view class="padding bg-gray title_ text-lg align-center flex">
				<view class="text-bold">优惠券信息</view>
			</view>
			<view class="bg-white">
				<form>
					<view style="border-bottom: 2upx solid #F0F0F0;">						
						<view class="cu-form-group" v-for="(item,i) of inputAry" :key="i" >
							<view class="title">{{item.label}}</view>
							<input :placeholder="item.placeholder" name="input"
									:adjust-position="adjustPosition"
									v-model="item.value"
									:disabled="i===0||i===4?true:false"
							></input>
						</view>
					</view>
					
					<view class="cu-form-group" style="border-top: 0px;">
						<view class="title">有效期时间</view>
						<input  name="input"
								:disabled="true"
								:adjust-position="adjustPosition"
								v-model="valueTime"
								@tap="toggleTab"
								:placeholder="'点击选择有效时间'"
						></input>
						<!-- <text  class="margin-right">请选择有效期限</text> -->
					</view>
					
					<view class="cu-form-group" style="border-bottom: 2upx solid #F0F0F0;">
						<view class="title">仅发放给新用户</view>
						<switch class='round red' style="transform: scale(.8);" @change="SwitchA" :class="getData.IsNew?'checked':''" :checked="getData.IsNew?true:false"></switch>
					</view>
					<picker mode="selector" :range="typeList" @change="selectType">
						<view class="cu-form-group" style="border-bottom: 2upx solid #F0F0F0;">
							<view class="title">选择发放范围</view>
							<view>{{ typeList[currentType] }}</view>
						</view>
					</picker>
					
<!-- 					<view class="cu-form-group" style="border-bottom: 2upx solid #F0F0F0;" v-if="">
						<view class="title">指定用户发放</view>
						<switch class='round red' style="transform: scale(.8);" @change="SwitchB" :class="isOnly?'checked':''" :checked="isOnly?true:false"></switch>
					</view> -->
					
					<view class="cu-form-group" v-if="currentType == 2">
						<view class="title">指定用户电话</view>
						<input type="text" v-model="phoneList" placeholder="请输入手机号" />
					</view>
				</form>
			</view>
			<view class="btn_ ">
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-red margin-tb-sm lg" @tap="submit">发布优惠券</button>
				</view>
			</view>
		</view>
		 
		<w-picker mode="range"  startYear="2019"  endYear="2030" :defaultVal="[0,0,0,0,0,0,0]" :current="current" @confirm="onConfirm" ref="range" themeColor="#f00" ></w-picker>

		
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default{
		data(){
			return {
				key:'',
				tiaoNum:0,
				sortList:[
					{
						label:'全部会员*10',
						key:'allHuiyuan'
					},{
						label:'指定发放量',
						key:'zhiDingNum'
					}
				],
				index:0,
				current:true,
				valueTime:'',
				adjustPosition:false,
				TimeData:{
					mode:"range",
					value:[0,0,0,0,0,0,0],
					picker:"range"
				},
				getData:{
					Num1:'',//赠送额
					Num2:'',//限制额
					Num:0,//券数量
					startTime:'',//开始时间
					endTime:'',//结束时间
					YXQDate:0,
					StoreID:0,
					sort:1,
					IsNew:false//false不发新人，true是发给新人
				},
				switchA: false,
				inputAry:[
					{
						label:'券的名称',
						placeholder:'',
						value:'店铺优惠券',
					},{
						label:'券的面额',
						placeholder:'￥优惠金额',
						value:'',
						key:'Num2'
					},{
						label:'使用条件',
						placeholder:'￥用券最低订单金额',
						value:'',
						key:'Num1'
					},{
						label:'发行量',
						placeholder:'可领取的总券数',
						value:'',
						key:'Num'
					},{
						label:'每人限领',
						placeholder:'',
						value:'1张',
					}
				],
				checkbox: [{
					value: 'A',
					checked: true
				}, {
					value: 'B',
					checked: true
				}, {
					value: 'C',
					checked: false
				}],
				isOnly: false,
				phoneList: '',
				typeList: [
					'直推会员',
					'消费会员',
					'指定会员'
				],
				currentType: 0
			}
		},
		onLoad(route){
			this.getData.StoreID=route.StoreID*1
			console.log(this.getData)
			this.key = this.sortList[this.index].key
			console.log(this.key)
		},
		components:{
			wPicker
		},
		methods:{
			PickerChange(e){
				this.index = e.detail.value
				this.key =this.sortList[this.index].key
			},
			selectType: function (e) {
				this.currentType = e.detail.value
			},
			SwitchA () {
				this.switchA = ! this.switchA
				this.getData.IsNew = this.switchA
				this.isOnly = false
			},
			SwitchB () {
				this.isOnly = ! this.isOnly
				this.switchA = false
				this.getData.IsNew = false
			},
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			onConfirm(e){
				console.log(e)
				this.valueTime=e.result
				this.getData.startTime=e.from
				this.getData.endTime=e.to
			},
			toggleTab(index){
				this.$refs.range.show();
			},
			// SwitchA(e) {
			// 	this.getData.IsNew = e.detail.value
			// },
			submit(){
				uni.showModal({
					title:'发布',
					content:'亲，点击发布后，买家即可收到优惠卷，确定发布吗？',
					success:(res)=>{
						console.log(this.key)
						if(this.key==='zhiDingNum'){
							
						}else{
							if (res.confirm) {
								for(let item of this.inputAry){
									var key = item.key
									var value = item.value
									if(key === 'Num' || key === 'Num2' || key === 'Num1'){
										value = value *1
										var flag = /^[0-9]*[1-9][0-9]*$/
										var flag_  = flag.test(value)
										if(!flag_){
											this.$api.msg('填写数据不能为零或负数或小数',2000)
											return 
										}
										
									}
									if(key in this.getData){
										this.getData[key]=value
									}
								}
								this.getData.type = this.currentType + 1
								if (this.currentType === 2) {
									this.getData.phones = this.phoneList
								}
								this.$Request.get(this.$store.state.AddCouponsUrl,this.getData).then(async res=>{
									if(res.IsSuccess){
										setTimeout(()=>{
											this.$api.msg(`${res.Msg}`,2000)
										},500)
										uni.navigateBack({})
									}else{
										if(res.Msg==="余额不足请充值！"){
											let resolve =await this.$api.showModal({
												title:'余额不足',
												content:'如果您还想继续发券，请前往充值界面，充值过后将可继续发券。'
											})
											if(resolve){
												uni.navigateTo({
													url:'/pages/person/newRecharge'
												})
											}
										}else{
											this.$api.msg(res.Msg)
										}
									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background: #F0F0F0;
	}
</style>
