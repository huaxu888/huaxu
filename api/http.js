let Fly = require('flyio/dist/npm/wx')
let fly = new Fly

// 设置超时
fly.config.timeout = 10000

let baseURL 
if(process.env.NODE_ENV === 'development') {
    baseURL = 'https://newsapp.huaxuapp.com/api/'
} else {
    baseURL = 'https://newsapp.huaxuapp.com/api/'
}

// 设置请求地址基址
fly.config.baseURL = baseURL

//添加请求拦截器
fly.interceptors.request.use(
    // 请求之前对请求做处理
    (request)=>{
        return request;
    },
    // 请求失败的处理
    (error) => {
        return Promise.reject(error)
    }
)

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
        //只将请求结果的data字段返回
        return response.data
    },
    (error) => {
        //发生网络错误后会走到这里
        return Promise.reject(error)
    }
)

export default fly