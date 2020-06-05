import Vue from 'vue'


const allUrl={ //所有请求接口
	getListnoSort:'store/listnosort',//获取首页的店铺
	prestoreUrl:`zz/list`,//预存大厅的请求接口
	findListUrl:`news/listnosort` ,//发现页面的 
	searchUrl:`store/getlistbykeyword`,//搜索结果请求接口
	shopDetailUrl:`store/detail`,//店铺详情接口
	getstoresortListUlr:`store/getstoresortlist`,//获取分类信息
	listbysortUrl:`store/listbysort`,//依据类别获得商铺列表       
	loginWXuRL:`menber/newregisterwx`,//微信登陆的接口   
	getopenidUrl:`GetOpenid/getopenid`,//获取微信的openid
	isbindUrl:`menber/isbind`, //判断微信的openID是否绑定    
	shopListUrl:`store/shoplist`,//获取所有的商铺信息
	storesortlistUrl:`store/getstoresortlist`,//店铺分类的接口
	sqDpUrl:`membertoshop/sqdp`,//申请店铺的接口 
	findDetailUrl:`news/detail`,//发现详情的接口    
	wyzzUrl:`zz/wyzz`,//我要赞助获得信息页面逻辑    
	zzUrl:`zz/zz`,//赞助接口
	isGetscUrl:`store/getsc`,//当前用户是否收藏了该店铺
	getHbUrl:'hb/sc',//获取海报的地址
	scUrl:`store/sc`, //收藏当前店铺              
	qxScUrl:`store/qxsc`,//取消当前收藏
	rateAndReserveUrl:`zz/rateAndReserve`,//获取收益率与预存额（收益率:rate,预存额:reserve）
	isSqdpUrl:`membertoshop/sqdppre`,//判断是否申请店铺
	myStoreListUrl:`mystore/MyStoreList`,//一人多店铺列表    
	mystoreUrl:`mystore/mystore`,//我的店铺的管理信息			
	firstrunscoresUrl:`store/firstrunscores`,//申请预存的第一个接口        
	secondrunscoresUrl:`store/secondrunscores` ,//申请预存的第二个接口
	jionrunscoresUrl:`store/jionrunscores`,//申请预存的第三个接口            
	zzxqUrl:`zz/storezzxq`,//店铺的赞助详情									
	storeskewmUrl:`scores/storeskewm`,//商家收款二维码					
	storexxjlUrl:`mystore/xstorexxjl`,//消费记录列表	（日）	
	storexxjeUrl:`mystore/xxstorexxje`,//消费记录列表(月份)		
	mymemberUrl:`mystore/mynewmember`,//我的会员		
	myMsgListUrl:`mystore/StoreMessageLook`,//短信群发的信息列表
	msgSendUrl:`mystore/StoreMessageSend`,//短信群发			
	storexfxqUrl:`mystore/storexfxq`,//账单详情										
	getsyylistUrl:`mystore/getsyyxlist`,//获取营业员列表           
	bdsyyUrl:`mystore/bdsyy`,//绑定营业员              
	deletesyyUrl:`mystore/deletesyy`,//删除营业员               
	editsyyUrl:`mystore/editsyy`,//编辑营业员权限		
	yyyskewmUrl:`scores/yyyskewm`,//营业员收款二维码										
	AddCouponsUrl:`coupon/newsaddcoupons`,//添加优惠券					
	couponsListUrl:`mystore/CouponsList`,//优惠券列表		
	clipCouponsListUrl:`mymember/ClipCouponsList`,//个人的优惠券列表                  	
	zzUrl:`zz/zz`,//对店铺预存的接口										
	rebackUrl:`mystore/reback`,//账单明细退款				
	zzlistUrl:`zz/zzlist`,//店铺申请赞助的列表			
	editstorepicUrl:`mymember/editstorepic`,//店铺店铺的主图或者幻灯图片         
	editlogoUrl:`mymember/editlogo`,//编辑店铺图片logo					
	editUrl:`mymember/edit`,//编辑店铺内容	
	myzzUrl:`mymember/myzzx`,//我的赞助								
	cashOutUrl:`mystore/CashOut`,//消费提现				
	resetsmsUrl:`menber/resetsms`,//开启短信提醒			
	myinfoUrl:`menber/myinfo`,//刷新用户信息         
	getyzmUrl:`sms/getyzm`,//获取验证码									
	yzmislostUrl:`menber/yzmislost`,//验证验证码			
								
	isAgenttypeUrl:`agent/isagenttype`,//判断代理类型	
	//			
	getStore:`mystore/getstore`,//根据扫码获取店铺信息			
	getSys:'scores/sys',
				
				
				
				
				
	agentPersonUrl:`agent/newagentperson`,//个人代理详情                
	agentPoutUrl:`agent/newagentpout`,//个人代理提现               
	agentPoutDetail:`agent/agentpoutdetail`,//个人代理提现明细				
	agentPoutMember:`agent/agentpoutmember`,//个人代理团队	
	agentpmemberdetail:`agent/agentpmemberdetail`,//个人代理的商家详情							
								
	agenTareaesUrl:`agent/newagentareaes`,//区域代理详情					
	agenTareaOutUrl:`agent/newagentareaout`,//区域代理提现			
	agentareaOutDetailUrl:`agent/newagentareaoutdetail`,//区域代理提现明细					
	getagenTareamemberUrl:`agent/newgetagentareamember`,//区域代理商家队伍	
	getAgentareashopdetailUrl:`agent/newagentareashopdetail`,//区域代理商家营业详情							
	js:`scores/js`,//支付 
				
	storeagreeUrl:`news/storeagree`,//转商家协议			
	huaxucommonproblemUrl:`news/huaxucommonproblem`,//常见问题
	huaxumustseeUrl:`news/huaxumustsee`,//新手必看
	huaxudetailUrl:`news/huaxudetail`,//新手必看的详情			
	getshoptxlistUrl:`mystore/getshoptxlist`,//店铺体现的明细						
	getYccashout:`mystore/yccashout`,//预存提现			
	getewm:`getewm/getwxacode`,//获取二维码
	getCard:`card/ck`,//充值卡		
	getGm:`gm/ck`,//店铺主扫收款码			
	getShopBankList:'storebank/getbanklist',//获取店铺的银行卡列表
	addShopBank:`storebank/addbank`,//绑定商铺银行卡
	setShopBankDefault:`storebank/issetdefaultbank`,//设置店铺提现默认银行卡
	deletShopBank:`storebank/deletebank`,//删除店铺银行卡
	mynewmemberdetail:`mystore/mynewmemberdetail`,//会员在店铺的消费详情
	myxfdaydetail:'mystore/myxfdaydetail',//店铺可视化，日，周，月详情	



	getbusiness:`business/getbusstorelist`,//获取该商圈的所有店铺列表
	
	getstoresortlist:`business/getstoresortlist`,//读取商圈店铺分类列表
	businessListbysort:`business/listbysort`,//依据分类获取店铺列表	
	
	
	getBusstoreList:'business/getbusiness',//依据站点获取该站点的商圈列表
	
	editbusiness:`store/editbusiness`,//修改商铺的商圈			

	cancel:`menber/cancel`,//锁定个人账号         
}

