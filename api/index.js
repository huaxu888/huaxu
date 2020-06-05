import * as user from './user'
import * as store from './store'
import * as util from './util.js'
import * as person from './person.js'
// import qymRequest from './qym/qym.js'
import Vue from 'vue'
// const qymAllApi_ = qymRequest.qymAllApi_


export const STATUS_OK = '000'

const api = {
    STATUS_OK: STATUS_OK,
    ...store,
    ...user,
    ...util,
	...person
	// ...qymAllApi_
}
Vue.prototype.$http = api

export default api