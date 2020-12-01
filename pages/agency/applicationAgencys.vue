<template>
	<view>
		<view style="background: url('http://img.huaxuapp.com/%E4%BB%A3%E7%90%86.png');background-size:cover; background-repeat: no-repeat; height:500upx;width: 100%;">
			<!-- #ifndef MP-ALIPAY -->
			<cu-custom bgColor="bg-transparent" class="text-white" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">代理申请</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">代理申请</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>

		<view class="padding-lr" style="position: relative; top: -150upx; width: 100%;height: 850upx;">
			<view class="bg-white padding padding-lr-xs" style="border-top-right-radius: 10upx;border-top-left-radius: 10upx;">
				<view class="cu-steps steps-arrow ">
					<view class="cu-item" :class="index>basics?'text-gray':'text-red'" v-for="(item,index) in basicsList" :key="index">
						<text :class="'hxIcon-' + item.cuIcon" style="font-size: 75upx;"></text>
						<view class="text-xs">{{item.name}}</view>
					</view>
				</view>
			</view>

			<view class="padding-lr">
				<view class="padding-lr margin-top">
					<view class="margin-top">
						<hx-input paddingSize="sm" placeholder="请输入您的姓名" v-model="Uname"></hx-input>
					</view>
					<view class="margin-top">
						<hx-input paddingSize="sm" placeholder="请输入手机号码" v-model="Phone" :model="Phone" :disable="disable"></hx-input>
					</view>
					<view class="margin-top">
						<hx-input paddingSize="sm" placeholder="请输入验证码" :hasCode="true" v-model="code" :phone="Phone"></hx-input>
					</view>
				</view>

				<view class="flex margin-top-xl padding-left" v-if="showAgencyType">
					<text class="" style="width: 139upx;white-space :nowrap">代理方式：</text>
					<radio-group @change="RadioChange">
						<radio class='red margin-left-sm' :class="radio=='5'?'checked':''" :checked="radio=='5'?true:false" value="5" style="transform:scale(0.7)"></radio>
						<text class="">个人</text>
						<radio class='red margin-left-sm' :class="radio=='6'?'checked':''" :checked="radio=='6'?true:false" value="6" style="transform:scale(0.7)"></radio>
						<text class="">高级</text>
						<radio class='red margin-left-sm' :class="radio=='8'?'checked':''" :checked="radio=='8'?true:false" value="8" style="transform:scale(0.7)"></radio>
						<text class="">区县</text>
					<!-- 	<radio class='red' :class="radio=='7'?'checked':''" :checked="radio=='7'?true:false" value="7" style="transform:scale(0.7)"></radio>
						<text class="">市级</text> -->
					</radio-group>
				</view>


				<view class="flex margin-top-xl padding-left" v-if="!showAgencyType">
					<text class="" style="width: 139upx;white-space :nowrap">代理方式：</text>
					<radio-group @change="RadioChange">
						<radio class='red margin-left-sm' :class="radio=='5'?'checked':''" :checked="radio=='5'?true:false" value="5" style="transform:scale(0.7)" v-if="showChuji"></radio>
						<text class="" v-if="showChuji">个人</text>
						<radio class='red margin-left-sm' :class="radio=='6'?'checked':''" :checked="radio=='6'?true:false" value="6" style="transform:scale(0.7)" v-if="showGaoji"></radio>
						<text class="" v-if="showGaoji">高级</text>
						<radio class='red margin-left-sm' :class="radio=='8'?'checked':''" :checked="radio=='8'?true:false" value="8" style="transform:scale(0.7)" v-if="showQuyu"></radio>
						<text class="" v-if="showQuyu">区县</text>
					<!-- 	<radio class='red' :class="radio=='7'?'checked':''" :checked="radio=='7'?true:false" value="7" style="transform:scale(0.7)"></radio>
						<text class="">市级</text> -->
					</radio-group>
				</view>




				<view class="flex align-center margin-top-xl padding-lr" style="height: 50upx;">
					<view v-show="showPayRadio">
						<text style="width: 139upx;">支付方式：</text>
						<radio-group @change="payRadioChange">
							<radio class='red' :class="Payradio=='1'?'checked':''" :checked=" Payradio== '1'?true:false" value="1" style="transform:scale(0.7);color: red;"></radio>
							<text class="">在线</text>
						</radio-group>
					</view>
					<view v-show="showPicker">
						<text class="margin-right-sm">所在区域：</text><text class="cuIcon-triangledownfill margin-right-xs"></text>
						<text @tap="toggleTab">{{mapValue}}</text>
					</view>
				</view>

				<view class="flex align-center justify-center hx-btn radius margin-top-xl" @tap="submit" data-target="DialogModal2">
					<text class="text-white">
						提交申请
					</text>
				</view>

				<view class="cu-modal padding-lr-xl " :class="modalName=='DialogModal2'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">{{Title}}</view>
							<view class="action" @tap="hideModal(-1)">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-lr flex flex-direction align-start" style=" overflow: auto; height: 780upx; text-align:left">
							<rich-text :nodes="Content" type=text></rich-text>
						</view>
						<view class="cu-bar bg-white">
							<view class="action margin-0 flex-sub text-red solid-left " @tap="hideModal(-1)">不同意</view>
							<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal(1)">同意</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<w-picker :mode="cityPicker.mode" :defaultVal="cityPicker.value" @confirm="onConfirm" themeColor="#f00" :ref="cityPicker.picker">
		</w-picker>
	</view>
