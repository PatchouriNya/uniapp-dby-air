import {ref} from 'vue'
import {defineStore} from 'pinia'
export const useClientStore = defineStore('client',()=>{
        // 客户信息
        const client = ref()

        // 保存会员信息，登陆时可用
        const setClient = (val)=>{
            client.value = val
        }
        // 清理
        const clearClient = ()=>{
            client.value = undefined
        }
        return{

            client,
            setClient,
            clearClient
        }
    }
)