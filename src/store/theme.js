import { defineStore } from "pinia"

export const ThemePrimaryColors = ['#409EFF', '#f56c6c', '#67c23a', '#e6a23c', '#AD3CE6', '#00CBC4', '#FF128D'];
export const useThemeStore = defineStore('theme', {
    state: () => ({
        _themeMode: false, // 光照模式 false light, 暗黑模式 true dark
        _themePrimaryColor: ThemePrimaryColors[0], // 主题 颜色
    }),
    getters: {
        themeMode: ({ _themeMode }) => _themeMode,
        themePrimaryColor: ({ _themePrimaryColor }) => _themePrimaryColor,
    },
    actions: {

    },
    // // 开启数据缓存
    // persist: {
    //     enabled: true,
    //     strategies: [
    //         {
    //             key: '_pinia_Store_Theme',
    //             paths:['_themePrimaryColor'],
    //             storage: localStorage,
    //         }
    //     ]
    // },
})


function matchMediaDark() {
    return global.matchMedia("(prefers-color-scheme: dark)").matches
}