</template>

<script>
	import hxInput from '../../components/hxInput.vue';
	import wPicker from "@/components/w-picker/w-picker.vue";
	import htmlParser from '@/common/html-parser'
	export default {
		components: {
			wPicker,
			hxInput
		},
		data() {
			return {
				showPic:false,
				modalName: null,
				Uname: '',
				Phone: '',
				code: '',
				mapValue: '请选择省/市/县',
				radio: 5,
				Payradio: '',
				cityPicker: {
					mode: "region",
					name: "省市区",
					value: [26, 6, 0],
					picker: 'region'
				},
				city: '',
				area: '',
				index: 0,
				basicsList: [{
					cuIcon: 'ti',
					name: '提交申请'
				}, {
					cuIcon: 'gu',
					name: '顾问受理'
				}, {
					cuIcon: 'qian',
					name: '合作签约'
				}, {
					cuIcon: 'kai',
					name: '开通权限'
				}, {
					cuIcon: 'fu',
					name: '服务培训'
				}],
				basics: 0,
				showPicker: false,
				allowSubmit: false,
				userInfo: null,
				ContentGR: '', //个人代理政策
				ContentQY: '', //区代理政策0
				Content:'',
				TitleGR: '',
				TitleQY: '',
				Title: '',
				disable: true,
				showPayRadio: false,
				agencyType:0,
				showAgencyType:true,
				showChuji:true,
				showGaoji:true,
				showQuyu:true
			}
		},
		
		// if(res.Msg==='个人代理'){
		// 	this.agentType = 2
		// }else if(res.Msg==='高级代理'){
		// 	this.agentType = 3
		// }else if(res.Msg==='区域代理'){
		// 	this.agentType = 4
		// }
		
		
		onLoad(route) {
			if('agencyType' in route){
				this.agencyType = route.agencyType*1
				console.log(this.agencyType)
				if(this.agencyType===2){
					this.showChuji=false
				}else if(this.agencyType === 3){
					this.showChuji=false
					this.showGaoji=false
				}
				this.showAgencyType = false
			}
			
			if (this.$store.state.hasLogin === true) {
				this.userInfo = this.$store.state.userInfo;
				this.Phone = this.userInfo.Phone;
				this.isLogin = true;
			} else {
				this.userInfo = null;
			}
			setTimeout(() => {
				this.showPic = true;
			},300);
			
			this.showPicker = true;
		},
		// onShow() {
		// 	setTimeout(() => {
		// 		this.showPic = true;
		// 	}, 1000);
		// },
		methods: {
			hidePic(){
				this.showPic =false;
			},
			getDLXY(type) {
				//获取个人代理协议
				console.log('获取协议');
				if (this.radio == '5') {
					//个人代理
					if (this.ContentGR == '') {
						uni.request({
							url: "https://newsapp.huaxuapp.com/api/news/personalagentagree",
							method: "GET",
							success: (res) => {
								console.log(res);
								var tem = res.data.Content
								this.ContentGR = htmlParser(res.data.Content);
								this.TitleGR = res.data.Title;
								this.modalName = type.currentTarget.dataset.target;
								this.Content = this.ContentGR;
								this.Title = this.TitleGR ;
							}
						});
					} else {
						this.modalName = type.currentTarget.dataset.target;
						this.Content = this.ContentGR;
						this.Title = this.TitleGR ;
					}
				
				} else if (this.radio == '8' || this.radio == '6') {
					//县级代理
					if (this.ContentQY == '') {
							console.log('为空');
						uni.request({
							//获取site
							url: "https://newsapp.huaxuapp.com/api/news/regionalagent",
							method: "GET",
							success: (res) => {
								console.log(res);
								var tem = res.data.Content;
								this.ContentQY = htmlParser(res.data.Content);
								this.TitleQY = res.data.Title;
								this.modalName = type.currentTarget.dataset.target;
								this.Content = this.ContentQY;
								this.Title = this.TitleQY;
							}
						});
					} else {
						this.modalName = type.currentTarget.dataset.target;
						this.Content = this.ContentQY;
						this.Title = this.TitleQY;
					}
				} else if (this.radio == '7') {
					//市级代理
					if (this.ContentQY == '') {
						uni.request({
							//获取site
							url: "https://newsapp.huaxuapp.com/api/news/regionalagent",
							method: "GET",
							success: (res) => {
								console.log(res);
								var tem = res.data.Content
								this.ContentQY = htmlParser(res.data.Content);
								this.TitleQY = res.data.Title;
								this.modalName = type.currentTarget.dataset.target;
								this.Content = this.ContentQY;
								this.Title = this.TitleQY;
							}
						});
					} else {
						this.modalName = type.currentTarget.dataset.target;
						this.Content = this.ContentQY;	
						this.Title = this.TitleQY;
					}
				}
			},
			payRadioChange: function(e) {
				this.Payradio = e.detail.value;
			},
			bindPickerChange: function(e) {
				this.index = e.target.value;
			},
			RadioChange: function(e) {
				this.radio = e.detail.value;
				this.Payradio = '';
				this.mapValue = '请选择省/市/县';
				this.city = '';
				this.area = '';
				
				console.log('当前选项：', e);
				
				// (this.radio == 5) {//个人！！！！！！！！！！！！！！！！！！！！！！！
				// 	//当选择个人代理时候不能选择区域
				// 	this.showPicker = false;
				// } else if 
				if (this.radio == 8  || this.radio == '6' || this.radio == 5) {//县区！！！！！！！！！！！！！！！！！！！！！！！！！！！
					//当选择县级时候三级联动
					// this.showPicker = true;
					this.cityPicker.mode = 'region';
				} 
			},
			hideModal(i) {
				if (i > 0) {
					//同意
					if (this.allowSubmit) {
						//如果验证码验证成功
						if (this.radio == '5') {
							//如果是个人代理直接跳转付钱
							uni.navigateTo({
								//跳转至支付页面，
								url:`/pages/agency/agencyPay?sort=${this.radio}&Uname=${this.Uname}&area=${this.area}`
							})
						} else if (this.radio == '6') {
							// 高级个人代理
							uni.navigateTo({
								//跳转至支付页面，
								url:`/pages/agency/agencyPay?sort=${this.radio}&Uname=${this.Uname}`
							})
							// this.sendRequest(this.userInfo.ID, this.Uname, this.Phone, this.radio, this.area);
						} else {
							//否则就是区县代理
							this.sendRequest(this.userInfo.ID, this.Uname, this.Phone, this.radio, this.area);
						}
					} else {
						this.$api.msg("验证码错误");
					}
				} else {
					//不同意
					console.log("不同意");
				}
				this.modalName = null
			},
			submit: function(e) {
				//姓名校验
				console.log(this.Payradio);
				if (this.userInfo != null) {
					if (this.Uname != '') {
						if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.Phone))) {
							this.$api.msg("手机号码有误，请重填");
						} else {
							if (this.code != '') {
								//*****
								//获取验证码，方法内执行验证码校验
								if (this.radio == '') {
									//如果没有选择代理方式
									this.$api.msg("请选择代理方式")
								} else {
									//选择代理方式
									if (this.radio == '8') {
										//县区代理
										if (this.city != '' && this.area != '') {
											//验证码校验，如果成功则allowSubmit 为True
											this.getCode();
											this.getDLXY(e)
										} else {
											this.$api.msg("请选择区域")
										}
									} else {
										//个人代理
										this.getCode();
										this.getDLXY(e);
									}
								}
							} else {
								this.$api.msg("请输入验证码");
							}
						}
					} else {
						this.$api.msg('请输入您的姓名');
					}
				} else {
					this.$api.msg("未知错误，请重新登录")
				}
			},
			onConfirm(val) {
				var province = val.checkArr[0];
				var city = val.checkArr[1];
				var area = val.checkArr[2];
				this.mapValue = val.result;
				this.city = city;
				this.area = area;
				console.log(val);
			},
			toggleTab(index) {
				this.$refs.region.show();
			},
			getCode() {
				uni.request({
					url: "https://newsapp.huaxuapp.com/api/menber/yzmislost",
					data: {
						phone: this.Phone,
						yzm: this.code,
						dt: this.$store.state.timer
					},
					method: "GET",
					success: (res) => {
						if (res.data.IsSuccess) {
							this.allowSubmit = true;
						}
					},
					fail() {
						this.$api.msg("请再次获取验证码");
					}
				});
			},
			sendRequest(userID, name, phone, sort, area) {
				console.log(
					{
						userID, 
						name, 
						phone, 
						sort, 
						area
					}
				)
				uni.request({
					url: "https://newsapp.huaxuapp.com/api/agent/AddAgent",
					data: {
						userID: userID,
						name: name,
						phone: phone,
						sort: sort,
						area: area
					},
					method: "GET",
					success: (res) => {
						uni.navigateTo({
							//跳转至等待审核界面
							url: "/pages/changeBusiness/waitSubmit?type=dl"
						})
					},
					fail() {
						this.$api.msg("哦豁，出现异常");
					}
				});

			}

		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
</style>

<style scoped lang="scss">
	page{
		background: #FFFFFF;
	}
	
	.cu-modal.show {
		opacity: 1;
		transition-duration: 0.2s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}

	.hx-btn {
		height: 80upx;
	}

	.cu-steps .cu-item [class*="hxIcon-"],
	.cu-steps .cu-item .num {
		display: block;
		font-size: 40upx;
		line-height: 80upx;
	}

	.cu-steps .cu-item::after {
		border-bottom: 1px solid currentColor;
		width: 0px;
		transition: all 0.3s ease-in-out 0s;
	}

	.cu-steps .cu-item[class*="text-"]::after {
		width: calc(100% - 80upx);
		color: currentColor;
	}

	.cu-steps.steps-arrow .cu-item::before,
	.cu-steps.steps-arrow .cu-item::after {
		content: "\e657";
		font-family: 'iconfont';
		height: 30upx;
		border-bottom-width: 0px;
		line-height: 30upx;
		top: 0;
		bottom: 0;
		margin: auto;
		color: #ccc;
	}

	.submit {
		display: flex;
	}

	.hx-btn {
		background-color: #ec3a46;

		&.normal {
			opacity: .3
		}
	}
</style>
