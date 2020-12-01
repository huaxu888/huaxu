<template>
	<view>
		<cu-custom bgColor="bg-white" class="text-black" :isBack="true">
			<!-- #ifdef APP-PLUS || H5-->
			<block slot="content">奖励规则</block>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<block slot="content">奖励规则</block>
			<!-- #endif -->
		</cu-custom>
		<view>
			<view style="background-color: #FFFFFF;overflow:auto;padding-bottom: 800upx;">
				<view  style="color: #333333;padding: 30upx;text-align:justify;">
					<view style="text-align: center;margin-bottom: 40upx;"><text style="font-size: 34upx;font-weight: 600;">花蓄奖励使用细则</text></view>
					<view style="line-height: 38upx;margin-bottom: 20upx;">
						1、花蓄奖励是我公司花蓄平台推出的集消费奖励、推广奖励和招商分润为一体的奖励体系，是平台正式会员合法合规有效资产，不同奖励类型<text style="color: red;">可用于兑换换购和购买产品或佣金结算。</text>
					</view>
					<view style="line-height: 38upx;margin-bottom: 20upx;">
						2、花蓄奖励分为消费奖励、推广奖励和分润奖励三种类型，均长期有效
						<view><text style="color: red;">①消费奖励：</text>注册成为花蓄会员并成功激活会员账户后，在平台内消费任何商家产品（不含花蓄自主换购产品），按规则获得相应奖励，该奖励积累一定数量后可等值换购花蓄自主品牌产品，<text style="color: red;">换购的产品不再积累奖励 ；</text></view>
						<view><text style="color: red;">②推广奖励：</text>花蓄正式会员线上分享推广按规则获得一定的推广奖励奖励，该奖励可购买平台任何产品或实时结算；</view>
						<view><text style="color: red;">③分润奖励：</text>花蓄正式会员成功招商，商家与公司签订合同后，获得该商家所有产品平台销售净利润业绩的分润奖励，该奖励可购买平台任何产品或实时结算。</view>
					</view>
					<view style="line-height: 38upx;margin-bottom: 20upx;">
						3、花蓄会员所有在平台上换购和购买的产品均可在花蓄合作<text style="color: red;">就近实体网点店面自提或邮寄。</text>
					</view>
					<view style="line-height: 38upx;margin-bottom: 20upx;">
					   4、对违反花蓄平台运营红线的会员，经平台核查属实后，我公司有权对该会员账号采取不限于警告、通报、扣罚花蓄奖励、最终封号，必要时追究其法律责任等措施。
					</view> 
					<view style="line-height: 38upx;margin-bottom: 20upx;">
						5、花蓄平台运营红线：
						<view>①任何污蔑、诋毁损害公司正常运作的行为</view>
						<view>②违规操作、在平台提供假冒伪劣产品的行为</view>
						<view>③违反公司资源保护政策的行为</view>
					</view>
					<view>
						<text style="color: red;">注：本奖励规则依照国家相关法律法规进行适当调整，最终解释权归公司所有></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		onLoad() {
			
		}
	}
</script>

<style scoped>
	template{
		
	}
</style>
