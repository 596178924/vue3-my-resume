<template>
	<div class="m-card" :class="cardBindClass">
		<div class="m-card__header" v-if="slots.header">
			<slot name="header"> </slot>
		</div>
		<div class="m-card__body" :style="bodyStyle">
			<slot name="default"></slot>
		</div>
		<div class="m-card__footer" v-if="slots.footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script setup>
import { computed, defineProps, toRefs, useSlots } from "vue-demi";
import { sizeInterface, activeModeInterface } from "@gc/_interfaceTypes.js";
import { isString, isBoolean } from "@gc/_validator.js";
const slots = useSlots();
const props = defineProps({
	size: {
		type: String,
		default: "medium",
		validator: (v) => sizeInterface.includes(v),
	},
	bodyStyle: {
		type: [String, Array, Object],
		default: "",
	},
	// shadow:{
	//     type: [String, Boolean],
	// }
	shadow: {
		type: [String, Boolean],
		default: "always",
		validator: (v) => {
			console.log("validator", v, isBoolean(v));
			if (isBoolean(v)) {
				return true;
			} else {
				return ["", ...activeModeInterface].includes(v);
			}
		},
	},
});

const { size, shadow } = toRefs(props);

const cardBindClass = computed(() => {
	const classList = [];
	const _size = size.value;
	if (_size && isString(_size)) {
		classList.push(`m-card-size--${_size}`);
	}
	const _shadow = shadow.value;
	if (_shadow == "" || (isBoolean(_shadow) && _shadow === true)) {
		classList.push(`m-card-shadow--always`);
	} else if (isString(_shadow) && _shadow != "never") {
		classList.push(`m-card-shadow--${_shadow}`);
	}
	return classList;
});
</script>

<style lang="scss" scoped>
.m-card {
	--ml-card-border-color: var(--ml-border-color-light);
	--ml-card-border-radius: var(--ml-border-radius-base);
	--ml-card-bg-color: var(--ml-fill-color-blank);
	--ml-card-padding-size: 14px;
	--ml-card-padding: var(--ml-card-padding-size, 0);

	border-radius: var(--ml-card-border-radius);

	border: 1px solid var(--ml-card-border-color);
	background-color: var(--ml-card-bg-color);
	// overflow: hidden;
	color: var(--ml-text-color-primary);

	display: inline-flex;
	flex-direction: column;
	&__header,
	&__body,
	&__footer {
		padding: var(--ml-card-padding);
		transition: padding 0.3s;
	}
	&__header {
		border-bottom: var(--ml-border);
	}
	&__footer {
		border-top: var(--ml-border);
	}
}
.m-card-shadow-- {
	&always,
	&hover {
		transition: var(--ml-transition-box-shadow);
	}
	&always,
	&hover:hover {
		box-shadow: var(--ml-box-shadow-light);
	}
}
.m-card-size-- {
	&mini {
		--ml-card-padding-size: 4px;
	}
	&small {
		--ml-card-padding-size: 8px;
	}
	&medium {
		--ml-card-padding-size: 14px;
	}
	&large {
		--ml-card-padding-size: 20px;
	}
}
</style>
