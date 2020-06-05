<template>
    <view class="confirm-phone-page bg-white">
        <cu-custom bgColor="bg-transparent" :isBack="true">
            <!-- #ifdef APP-PLUS || H5 -->
            <block slot="content">一键登录</block>
            <!-- #endif -->
            <!-- #ifdef MP-ALIPAY || MP-WEIXIN -->
            <block slot="backText">一键登录</block>
            <!-- #endif -->
        </cu-custom>
        <view class="cover flex-direction" :style="{ paddingTop: `${pdTop}px` }">
            <view class="info">
                <view class="hx-avatar" style="background-image: url(https://img.huaxuapp.com/huaxulogo.jpg);"></view>
                <view class="flex justify-between phone">
                    <text class="text-lg">
                        <text class="margin-right-xs text-gray">+86</text>
                        {{ setPhone }}
                    </text>
                    <text class="change-phone" @tap="changePhone">
                        更换手机号码
                    </text>
                </view>
                <view class="">
                    <button class="cu-btn lg flex submit-btn" :class="active ? 'active' : ''" @tap="login">确认登录</button>
                </view>
            </view>

            <view class="action-bar">
                <view class="text-sm">
                    登录注册代表你已同意<text class="i" @tap="toWebview('zc')"> 《用户注册协议》 </text>和<text class="i" @tap="toWebview('ys')"> 《隐私协议》 </text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import md5 from 'js-md5';
export default {
    data() {
        return {
            pdTop: this.CustomBar,
            phone: '',
            active: false,
            pid: this.$store.state.tjrid || 0
        };
    },
    onLoad(option) {
        if(option.phone) {
            this.phone = option.phone
        }
    },
    methods: {
        changePhone () {
            uni.navigateTo({
                url: '/pages/common/chagePhone'
            })
        },
        toWebview(url) {
            switch (url){
                case 'ys':
                    uni.navigateTo({
                        url: '/pages/common/webview/webview?url=https://newsapp.huaxuapp.com/ys.html'
                    })
                    break;
                case 'zc':
                    uni.navigateTo({
                        url: '/pages/common/webview/webview?url=https://newsapp.huaxuapp.com/zc.html'
                    })
                    break;
            }
        },
        login() {
            if (this.active) {
                return false
            }
            if (!this.phone) {
                uni.showModal({
                    content: '电话号码获取失败，请重试',
                    showCancel: false
                })
                return false
            }
            let self = this
            let entryData = md5(this.$store.state.entryKey + this.phone)
            self.active = true
            console.log(this.phone);
            console.log(this.$store.state.entryKey);
            console.log(entryData);
            self.$http.loginOnlyPhone(this.phone, entryData, this.pid)
            .then( res => {
                if (res.IsSuccess) {
                    self.$store.commit('login', res.Data)
                    uni.navigateBack({
                        delta: 2
                    })
                    self.$api.msg('登录成功')
                    self.active = false
                } else {
                    self.$api.msg(res.Msg)
                    self.active = false
                }
            })
            .catch( err => {
                this.$api.msg('服务器连接超时，请稍后重试')
                console.log('一键登录失败：', err);
            })
        }
    },
    computed: {
        setPhone() {
            if (this.phone) {
                return this.phone.substr(0, 3) + '****' + this.phone.substr(7)
            } else {
                return ''
            }
        }
    },
};
</script>

<style scoped lang="scss">
.confirm-phone-page {
    width: 100vw;
    height: 100vh;
}

.flex-direction {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.phone {
    margin: 0 60upx;
    padding-bottom: 30upx;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 50upx;
}

.change-phone {
    color: #eb5245;
}

.submit-btn {
    margin: 0 60upx;
    background: #eb5245;
    color: #fff;
    box-shadow: 6upx 6upx 8upx #ddd;
    overflow: hidden;
}

@keyframes s {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(50);
    }
}

@-webkit-keyframes s {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(10);
    }
}

.submit-btn:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 25upx;
    height: 50upx;
    width: 50upx;
    border-radius: 100upx;
    background: radial-gradient(circle, transparent, rgba(255, 255, 255, .5), rgba(255, 255, 255, .8), #fff);
    transform: scale(0);
}

.active:before {
    animation: s 1.5s infinite;
}

.action-bar {
    margin-bottom: 100upx;
    text-align: center;
}

.i {
    color: #eb5245;
}

.cover {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.hx-avatar {
    width: 200upx;
    height: 200upx;
    border-radius: 50%;
    border: 5upx solid #fff;
    background-size: cover;
    margin: 100upx auto 100upx auto;
    box-shadow: 6upx 6upx 8upx #f0f0f0;
}
</style>