const allData={ //所有vuex数据
	dfLogImg:"https://img.huaxuapp.com/pig.png",//默认图片
	cuIconList:[],//分类的Icon信息
	allShopAry:[],//所有商铺的列表				
	isZZ:false,//记录是否预存
	YyyState:1,//店铺的营业员状态 1是收银员 2是店长
	kaiPingflag:0,//记录开屏次数
	latitude:0,//纬度
	longitude:0,//经度
	site:{},//站点对象
	siteList:[]//站点数组
}

export const qymState={
	...allUrl,
	...allData
}




export const qymMutations={
	setLatitudeAndLongitude(sate,mapObj){//设置地理位置
		sate.latitude=mapObj.latitude
		sate.longitude=mapObj.longitude
	},
	setIconInfo(sate,cuIconList){
		sate.cuIconList=cuIconList
	},
	setAllShopAry(sate,ary){//存储所有商铺的列表
		ary.forEach(it=>{
			it.Store.forEach(item=>{
				item.isSmall=true
			})
		})
		sate.allShopAry=ary
	},
	recordIsZZ(state,isZZ){
		state.isZZ=isZZ
	},
	changeYyyState(state,yyyState){
		state.YyyState = yyyState*1
	},
	changekaiPingflag(state,kaiPingflag){
		state.kaiPingflag = kaiPingflag
	},
	setSite(state,site){
		state.site = site
		uni.setStorage({
		    key: 'site',
		    data: site
		})
	},
	setSiteList(state,siteList){
		state.siteList = siteList
	}
}




