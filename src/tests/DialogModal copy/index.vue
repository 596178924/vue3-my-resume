<template>
	<!-- after-leave 组件动画结束时, 调用销毁组件(假如有的话) -->
	<transition name="fade" @after-leave="vanish">
		<div class="base-model__mask" v-show="show">
			<div class="base-model__content">
				<div class="base-model__title">{{ title }}</div>
				<!-- 插入自定义插槽, 这里判断默认插槽有没有使用 -->
				<!-- 如果使用, 则渲染插槽, 如果没有, 则渲染 content -->
				<slot v-if="$slots['default']" />
				<template v-else>{{ content }}</template>
				<div class="base-model__control">
					<button @click="onConfirm">确定</button>
					<button @click="onClone">关闭</button>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
// import { defineProps, defineComponent } from "vue-demi";
// import { exProps } from './props'
// const props = defineProps({
// 	...exProps
// });

import { defineComponent, computed, isRef, nextTick, watch } from "vue-demi";
import { exProps } from "./props";
export default defineComponent({
	props: exProps,
	setup: (props, { emit }) => {
		// 组件显示的数据双向代理
		const modelValue = computed({
			get: () => props.modelValue,
			set: (v) => emit("update:modelValue",v),
		});
		// Modal 方法调用传入 props 无法通过 emit 修改
		// 所以假如传入直接是一个 ref 则直接使用
		console.log(isRef(props.modelValue));
		const show = isRef(props.modelValue) ? props.modelValue : modelValue;

		// 假如初始化为 true , 切换状态让动画正常显示
		if (show.value) {
			show.value = false;
			nextTick(() => (show.value = true));
		}

		// 关闭事件, 调用 reject, 为了兼容模板上直接使用组件, 还要在调用一次 clone 事件
		const onClone = () => {
			props.reject && props.reject();
			emit("clone");
			show.value = false;
		};

		// 确定事件, 调用 resolve, 为了兼容模板上直接使用组件, 还要在调用一次 confirm 事件
		const onConfirm = () => {
			props.resolve && props.resolve();
			emit("confirm");
			show.value = false;
		};

		return { show, onConfirm, onClone };
	},
});
</script>
<style lang="scss" scoped>
.base-model__mask {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
}
.base-model__content {
	position: absolute;
	border-radius: 12px;
	width: 600px;
	height: 300px;
	background-color: #ffffff;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 20px;
}
.base-model__control {
	position: absolute;
	right: 0;
	bottom: 20px;
	span {
		margin-right: 20px;
	}
}
/* 组件动画 start */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.fade-enter-top,
.fade-leave-from {
	opacity: 1;
}
/* 组件动画 end */
</style>
