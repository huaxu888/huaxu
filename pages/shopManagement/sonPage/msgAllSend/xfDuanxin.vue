<template>
	<view style="background-color: #ffffff;">
		<view style="border-bottom: 0.5px solid rgba(180,180,180,0.5);">
			<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
			<cu-custom bgColor="bg-whitesss" backColor="text-black" :isBack="true">
				<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">创建营销短信</block>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<block slot="content">创建营销短信</block>
				<!-- #endif -->
			</cu-custom>
			<!-- #endif -->
		</view>

		<view class="listItem">
			<view>
				发送对象
			</view>

			<view class="" style="margin-right: 20upx;">
				消费客户
			</view>
		</view>

		<!-- <view class="padding" v-if="msgSort===4">
			<view class="padding-sm bg-white" style="width:100% ; min-height: 150upx;border-radius: 10upx;border: 2upx solid rgba(180,180,180,0.5);">
				<textarea placeholder="请输入多个手机号并用逗号隔开," maxlength="-1" auto-height style="width:100%" :value="phones" @input="phoneInput"></textarea>
			</view>
		</view> -->


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

		<!-- <view class="listItem" @tap="goToMuBan">
			<view>
				<text>
					短信模板
				</text>
			</view>
			<view class="flex align-center justify-center">
				<text class="margin-left-sm" style="color: rgb(180,180,180);line-height: 1em">
					{{mubanTitle.length===0?'请选择':mubanTitle}}
				</text>
				<text class="ygIcon-dibudaohanglan-" style="font-size: 28upx;color: rgb(180,180,180);"></text>
			</view>
		</view> -->
		
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
				<text style="font-size: 30upx;">发布</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(route) {
			this.StoreID = route.StoreID
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
				keyWord:''
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
			async submit() {
				if (this.timeValue.length === 0) {
					this.$api.msg('请填写发送时间')
					return
				}
				
				if (this.keyWord.length === 0) {
					this.$api.msg('请填写短信内容')
					return
				}
				
				// if (this.msgSort === 4) {
				// 	if (this.phones.length === 0) {
				// 		this.$api.msg('填选电话号码不得为空')
				// 		return
				// 	}
				// }
				let res = await this.$api.showModal({
					title: '您确定要群发信息吗？',
					content: '群发信息将会扣除您的信息数量'
				})
				console.log(res)
				if (res) {
					console.log('发短信')
					this.sendMsg()
				}
			},
			// async sendMsg() {
			// 	let getData = {
			// 		StoreID: this.StoreID,
			// 		userID: this.userInfo_.ID,
			// 		title: this.mubanTitle, //标题
			// 		content: this.msgContent, //内容
			// 		msgSort: this.msgSort, //分类 0：直推，1：预存，2：消费,3,全部 4:指定是4
			// 		phones: this.phones //指定的电话
			// 	}
			// 	console.log(getData)
			// 	let res = await this.$Request.get(this.$store.state.msgSendUrl, getData)
			// 	console.log(res)
			// 	if (res.IsSuccess) {
			// 		this.$api.msg(res.Msg, 2000, false, 'success')
			// 	} else {
			// 		this.$api.msg(res.Msg, 2000)
			// 	}
			// },
			async sendMsg() {
				let getData = {
					StoreID: this.StoreID,
					userID: this.userInfo_.ID,
					content: this.keyWord, //内容
					msgSort: 2, //分类  0:全部 1：直推，2：消费，3：指定
					sendDate: this.timeValue
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
