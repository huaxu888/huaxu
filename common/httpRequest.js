import configdata from './config'
import Vue from 'vue'
import  {showLoading_} from './handle.js'//遮罩加载
import {hidLoading_} from './handle.js'//关闭遮罩
// import allApi from '../api/qym/qym.js'
import fly from '@/api/http.js'

// console.log(fly)

// const allApi_ = allApi.qymAllApi
export const HttpRequest_ =  {
	config: function(name) {
	},
	post: function(url, data, header) {
		header = header || "application/x-www-form-urlencoded";
		//url = this.config("APIHOST")+url;
		return new Promise((succ, error) => {
			showLoading_()
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					"content-type": header
				},
				success: function(result) {
					hidLoading_()
					succ.call(self, result.data)
				},
				fail: function(e) {
					hidLoading_()
					error.call(self, e)
				}
			})
		}).then(res=>{
				return res
			},err=>{
				console.log('err：',err)
		})
	},
	get: function(url, data, header) {
		header = header || "application/x-www-form-urlencoded";
		//url = this.config("APIHOST")+url;
		return new Promise((succ, error) => {
			showLoading_()
			uni.request({
				url: url,
				data: data,
				method: "GET",
				header: {
					"content-type": header
				},
				success: function(result) {
					hidLoading_()
					succ.call(self, result.data)
				},
				fail: function(e) {
					hidLoading_()
					error.call(self, e)
				}
			})
		}).then(res=>{
			return res
		},err=>{
			uni.showToast({
				duration:2000,
				title:'数据异常，请稍后再试',
				icon:'none'
			})
			console.log('err：',err)
		})
	}
}

// const baseUrl = 'https://newsapp.huaxuapp.com/api/'
export const HttpRequest = {
	get:function(url,data,loadingFlag=true){
		if(loadingFlag){
			showLoading_()
		}
		return fly.get({
			url,
			params:data
		}).then(res=>{
			if(loadingFlag){
				hidLoading_()
			}
			return res
		},err=>{
			console.log(err)
			if(loadingFlag){
				hidLoading_()
			}
			// uni.showToast({
			// 	duration:2000,
			// 	title:'数据异常，请稍后再试',
			// 	icon:'none'
			// })
			return err			
		})
	}
	// get:function(url,data,loadingFlag=true){
	// 	for (let key of Object.keys(allApi_)){
	// 		let itemObj = allApi_[key]
	// 		if('id' in  itemObj){
	// 			let otherUrl = itemObj.id
	// 			if(otherUrl === url){
	// 				if(loadingFlag){
	// 					showLoading_()
	// 				}
	// 				return itemObj.handle(url,data).then(res=>{
	// 					if(loadingFlag){
	// 						hidLoading_()
	// 					}
	// 					console.log(res)
	// 					return res
	// 				},err=>{
	// 					console.log(err)
	// 					if(loadingFlag){
	// 						hidLoading_()
	// 					}
	// 					uni.showToast({
	// 						duration:2000,
	// 						title:'数据异常，请稍后再试',
	// 						icon:'none'
	// 					})
	// 					// uni.navigateBack({
	// 					// 	success:()=>{
	// 					// 		
	// 					// 	}
	// 					// })
	// 					return err
	// 				})
	// 			}
	// 		}
	// 	}
	// }
}