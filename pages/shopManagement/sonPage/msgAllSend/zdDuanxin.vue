<template>
	<view style="background-color: #ffffff;">
		<view style="border-bottom: 0.5px solid rgba(180,180,180,0.5);">
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-whitesss" backColor="text-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">创建指定用户</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">创建指定用户</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>

		<view class="listItem" style="border-bottom: 0upx;">
			<view>
				发送对象
			</view>

			<view class="" style="margin-right: 20upx;">
				指定用户
			</view>
		</view>
		
		<view class="padding margin flex justify-between" style="margin-top: 20upx;background: #fdf2f3;">
			<view>
				<textarea :value="phones" maxlength="99999999" placeholder="请输入手机号,用逗号隔开" placeholder-style="font-size:26upx;" style="width: 630upx;height: 130upx;" @input="bindTextAreaBlurs"/>
			</view>
		</view>

		<view class="listItem " style="width: 100%; padding: 0;">
			<picker mode="date" @change="timeChange" class="padding" style="width: 100%;">
				<view class="flex align-center  justify-between " style="width: 100%;">
					<view class="flex align-center">
						<text>
							发送时间
						</text>
					</view>
					<view class="flex align-center justify-center">
						<view style="margin-right: 30upx;">
							<text class="margin-left-sm" style="color: rgb(180,180,180);line-height: 1em;">
								{{timeValue.length===0?'请选择':timeValue}}
							</text>
						</view>
						<view class="hxIcon-rightArrow"style="color: rgb(180,180,180);font-size: 24upx;">
							
						</view>
					</view>
				</view>
			</picker>
		</view>
		
		<view class="listItems">
			<view>
				发送内容：
			</view>
		</view>
		<view class="padding" style="padding-bottom: 0;">
			<view class="msgContent">
				<view>
					<textarea value="" maxlength="45" placeholder="暂无内容" placeholder-style="font-size:26upx;" style="width: 630upx;height: 200upx;" @input="bindTextAreaBlur"/>
				</view>
				<view class="flex justify-end ">
					<text style="color: rgb(180,180,180);" class="text-sm">最多输入45个字<text></text></text>
					<!-- <text  class="text-sm text-blue margin-left-sm" @tap="showS">计费规则</text> -->
				</view>
			</view>
		</view>

		<view class="margin-top-xl padding-lr" style="background-color: #f1f1f1;padding-top: 20upx;">
			<view class="sure " @tap="submit">
				<text style="font-size: 30upx;color: #ffffff;">发布</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(route) {
			this.StoreID = route.StoreID
			this.HasSmsCount = route.HasSmsCount
			// this.msgSort = route.msgSort * 1
			// this.huiyuanLei = route.huiyuanLei
			// this.StoreName = route.StoreName
		},
		onShow() {
			// this.muBanList = this.$store.state.muBanMsgList
			// this.muBanIndex = this.$store.state.muBanIndex
			// if (this.muBanList[this.muBanIndex]) {
			// 	this.mubanTitle = this.muBanList[this.muBanIndex].title
			// 	this.msgContent = `${this.muBanList[this.muBanIndex].title}~${this.muBanList[this.muBanIndex].content}`
			// }

		},
		data() {
			return {
				StoreName: '', //店铺名称
				ziShu: 0,
				StoreID: 0,
				msgSort: 0,
				huiyuanLei: '全部',
				msgContent: '',
				mubanTitle: '',
				timeValue: '',
				phones: '',
				muBanList: [], //短信模板列表
				muBanIndex: 0, //vuex中选中的模板
				keyWord:'',
				strs:'',
				inx: 0,
				len:0,
				HasSmsCount:0
			}
		},
		methods: {
			showS(){
				uni.showToast({
					icon:'none',
				    title: '短信资费0.1/条,空格及标点符号都计入可输入字数',
				    duration: 5000
				});
			},
			bindTextAreaBlur: function (e) {
			    console.log(e.detail.value)
				this.ziShu = e.detail.value.length
				this.keyWord = e.detail.value
			},
			bindTextAreaBlurs: function (e) {
			    console.log(e.detail.value)
				this.phones = e.detail.value
			},
			timeChange(e) { //时间选择的函数
				this.timeValue = e.detail.value
			},
			goToMuBan() {
				uni.navigateTo({
					url: `/pages/Person/shopManagement/sonPage/msgAllSend/msgAllSendThree?StoreID=${this.StoreID}&StoreName=${this.StoreName}`
				})
			},
			phoneInput(e) {
				this.phones = e.detail.value
			},
			ToCDB(str) { //全角转换为半角
				var tmp = "";
				for (var i = 0; i < str.length; i++) {
					if (str.charCodeAt(i) == 12288) {
						tmp += String.fromCharCode(str.charCodeAt(i) - 12256);
						continue;
					}
					if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
						tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
					} else {
						tmp += String.fromCharCode(str.charCodeAt(i));
					}
				}
				return tmp
			},
			phone(TEL) {
		        var strTemp = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
		        if (strTemp.test(TEL)) {
		            return true;
		        }
		        return false;
		    },
			async submit() {
				this.inx = 0
				this.len = 0
				if (this.phones != '') {
					if (this.timeValue.length === 0) {
						this.$api.msg('请填写发送时间')
						return
					} else {
						if (this.keyWord.length === 0) {
							this.$api.msg('请填写短信内容')
							return
						} else {
							this.phones = this.ToCDB(this.phones)
							console.log(this.phones);
							var str = this.phones.split(',');
							console.log(str.length);
							this.len = str.length
							str.forEach((res,i) => {
								console.log(res,i);
								this.strs = res
								
								if(!this.phone(this.strs)) {
									this.$api.msg('手机号错误');
									this.inx = '1'
									return
								}
							})
							if(this.inx != 1){
								if(this.len <= this.HasSmsCount){
									uni.showModal({
										title: '您确定要群发信息吗？',
										content: '群发信息将会扣除您的信息数量',
										success: res => {
											if (res.confirm) {
												this.sendMsg()
											}
										},
									});
								} else {
									uni.showModal({
										content: '您的短信余量不足，请前去充值！',
										showCancel:true,
										confirmText: '去充值',
										success: (res) => {
											if (res.confirm) {
												console.log('点击确定');
												uni.navigateTo({
													url:'/pages/shopManagement/sonPage/witHdraw/dxwitHdraw?StoreID=' + this.StoreID
												})
											}
										}
									})
								}
							}
						}
					}
				} else {
					this.$api.msg('手机号不能为空');
					return
				}
				
			},
			async sendMsg() {
				
				let getData = {
					StoreID: this.StoreID,
					userID: this.userInfo_.ID,
					content: this.keyWord, //内容
					msgSort: 3, //分类 0:全部 1：直推，2：消费，3：指定
					sendDate: this.timeValue,
					phones:this.phones
				}
				console.log(getData)
				let res = await this.$Request.get(this.$store.state.sendDuanUrl, getData)
				console.log(res)
				if (res.IsSuccess) {
					this.$api.msg(res.Msg, 2000, false, 'success')
					uni.redirectTo({
						url:'/pages/shopManagement/sonPage/msgAllSend/dxGuanli?StoreID=' + this.StoreID
					})
				} else {
					this.$api.msg(res.Msg, 2000)
				}
			},
		}
	}
</script>

<style scoped>
	page{
		background-color: #ffffff;
	}
	
	.listItem {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2upx solid rgba(180, 180, 180, 0.2);
		padding: 30upx;
	}
	
	.listItems {
		padding: 30upx;
		padding-bottom: 10upx;
	}

	.msgContent {
		background: #fdf2f3;
		padding: 30upx;
	}
	
	.sure {
		margin-top: 50upx;
		height: 88upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fe5479;
		color: #fff;
		border-radius: 100upx;
		/* box-shadow: 2upx 2upx 14upx lighten($color: #FC7265, $amount: 10); */
	}
</style>
