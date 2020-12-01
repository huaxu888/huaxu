<template>
    <view class="order-evaluation-page">
        <cu-custom bgColor="bg-white" :isBack="true" class="text-black">
            <!-- #ifdef APP-PLUS || H5 -->
            <block slot="content">{{ store.StoreName || '发表评价' }}</block>
            <!-- #endif -->
            <!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
            <block slot="content">{{ store.StoreName || '发表评价' }}</block>
            <!-- #endif -->
        </cu-custom>
        <view class="cu-card case bg-white margin">
            <view class="store-info flex margin">
                <view class="cu-avatar radius xl" :style="{backgroundImage: `url(${store.StorePic})`}"></view>
                <view class="flex flex-direction padding-left justify-between">
                    <text class="text-xl text-bold">{{ store.StoreName }}</text>
                    <view class="flex align-center">
                        <uni-rate :value="startValue" active-color="#eb5245" size="30" @change="starChange"></uni-rate>
                        <text class="margin-left">{{ getEvaluation }}</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-btn lg flex margin-lr bg-hx-red text-white radius" @tap="evaluation">
            提交评价
        </view>
    </view>
</template>

<script>
    import uniRate from '@/components/uni-rate/uni-rate.vue'
    export default {
        components: { uniRate },
        data () {
            return {
                store: {},
                startValue: 4
            }
        },
        onLoad(option) {
            let self = this
            if (option.storeid) {
                this.$http.getStore(option.storeid)
                .then(res => {
                    if (res.IsSuccess) {
                        self.store = res.Data
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
                this.$api.msg('加载店铺失败，请稍后再试')
            }
        },
        computed: {
            /**
             * 将评分数用文字描述出来
             */
            getEvaluation(){
                let notice
                switch (this.startValue){
                    case 5: 
                        notice = '非常满意' 
                        break
                    case 4:
                        notice = '满意'
                        break
                    case 3:
                        notice = '中评'
                        break
                    case 2:
                        notice = '不满意'
                        break
                    default:
                        notice = '非常不满意'
                        break
                }
                return notice
            }
        },
        methods: {
            starChange (res) {
                this.startValue = res.value
            },
            evaluation (res) {
                this.$api.msg('评价成功')
                setTimeout(function(){
                    uni.navigateBack({
                        delta: 1
                    }, 1200)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .store-info {
        padding-bottom: 30upx;
        border-bottom: 1upx solid #ddd;
    }
</style>
<style>
    page {
        background: #f8f8f8;
    }
</style>