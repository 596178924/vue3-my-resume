import { defineStore } from "pinia"
export const useStoreUser = defineStore('User', {
    state: () => ({
        _user_name: ''
    }),
    getters: {
        userName: ({ _user_name }) => _user_name,
    },
    actions: {
        setStoreUserName(str) {
            this._user_name = str
        }
    },
    // 开启数据缓存
    // persist: {
    //     enabled: true,
    //     strategies: [
    //         {
    //             key: '_Store_User',
    //             storage: localStorage,
    //         }
    //     ]
    // },
})
