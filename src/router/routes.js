import Layout from "@/layout/index.vue"
export default [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/home',
        meta: {
            title: '首页',
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import(/* webpackChunkName: "about" */ '@/views/homepage/index.vue')
            },
        ]
    }
]
