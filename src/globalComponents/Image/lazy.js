// import defaultImg from '@/assets/imageLoadError.png'

import { onMounted } from 'vue-demi'
export const useIntersectionObserver = (targetRef, callback, options) => {
    let observer;
    function stop() {
        observer.unobserve(targetRef)
        callback && callback()
    }
    onMounted(() => {
        observer = new IntersectionObserver((changes) => {
            const [{
                isIntersecting
            }] = changes
            if (isIntersecting) {
                stop()
            }
        },options)
        observer.observe(targetRef)
    })
    return {
        stop
    }
}
/*
const targetRef = ref();
const isOver = ref(false); //检测完毕
onMounted(() => {
    const observer = new IntersectionObserver((changes) => {
        console.log(changes);
        for (const change of changes) {
            console.log(change.time);
            // Timestamp when the change occurred
            // 当可视状态变化时，状态发送改变的时间戳
            // 对比时间为，实例化的时间，
            // 比如，值为1000时，表示在IntersectionObserver实例化的1秒钟之后，触发该元素的可视性变化

            console.log(change.rootBounds);
            // Unclipped area of root
            // 根元素的矩形区域信息，即为getBoundingClientRect方法返回的值

            console.log(change.boundingClientRect);
            // target.boundingClientRect()
            // 目标元素的矩形区域的信息

            console.log(change.intersectionRect);
            // boundingClientRect, clipped by its containing block ancestors,
            // and intersected with rootBounds
            // 目标元素与视口（或根元素）的交叉区域的信息

            console.log(change.intersectionRatio);
            // Ratio of intersectionRect area to boundingClientRect area
            // 目标元素的可见比例，即intersectionRect占boundingClientRect的比例，
            // 完全可见时为1，完全不可见时小于等于0

            console.log(change.target);
            // the Element target
            // 被观察的目标元素，是一个 DOM 节点对象
            // 当前可视区域正在变化的元素
        }
    }, {});
    observer.observe(targetRef.value); //发起
    // observer.unobserve(target); //卸载
    // observer.disconnect(); //卸载所有
});
*/
