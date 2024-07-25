import {ref} from 'vue'
import {defineStore} from 'pinia'
export const useMemberStore = defineStore('member',()=>{
    // 会员信息
    const profile = ref()
    
    // 保存会员信息，登陆时可用
    const setProfile = (val)=>{
        profile.value = val
    }
    // 清理
    const clearProfile = ()=>{
        profile.value = undefined
    }
    return{

        profile,
        setProfile,
        clearProfile
     }
    },
    {
        persist: {
            storage:{
                getItem(key){
                   return uni.getStorageSync(key)
                },
                setItem(key, value){
                    uni.setStorageSync(key, value)
                }
            }
        }
    },
)