export const getPageAllInfo={//获取数组类型的方法
	methods:{//isRefres 如果有下拉刷新 就不显示加载了
		getPageInfo(url,getData,heade=false,isObj=false,isRefres=false){//获取信息
			//this.$api.showLoading_().then(resShowLoading=>{
				//console.log({resShowLoading})
				/*if(!isRefres){
					this.$api.showLoading_()
				}*/
					let loadingFlag = true
					if(isObj){
						loadingFlag = false
					}
					return this.$Request.get(url,getData,heade,loadingFlag).then((res)=>{
					//	this.$api.hidLoading_()
							if(!res.IsSuccess){
								setTimeout(()=>{
									this.$api.msg(res.Msg,2000)
								},300)
								if(res.Msg === "店铺已经被锁定！"){
									uni.navigateBack({
										delta:1
									})
								}
							}
							if(isObj){//是对象
								var keyAry=Object.keys(res)//判断返回值的个数
								if(keyAry.length===0){
									this.$api.msg('暂无数据',1500,false)
								}
								this.infoObject=res
								return this.infoObject//方便链式调用
								//uni.hideLoading()
							}else{	//不是对象
								if(getData.page===1){//是否是第一页
									if(res.length===0){//没数据
									this.$api.msg('暂无数据',1500,false)
									}
									this.infoList=res						
								}else{//不是第一页
									if(res.length===0){//没数据
										// this.$api.msg('已经到最底啦！！！',1000,false,'none')
									}else{//追加数据
										this.infoList=[...this.infoList,...res]
									}
								}
								return this.infoList//方便链式调用
							}
						
						
						/*if(!isRefres){
							this.$api.hidLoading_()
						}*/
					})
				
			//})
		},
		refresGetInfo(heade=false,isObj=false){//下拉刷新
			if(!isObj){//不是对象
				this.getData.page=1
			}
			
			return this.getCurrentPageInfo(heade,isObj,true).then(res=>{
				//this.$api.msg('刷新成功',800,false,'loading')
				uni.stopPullDownRefresh()
				return res
			})
		},
		getCurrentPageInfo(heade=false,isObj=false,isRefres=false){//获取当前页面信息
			return this.getPageInfo(this.infoUrl,this.getData,heade,isObj,isRefres)
		},
		setStorage(sqZzobj,type){
			if(type===1){
				uni.setStorageSync('sqZzobjOne',sqZzobj)
			}else if(type===2){
				uni.setStorageSync('sqZzobjTwo',sqZzobj)
			}else if(type===3){
				uni.setStorageSync('sqZzobjThree',sqZzobj)
			}
			
		},
		getStorage(type){
			var sqZzobj = {}
			if(type===1){
				sqZzobj = uni.getStorageSync('sqZzobjOne')
			}else if(type===2){
				sqZzobj = uni.getStorageSync('sqZzobjTwo')
			}else if(type===3){
				sqZzobj = uni.getStorageSync('sqZzobjThree')
			}
			return sqZzobj
		},
		getCurryStorage(type){
			var sqZzobj=this.getStorage(type)
			if(sqZzobj===''){
				return 
			}else{
				for(let item of this.inputAry){
					var key = item.key
					if(key in sqZzobj){
						item.value = sqZzobj[key]
					}
				}
			}
			if(type===2){
				this.oneImgUrl=sqZzobj.SFZPic1
				this.twoImgUrl=sqZzobj.SFZPic2
				var date = new Date((sqZzobj.SFZYXQ.split('(')[1].split(")")[0])*1)
				this.getData.SFZYXQ=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
				return 2
			}
		},
	},
	data(){
		return {
			flagTitle:false,
		}
	},
	onPageScroll(e){
			if(e.scrollTop>=30){
				this.flagTitle=true
			}else{
				this.flagTitle=false
			}
	},
}

export function geoDistance(lat1, lng1, lat2, lng2) {//根据经纬度计算地理位置
	function rad(d) {
		return d * Math.PI / 180.0;
	}
	  let radLat1 = rad(lat1);
	  let radLat2 = rad(lat2);
	  let a = radLat1 - radLat2;
	  let b = rad(lng1) - rad(lng2);
	  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	  s = s * 6378.137;// EARTH_RADIUS;
	  s = Math.round(s * 10000) / 10000; //输出为公里
	  return s;
}

