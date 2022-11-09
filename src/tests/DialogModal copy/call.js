import { ref } from "vue-demi"
import Index from './index.vue'
import { componentProps } from './props'
import { renderInstance } from "./utils"

/** 组件 Props 类型, ExtractPropTypes 可将 Constructor 转换为对应值类型 */
// type Props = ExtractPropTypes<typeof componentProps>

/** 组件调用 resolve 返回结果 */
// type Result = { path: string }[]

/**
 * 模态框调用方法
 * @param props
 * @returns {Promise}
 */
export const Modal = (props) => {
    return new Promise((resolve, reject) => {
        renderInstance(Index, {
            // 这里 modelValue, 为了使组件可修改, 需要传入 ref
            // 注意这块地方，我们将这个值设置为 true 为了调起即直接展示组件
            modelValue: ref(true),
            ...props, resolve, reject
        })
    })
}
