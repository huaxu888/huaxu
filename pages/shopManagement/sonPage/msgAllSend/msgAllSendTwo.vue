<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 || MP-WEIXIN -->
		<cu-custom bgColor="balance-nav" class="text-white" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
				<block slot="content">群发短信</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
				<block slot="content">群发短信</block>
			<!-- #endif -->
		</cu-custom>	
		<!-- #endif -->
		<view class="send_msg padding-lr">
			<view class="padding-tb flex align-center">
				<text>发送主题</text>
			</view>
			<view class="padding bg-white" style="width:100% ; min-height: 150upx;border-radius: 10upx;" >	
				<textarea placeholder="请输入活动主题"  auto-height maxlength="-1" style="width:100%" :value="getData.title" @input="titleInput"></textarea>
			</view>
			<view class="padding-tb flex align-center">
				<text>发送内容</text>
			</view>
			<view class="padding bg-white" style="width:100% ; min-height: 300upx;border-radius: 10upx;" >	
				<textarea placeholder="请填写活动内容"  maxlength="-1"  auto-height style="width:100%" :value="getData.content" @input="contentInput"></textarea>
			</view>
			<view class="padding-tb flex align-center justify-between">
				<text>发送对象</text>
				 <view >
                    <picker @change="bindPickerChange" :value="getData.msgSort" :range="array">
						<view class="flex align-center">
							<text class="margin-right-sx text-red">{{array[getData.msgSort===0?0:getData.msgSort-1]}}</text>
							<text class="cuIcon-triangledownfill"></text>
						</view>
                    </picker>
                </view>
			</view>
			<view class="padding bg-white" style="width:100% ; min-height: 150upx;border-radius: 10upx;" v-if="showFlag" >	
				<textarea placeholder="请输入多个手机号并用逗号隔开,"  maxlength="-1" auto-height style="width:100%" :value="getData.phones" @input="phoneInput"></textarea>
			</view>
			<view class="btn_  flex justify-center">
				<view class="padding flex flex-direction" style="width: 100%;">
					<button class="cu-btn bg-red margin-tb-sm lg" @tap="submit">群发</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(route){
			this.getData.StoreID=route.StoreID
		},
		data(){
				return {
					array:['直推','消费','直推+消费','指定','店铺所属站点全部会员'],
					getData:{
						StoreID:'',
						userID:this.$store.state.userInfo.ID,
						title:'',//标题
						content:'',//内容
						msgSort:0,//分类 0：直推，1：预存，2：消费,3,全部 4:指定是4
						phones:''//指定的电话
					},
					showFlag:false
				}
		},
		methods:{
			ToCDB(str) { //全角转换为半角
				var tmp = ""; 
				for(var i=0;i<str.length;i++){ 
					if (str.charCodeAt(i) == 12288){
						tmp += String.fromCharCode(str.charCodeAt(i)-12256);
						continue;
					}
					if(str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375){ 
						tmp += String.fromCharCode(str.charCodeAt(i)-65248); 
					} 
					else{ 
						tmp += String.fromCharCode(str.charCodeAt(i)); 
					} 
				} 
				return tmp 
			} , 
			titleInput(e){
				this.getData.title=e.detail.value
			},
			contentInput(e){
				this.getData.content=e.detail.value
			},
			phoneInput(e){
				this.getData.phones=e.detail.value
			},
			getCurryInfo(){
				console.log(this.getData)
				return this.$Request.get(this.$store.state.msgSendUrl,this.getData).then(res=>{
					this.$api.msg(res.Msg,2000)
					if(res.IsSuccess){
						uni.navigateTo({
							url:`/pages/changeBusiness/waitSubmit?myStoreID=${this.StoreID}`
						})
					}
					return res
				})
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.getData.msgSort = e.target.value*1
				if(this.getData.msgSort!=0){
					this.getData.msgSort = this.getData.msgSort+1
				}
				console.log('真实选项', this.getData.msgSort)
				if(this.getData.msgSort===4){
					this.showFlag=true
				}else{
					this.showFlag=false
				}
			},
			back(){
				uni.navigateBack({})
			},
			async submit(){
				if(this.getData.title.length===0){
					this.$api.msg('标题不能为空')
					return 	
				}
				if(this.getData.content.length===0){
					this.$api.msg('内容不能为空')
					return 
				}
				let resolve
				if(this.getData.msgSort<4){
					resolve = await this.$api.showModal({
						title:'您确定要群发信息吗？',
						content:'群发信息将会扣除您的信息费用，单条费用：0.1元/条'
					})
				}else{
					resolve = await this.$api.showModal({
						title:'您确定要群发所有用户信息吗？',
						content:'群发信息将会扣除您的信息费用，单条费用：0.1元/条'
					})
				}
				console.log(resolve,this.getData.msgSort)
				if(resolve){
					this.getData.phones = this.ToCDB(this.getData.phones)
					if(this.getData.msgSort!=4){
						this.getData.phones=''
					}
					let res = await this.getCurryInfo()
					console.log(res)
					if(res.IsSuccess){
						this.$api.msg('群发信息成功',2000)
					}else{
						this.$api.msg(res.Msg,2000)
					}
				}else{
					this.$api.msg('取消群发信息',2000)
				}
			}
		}
	}
</script>

<style >
	page{
		background:#F0F0F0;
	}
</style>
