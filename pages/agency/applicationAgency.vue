<template>
	<view>
		<view style="background: url('https://img.huaxuapp.com/hhrsq.jpg');background-size:cover; background-repeat: no-repeat; height:1630upx;width: 100%;">
			<!-- #ifndef MP-ALIPAY -->
			<cu-custom bgColor="bg-transparent" class="text-white" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content"></block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content"></block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
			<view class="flex justify-center" style="position: absolute;left: 45upx;bottom: 100upx;" @tap="gotoPage">
				<view  style="font-weight: 600;width: 660upx;height: 120upx;border-radius: 80upx;background-color: #fd5960;font-size: 36upx;text-align: center;line-height: 120upx;color: #ffffff;">
					我要成为代理
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
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
		onShow() {
			
		},
		methods: {
			gotoPage(){
				uni.navigateTo({
					url:'/pages/agency/agencyNew'
				})
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
	
</style>
