import { ref, readonly } from "vue-demi"
import { isNumber, isFunction } from "@gc/_validator.js"
import { _getObjKV, _toggleRefFn } from "@gc/_utils.js"
import { errorHelper } from "@gc/_errorHelper.js"
/**
 * 使用时间副作用
 * @param {Function} fn 回调函数
 * @param {Number} delay 时间
 * @param {Object} options 额外选项
 * @options {
 * @param { Boolean } immediate 立即执行函数
 * @param { Boolean } loop 循环调用函数
 * @param { Boolean } second 以秒计数
 * }
 * @returns {}
 * @param { Boolean } isActive 是否正在计时中
 * @param { Function } start 开始计时
 * @param { Function } stop 关闭计时
 */

export function useTimeoutEffect(fn, delay, options = {
    immediate: true,
    loop: false,
    second: false,
}) {
    if (isFunction(fn) !== true) throw errorHelper.type('fn', 'function')

    const isImmediate = _getObjKV(options, 'immediate', true)
    const isLoop = _getObjKV(options, 'loop', false)
    const isSecond = _getObjKV(options, 'second', false)
    const _delay = isNumber(delay) ? delay : isSecond ? 1 : 1000
    const second = isSecond ? _delay * 1000 : _delay

    let timer;
    const isActive = ref(false)
    const createTimer = () => {
        timer = setInterval(() => {
            _fn();
            if (isLoop !== true) {
                clearTimer()
            }
        }, second);
    }
    const clearTimer = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    };
    const start = () => {
        clearTimer()
        toggleActive(true)
        createTimer()
    }
    const stop = () => {
        clearTimer()
        toggleActive(false)
    }
    const toggleActive = _toggleRefFn(isActive)
    if (isImmediate) {
        start()
    }
    return {
        isActive: readonly(isActive),
        start: start,
        stop: stop,
    };
}
