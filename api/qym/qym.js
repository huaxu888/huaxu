import agentRequestModule from './sonHttp/agentRequest'
import findModule from './sonHttp/findRequest'
import prestoreModule from './sonHttp/prestore'
import shopAdministrationModule from './sonHttp/shopAdministration'
import shopListDetailModule from './sonHttp/shopListDetail' 
import wxLoginModule from './sonHttp/wxLogin'
import fly from '../http.js'

function handle (url,data){
	return fly.get({
		url,
		params:data
	})
}
// let qymAllApi = {
// 	...agentRequestModule,
// 	...findModule,
// 	...prestoreModule,
// 	...shopAdministrationModule,
// 	...shopListDetailModule,
// 	...wxLoginModule
// }
// 
// for(let key of Object.keys(qymAllApi)){
// 	 qymAllApi[key].handle = handle
// }
// 
// 
// let qymAllApi_ ={}
// 
// for(let key of Object.keys(qymAllApi)){
// 	let itemObj = qymAllApi[key]
// 	if('name' in itemObj){
// 		qymAllApi_[itemObj.name] = handle
// 	}
// }

export default{
	// qymAllApi,
	// qymAllApi_
}