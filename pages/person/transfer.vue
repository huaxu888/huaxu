<template>
    <view class="transfer-page">
        <!-- #ifndef MP-ALIPAY -->
        <cu-custom bgColor="bg-white" class="text-black" :isBack="true">
            <!-- #ifdef APP-PLUS || H5-->
            <block slot="content">转账</block>
            <!-- #endif -->
            <!-- #ifdef MP-WEIXIN -->
            <block slot="content">转账</block>
            <!-- #endif -->
        </cu-custom>
        <!-- #endif -->

        <view class="hx-card margin bg-white">
            <view class="hx-card-title padding flex">
                <text class="margin-right" style="margin-right: 100upx;">转账方式</text>
                <view class="text-gray text-sm light" v-if="paymentWay === '可消费金额'">可消费额转出后仅能用于消费</view>
                <view class="text-gray text-sm light" v-else>请确认对方的电话号码无误，避免损失</view>
            </view>

            <radio-group class="block" @change="paymentChange">
                <view class="cu-form-group">
                    <view class="title">
                        转账到可消费金额
                        <view class="margin-left hxIcon-wenhao1 text-gray" @tap="Tip(0)" style="display: inline-flex;position: relative;">
                            <text class="chat text-sm text-black" v-if="showTip[0]">
                                转账到对方的可消费金额，可以使用可消费金额和可提现金额转账，优先使用可消费金额
                            </text>
                        </view>
                    </view>
                    <radio class="red" value="2" :class="paymentWay === '2' ? 'checked' : ''" :checked="paymentWay === '2' ? true : false"></radio>
                </view>
                <view class="cu-form-group" style="border-bottom: 1upx solid #ddd;border-top: 1upx solid #ddd;">
                    <view class="title">
                        转账到可提现金额
                        <view class="margin-left hxIcon-wenhao1 text-gray" @tap="Tip(1)" style="display: inline-flex;position: relative;">
                            <text class="chat text-sm text-black" v-if="showTip[1]">
                                转账到对方的可提现金额，只能使用可提现金额转账
                            </text>
                        </view>
                    </view>
                    <radio class="red" value="1" :class="paymentWay === '1' ? 'checked' : ''" :checked="paymentWay === '1' ? true : false"></radio>
                </view>
            </radio-group>

            <view class="hx-card-content padding bg-white">
                <text class="margin-top">手机号码</text>
                <view class="phone-field margin-top-sm flex padding-bottom-sm margin-bottom" :class="pfocus || correctPhone ? 'active' : ''">
                    <input
                        type="number"
                        v-model="phone"
                        class="flex-sub input text-bold text-lg "
                        :focus="pfocus"
                        @focus="pf"
                        @blur="pb"
                        placeholder="请输入到账方的手机号码"
                        placeholder-style="color: #ddd"
                    />
                    <text class="text-lg text-gray">{{ phoneName }}</text>
                </view>
                <text class="margin-top">转账金额</text>
                <view class="amount-field margin-top-sm flex padding-bottom-sm" :class="afocus || active ? 'active' : ''">
                    <text class="text-bold text-xxl padding-right-sm">￥</text>
                    <input type="digit" v-model="amount" class="flex-sub input text-bold text-sl" @input="changeMoney(amount)" :focus="afocus" @focus="af" @blur="ab" />
                </view>
            </view>
            <view class="flex padding margin-bottom"><text class="cu-btn lg radius flex-sub hx-btn" :class="correctPhone && active ? 'active' : ''" @tap="pay">下一步</text></view>
        </view>
		
        <view class="cu-modal bottom-modal " :class="inputPassWord ? 'show' : ''">
            <view class="cu-dialog"><uni-grid @close="hidePassModal" @fullclose="fullclose" /></view>
        </view>
		
    </view>
</template>

