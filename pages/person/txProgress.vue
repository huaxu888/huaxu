<template>
	<view>
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">提现明细</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="backText">提现明细</block>
			<!-- #endif -->
		</cu-custom>
		
		<view class="padding-top-xl" v-if="txList.length>0" >
			<uni-collapse>
				<uni-collapse-item :title="title(item)" :show-animation="true" v-for="(item,index) in txList" :key='index' :open="index == 0? true: false">
					<view class="content1">
						<view class="margin-bottom-xs" v-if="item.BankNo">{{item.Sort == 8 ? '银行卡号' : '支付宝账号'}}：{{item.BankNo}}</view>
						<view class="margin-tb-sm">提现金额：￥{{ changeMoney(item.Score)}}</view>
						<view class="margin-tb-sm">提现时间：{{getLocalTime(item.AddDate)}}</view>
						<view class="padding " style="padding-top: 0;">
							<view class="cu-steps">
								<view class="cu-item" :class="i > (item.State? 2 : 1 ) ? '':'text-red'" v-for="(item2,i) in basicsList" :key="i">
									<text :class="'cuIcon-' + item2.cuIcon"></text> {{item2.name}}
								</view>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'

	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				basicsList: [{
					cuIcon: 'radioboxfill',
					name: '申请提交'
				}, {
					cuIcon: 'usefullfill',
					name: '审核中'
				}, {
					cuIcon: 'roundcheckfill',
					name: '提现成功'
				}],
				basics: 1,
				txList: [],

			}
		},
		onLoad() {
			if (this.$store.state.userInfo.ID) {
				this.$http.getTxList(this.$store.state.userInfo.ID).then(res => {
					console.log(res);
					if (res.IsSuccess) {
						this.txList = res.Data;
						if(this.txList.length==0){
							this.$api.msg('没有提现记录')
						}
					}else{
						
					}
				});
			} else {
				console.log('userId IS null');
			}
		},
		methods: {
			title(item) {
				var title;
				switch (item.Sort) {
					case 1:
						title = '提现到支付宝￥' + this.changeMoney(item.Score)
						break;
					case 8:
						title = '提现到银行卡￥' + this.changeMoney(item.Score)
						break;
					case 11:
						title = '个人代理提现到支付宝￥' + this.changeMoney(item.Score)
						break;
					case 12:
						title = '区域代理提现到支付宝￥' + this.changeMoney(item.Score)
						break;
					case 14:
						title = '商铺消费提现到银行卡￥' + this.changeMoney(item.Score)
						break;
					case 27:
						title = '商铺预存提现到银行卡￥' + this.changeMoney(item.Score)
						break;
					default:
						title = item.Info
						break;
				}
				return title;
			},
			changeMoney(money) {
				return this.$api.formatAmount(money);
			},
			getLocalTime(nS) {
				var date = new Date(parseInt(nS.replace("/Date(", "").replace(")/", ""), 10));
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hour = date.getHours();
				let minute = date.getMinutes();
				let second = date.getSeconds();
				month = month < 10 ? "0" + month : month;
				day = day < 10 ? "0" + day : day;
				date = year + '.' + month + '.' + day + ' ' + hour + ':' + minute + ':' + second;
				return date;
			}
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}
	
	.pure_top {
		width: 100%;
		height: 170upx;
		position: relative;
		z-index: 1;
		overflow: hidden;
	}
	
	.pure_top_after {
		content: '';
		width: 140%;
		height: 170upx;
		position: absolute;
		left: -20%;
		top: 0;
		z-index: 1;
	
		background: #ec3a46;
		overflow: hidden;
		/* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #ec3a46, #eb5245);
		/* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #ec3a46, #eb5245);
		/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
	
	
	.fullwidth {
		width: calc(100% / 1.4);
	}
	
	
	.banner {
		display: flex;
		justify-content: center;
		position: relative;
		width: 100%;
		height: 180upx;
		border-radius: 0 0 95% 95%;
		z-index: 1;
		overflow: hidden;
	}
	
	
	.card {
		top: 60upx;
		position: relative;
		margin-left: 30upx;
		margin-right: 30upx;
		height: 150upx;
		padding: 25upx;
		z-index: 2;
		border-radius: 10upx;
		background: url('https://img.huaxuapp.com/%E6%88%91%E7%9A%84%E5%9B%A2%E9%98%9F.png') no-repeat;
		background-size: cover;
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx;
		margin-top: 20upx;
		position: relative;
		background-color: #fdfdfd
	}

	.example-title__after {
		position: relative;
		color: #031e3c
	}

	.example-title:after {
		content: '';
		position: absolute;
		left: 0;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 10upx;
		height: 40upx;
		border-top-right-radius: 10upx;
		border-bottom-right-radius: 10upx;
		background-color: #031e3c
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		border-top: 1px #f5f5f5 solid;
		padding: 30upx;
		background: #fff
	}

	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}

	.content1 {
		padding: 30upx;
		background: #f9f9f9;
		color: #666;
	}

	.button {
		font-size: 26upx;
		line-height: 90upx;
	}
</style>
