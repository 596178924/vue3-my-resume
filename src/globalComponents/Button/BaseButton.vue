<template>
	<button class="m-button" :type="attrType">
		<slot></slot>
	</button>
</template>
<script setup>
import { sizeInterface, themeTypeInterface } from "@gc/_interfaceTypes.js";
const props = defineProps({
	attrType: {
		//按钮type类型
		type: String,
		default: "button",
	},
	disabled: {
		//按钮是否禁用
		type: Boolean,
		default: false,
	},
	type: {
		// 按钮基础类型
		type: String,
		default: "default",
		validator: (v) => themeTypeInterface.includes(v),
	},
	size: {
		// 大小
		type: String,
		default: "medium",
		validator: (v) => sizeInterface.includes(v),
	},
	text: {
		// 文本按钮
		type: Boolean,
		default: false,
	},
	circle: {
		// 圆形
		type: Boolean,
		default: false,
	},
	border: {
		// 按钮是否显示边框
		type: Boolean,
		default: true,
	},
	dashed: {
		// 按钮边框是否为虚线
		type: Boolean,
		default: false,
	},
	ghost: {
		//按钮背景是否透明
		type: Boolean,
		default: false,
	},
	radius: {
		//按钮是否显示圆角
		type: [Boolean, Number],
		default: true,
	},
	strong: {
		//按钮文字是否加粗
		type: Boolean,
		default: false,
	},
	// keyboard	boolean	true	是否支持键盘操作
	// loading	boolean	false	按钮是否显示加载状态
});
</script>
<style lang="scss" scoped>
.m-button {
	color: inherit;
	border: 0;
	background-color: transparent;
	font-size: inherit;
	&:not([disabled]) {
		cursor: pointer;
	}
	&[disabled] {
		cursor: not-allowed;
	}
}
</style>
