/** 模态框固定 props 参数, 用于调用模态框成功|关闭|销毁 */
export const modalProps = {
    // 是否展示组件
    modelValue: {
        type: Boolean,
        required: true,
    },
    // 组件消失时(移除实例)
    vanish: {
        type: Function
    },
    // 组件调用成功事件
    resolve: {
        type: Function
    },
    // 组件调用失败事件
    reject: {
        type: Function
    },
}

/** 组件内传入 props 参数, 用于模态框自定义功能 */
export const componentProps = {
    // 模态框标题
    title: {
        type: String,

    },
    // 模态框内容
    content: {
        type: String
    }
}

/** 组件内所有 Props 参数, 合并参数 */
export const exProps = {...modalProps, ...componentProps}
