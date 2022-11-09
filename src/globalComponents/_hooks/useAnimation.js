import { isFunction } from "@gc/_validator.js"
import { errorHelper } from "@gc/_errorHelper.js"
import { _getCreateTimer } from "@gc/_utils.js"

export function useRequestAnimation(fn) {
    if (isFunction(fn) !== true) throw errorHelper.type('fn','function')
    const contain = isFunction(window.requestAnimationFrame)


    function _createRequestAnimationFrame() {
        if(contain) {
            return {
                reset : requestAnimationFrame,
                destory: cancelAnimationFrame
            }
        } else {
            const CreateTimer = _getCreateTimer()
            return {
                reset: CreateTimer.setTimer,
                destory: CreateTimer.clearTimer,
            }
        }
    }
    // const reset =

}