<script>
import uniGrid from '../../components/uni-grid/uni-grid.vue';
import { validatePhone } from '../../common/handle.js';
export default {
    components: { uniGrid },
    data() {
        return {
            amount: '',
            phone: '',
            active: false,
            afocus: false,
            pfocus: false,
            isShow: false,
            paymentWay: '2',
            inputPassWord: false,
            correctPhone: false,
            phoneName: '',
            showTip: [false, false]
        };
    },
    methods: {
		changeMoney(e) {
			setTimeout(() => {
				var index = this.amount.indexOf(".");
				if (index != -1) {
					//没有小数点
					var count = this.amount.length - (index + 1);
					if (count > 2) {
						this.amount = this.$api.formatAmount(this.amount);
					}
				}
			}, 0)
		},
        paymentChange: function(res) {
            this.paymentWay = res.detail.value;
        },
        selectPaymentWay: function(res) {
            this.isShow = true;
        },
        af: function(res) {
            this.afocus = true;
        },
        ab: function(res) {
            this.afocus = false;
        },
        pf: function(res) {
            this.pfocus = true;
        },
        pb: function(res) {
            this.pfocus = false;
        },
        pay: function(res) {
            if (this.active) {
                this.inputPassWord = true;
            }
        },
        Tip(index) {
          if (this.showTip[0] || this.showTip[1]) {
              if (index === 0) {
                  this.$set(this.showTip, 0, !this.showTip[0])
                  this.$set(this.showTip, 1, false)
              } else {
                  this.$set(this.showTip, 1, !this.showTip[1])
                  this.$set(this.showTip, 0, false)
              }
          } else {
              this.$set(this.showTip, index, true)
          }
        },
        hidePassModal: function(res) {
            this.inputPassWord = false;
        },
        fullclose: function(res) {
            this.inputPassWord = false;
            let self = this;
            let pwd2 = res.pwd;
            if (pwd2 === self.$store.state.userInfo.PwdAnswer) {
                uni.request({
                    url: 'https://newsapp.huaxuapp.com/api/scores/zhuangscores',
                    data: {
                        userid: self.$store.state.userInfo.ID,
                        phone: self.phone,
                        num: self.amount,
                        pwd2: pwd2,
                        checksort: self.paymentWay
                    },
                    success: function(res) {
                        if (res.data.IsSuccess) {
                            let oddDate = new Date().toLocaleString('chinese', { hour12: false });
                            let opf = self.paymentWay === '1' ? '可提现余额' : '可消费余额';
                            setTimeout(function() {
                                uni.navigateTo({
                                    url: `/pages/scan/paySuccess?dealType=转账成功&money=${self.amount}&opeFunction=${opf}&oddDate=${oddDate}&phoneName=` + self.phoneName
                                });
                            }, 1200);
                        }
                    },
                    fail: function(res) {
                        console.log('转账出错', res);
                    },
                    complete: function(res) {
                        self.$api.msg(res.data.Msg);
                    }
                });
            } else {
                this.$api.msg('支付密码错误');
            }
        }
    },
    watch: {
        amount(newValue) {
            if (this.phone.length !== 11) {
                this.$api.msg('您输入的电话号码无效');
                this.correctPhone = false;
            }
            if (this.newValue !== '') {
                this.active = true;
            }
        },
        phone(newValue) {
            let self = this;
            if (validatePhone(newValue, this)) {
                this.correctPhone = true;
                uni.request({
                    url: 'https://newsapp.huaxuapp.com/api/menber/getnamebyphone',
                    data: {
                        phone: newValue
                    },
                    success: function(res) {
                        self.phoneName = res.data.Data;
                        if (self.phoneName == null || self.phoneName == '') {
                            self.phoneName = '用户不存在';
                        }
                    }
                });
            } else {
                self.phoneName = '';
                this.correctPhone = false;
            }
        }
    }
};
</script>

<style scoped lang="scss">
.hx-card {
    border: 1px #f3f3f3 solid;
    box-shadow: 1px 1px 3px #ddd, -1px -1px 3px #ddd;

    &-title {
        background: #f8f8f8;
    }

    .amount-field,
    .phone-field {
        border-bottom: 1px solid #ddd;
        transition: all 0.3s ease-in-out;

        &.active {
            border-bottom: 1px solid #eb5245;
        }
    }

    .amount-field {
        .input {
            letter-spacing: 3upx;
            height: 1em;
            line-height: 1em;
        }
    }
}

.hx-btn {
    color: #fff;
    background: #eb5245;
    opacity: 0.3;

    &.active {
        opacity: 1;
    }
}
.tip-btn {
}

.chat {
    width: 200upx;
    background: #f0f0f0;
    margin-left: 30upx;
    border-radius: 8upx;
    padding: 10upx;
    left: 40upx;
    position: absolute;
    line-height: 1.5em;
}

.chat:before {
    content: '';
    position: absolute;
    left: -10px;
    top: 8px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 10px solid #f0f0f0;
}
</style>
<style>
page {
    background-color: #f8f8f8;
}
</style>
