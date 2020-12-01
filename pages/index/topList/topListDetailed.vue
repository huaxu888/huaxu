<template>
	<view>
		
		<view>
			<rich-text v-if="listItem!=null" :nodes="listItem.Content"></rich-text>
		</view>
	</view>
</template>

<script>
	import parse from "@/node_modules/mini-html-parser2"
	export default {
		data: function() {
			return {
				id: -1,
				topList: [],
				listItem: {}
			}
		},
		onLoad(option) {
			this.id = option.ID
			if (this.id > 0) {
				uni.request({
					//获取site
					url: "https://newsapp.huaxuapp.com/api/news/listtttop",
					method: "GET",
					success: (res) => {
						this.topList = res.data;
						this.topList.forEach(item => {
							if (item.ID == this.id) {
								this.listItem = item;
								var richtext = item.Content // 取出富文本字符串
								const regex = new RegExp('<img', 'gi'); // 找到找对img标签
								richtext = richtext.replace(regex, `<img style="max-width: 100%;"`) //正则替换
								this.listItem.Content = richtext;
								// #ifdef MP-ALIPAY
								parse(richtext, (err, nodesList) => {
									this.listItem.Content = nodesList
								})
								console.log(this.listItem.Content);
								// #endif
							}
						})
					},
				});
			}
		},
		onShareAppMessage(obj) {
			return {
				title: '看这里，花蓄又有大动作！',
				imageUrl: '',
				path: '/pages/index/topList/topListDetailed?ID' + this.id
			}
		},
		onShareTimeline(obj) {
			return {
				title: '看这里，花蓄又有大动作！',
				imageUrl: 'https://img.huaxuapp.com/tzhi.jpg',
				path: '/pages/index/topList/topListDetailed?ID' + this.id
			}
		}
	}
</script>

<style>
</style>
