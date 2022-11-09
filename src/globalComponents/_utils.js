import { isRef, readonly } from "vue-demi"
import { isArray, isObject , isBoolean} from "./_validator"

// 模拟v-bind:class,目前最多支持 一层对象数组
export function bindClassName(className) {
    if (isArray(className)) {
        return className.map((item) => {
            if (isObject(item)) {
                return classNameObjectToString(item)
            } else {
                return item
            }
        }).join(' ')
    }
    if (isObject(className)) {
        return classNameObjectToString(className)
    }
    return className
}
function classNameObjectToString(obj) {
    return Object.keys(obj).map(_key => {
        return obj[_key] == true ? _key : ''
    }).join(' ')
}


/**
 * 获取 对象中的key值 或 设置默认值
 * @param {Object} obj
 * @param {String} key
 * @param {T} defaultValue
 * @returns
 */
export function _getObjKV(obj, key, defaultValue) {
    return key in obj ? obj[key] : defaultValue
}
// 创建一个修改 ref(boolean) 的函数
export function _toggleRefFn(v) {
    const vIsRef = isRef(v)
    if (vIsRef !== true) return () => { }
    return (bool) => {
        v.value = isBoolean(bool) ? bool : !v.value
        return readonly(v)
    }
}

/**
 * @param {Boolean} _t 要创建  true: Interval 还是 false: Timeout
 * @returns {}
 * @param {Function} setTimer 创建一个定时器
 * @param {Function} clearTimer 卸载一个定时器
 *
 */
export function _getCreateTimer(delay = 1000, _t = false) {
    const seter = _t ? setInterval : setTimeout;
    const clearer = _t ? clearInterval : clearTimeout;
    return {
        setTimer: (_o_fn) => seter(() => _o_fn(), delay),
        clearTimer: (_v) => {
            clearer(_v)
            _v = null
        }
    }
}
