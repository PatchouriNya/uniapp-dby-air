import {useMemberStore} from '../stores'

const baseURL = 'http://106.14.160.207'
const httpInterceptor = {
    invoke(options){
        if (!options.url.startsWith('http')){
            options.url = baseURL+options.url
        }
        options.timeout = 100000
        options.header = {
            'source-client':'miniapp'
        }
        const memberStore = useMemberStore()
        const token = memberStore.profile?.token
        if (token){
            options.header.Authorization = token
        }
    }
}
uni.addInterceptor('request',httpInterceptor)
uni.addInterceptor('uploadFile',httpInterceptor)


export const http = (options)=>{
    return new Promise((resolve,reject)=>{
        uni.request({
            ...options,
            success(res){
                if (res.statusCode >=200 && res.statusCode < 300){
                    resolve(res.data)
                }else if (res.statusCode === 401){
                    const memberStore = useMemberStore()
                    memberStore.clearProfile()
                    uni.navigateTo({url:'/pages/air/index'})
                    reject(res)
                }else {
                    uni.showToast({
                        icon:'none',
                        title:res.data.msg || '请求错误'
                    })
                    reject(res)
                }
            },
            fail(err){
                uni.showToast({
                    icon:'none',
                    title:'网络错误,换个网络试试'
                })
                reject(err)
            }
        })
    })
}