/**微信分享
 * shareData ------ 分享需要的一些数据
 * 
 * **/

export const function share(shareData){
		uni.getProvider({//取出用户信息
			service:'share'
		}).then(data=>{
			var [err,res] =data
			var shareWhat 
			if(res.errMsg==='getProvider:ok'){
				res.provider.forEach(it=>{//判断是否支持微信分享
					if(it==='weixin'){
						shareWhat='weixin' 
					}
				})
			}
			return shareWhat//
		}).then(res=>{
			uni.share({
				type:0,
				provider:res,
				scene:shareData.scene,//分享的类型，详情见官方文档
				title:shareData.title,//标题
				imageUrl:shareData.imageUrl,//图片链接
				href:shareData.href,
				success: function (res) {
					console.log("success:" + JSON.stringify(res));
				},
				fail: function (err) {
					console.log("fail:" + JSON.stringify(err));
				}
			})
		})
	}