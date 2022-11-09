<template>
	<button class="m-button" :class="bindClass" :type="type" :disabled="disabled" @click="handlerClick">
		<slot></slot>
	</button>
</template>
<script setup>
import { defineProps, defineEmits, computed } from "vue-demi";
import { sizeInterface, themeTypeInterface } from "@gc/_interfaceTypes.js";
const props = defineProps({
	type: {
		//按钮type类型
		type: String,
		default: "button",
	},
	disabled: {
		//按钮是否禁用
		type: Boolean,
		default: false,
	},
	loading: {
		//按钮是否等待中
		type: Boolean,
		default: false,
	},
	theme: {
		// 按钮主题类型
		type: String,
		default: "primary",
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
	circle: {
		// 圆形
		type: Boolean,
		default: false,
	},
});
const emits = defineEmits(["click"]);
const bindClass = computed(() => {
	const classList = [
		`size__${props.size}`,
		`theme theme-is__${props.theme}`,
		props.text
			? "is-text"
			: {
					"is-ghost": props.ghost,
					"is-border": props.border,
			  },
		{
			"is-dashed": props.dashed,
			"text-strong": props.strong,
		},
	];
	// classList['size__']
	return classList;
});

function handlerClick(e) {
	if (props.disabled != true || props.loading != true) {
		emits("click", e);
	} else {
		e.stopPropagation();
	}
}
</script>
<style lang="scss" scoped>
.m-button {
	--ml-radius-size-medium: 4px;
	--ml-button-border: none;
	--ml-button-background-color: var(--ml-button-theme-color);
	// var(--ml-button-border-color,--ml-button-background-color)
	color: var(--ml-button-text-color);
	background-color: var(--ml-button-background-color, transparent);
	border-radius: var(--ml-radius-size-medium);
	border: var(--ml-button-border);
	// border-style: var(--ml-button-border-style, solid);
	// border-width: var(--ml-button-border-size, 1px);
	// border-color: var(--ml-button-border-color, );

	display: inline-flex;
	width: fit-content;
	justify-content: center;
	align-items: center;
	font-size: inherit;
	transition: border .3s, background-color .3s;
	&:not([disabled]) {
		cursor: pointer;
		&:hover {
			--ml-button-background-color: var(--ml-hover-background-color);
		}
	}
	&.size__mini {
		padding: 2px;
	}
	&.size__small {
		padding: 3px 6px;
	}
	&.size__medium {
		padding: 4px 12px;
	}
	&.size__large {
		padding: 6px 16px;
	}
	&.text-strong {
		font-weight: bold;
	}
}

.is-border {
	--ml-button-border-size: var(--ml-border-size, 1px);
	--ml-button-border-style: var(--ml-border-style, solid);
	--ml-button-border: var(--ml-button-border-size, 1px) var(--ml-button-border-style, solid) var(--ml-button-border-color);
	&.is-dashed {
		--ml-button-border-style: dashed;
	}
}
.is-text,
.is-ghost {
	&:not(.theme-is__info) {
		--ml-button-text-color: var(--ml-button-theme-color);
	}
}
.is-text,
.is-ghost {
	--ml-button-background-color: transparent;
}
</style>
