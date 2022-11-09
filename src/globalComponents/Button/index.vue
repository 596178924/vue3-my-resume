<template>
	<button class="m-button" :class="bindClass" :type="type" :disabled="disabled" @click="handlerClick">
		<slot></slot>
	</button>
</template>
<script>
export default {
	name: "m-button",
};
</script>
<script setup>
import { defineProps, defineEmits, computed } from "vue-demi";
import { sizeInterface, themeTypeInterface } from "@gc/_interfaceTypes.js";
import { isString } from "@gc/_validator.js";
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
	plain: {
		type: Boolean,
		default: false,
	},
	border: {
		type: Boolean,
		default: false,
	},
	link: {
		type: Boolean,
		default: false,
	},
	theme: {
		// 按钮主题类型
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
	textSize: {
		// 大小
		type: String,
		default: "default",
		validator: (v) => sizeInterface.includes(v),
	},
	decoration: {
		type: [Boolean, String],
		default: false,
	},
});
const emits = defineEmits(["click"]);
const bindClass = computed(() => {
	const classList = [];
	if (isString(props.theme) && themeTypeInterface.includes(props.theme)) {
		classList.push(`theme theme-is__${props.theme}`);
	} else {
		classList.push(`theme theme-is__default`);
	}

	if (isString(props.size) && sizeInterface.includes(props.size)) {
		classList.push(`size--${props.size}`);
	} else {
		classList.push(`size--medium`);
	}
	if (isString(props.textSize) && sizeInterface.includes(props.textSize)) {
		classList.push(`text-size--${props.textSize}`);
	} else {
		classList.push(`text-size--medium`);
	}
	if (props.plain) {
		classList.push("is-plain");
	}
	if (props.border) {
		classList.push("is-border");
	}
	if (props.link) {
		classList.push("is-link");
	}
	if (props.disabled) {
		classList.push("is-disabled");
	}
	if (props.decoration) {
		if (isString(props.decoration)) {
			classList.push(`text-decoration--${props.decoration}`);
		} else {
			classList.push("text-decoration");
		}
	}
	if (props.strong) {
		classList.push("text-strong");
	}
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
	display: inline-flex;
	width: fit-content;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	user-select: none;
	white-space: nowrap;
	// letter-spacing: 1px;
	word-spacing: 2px;
	transition: background-color 0.3s, border-color 0.3s;

	font-size: var(--ml-button-font-size, inherit);
	line-height: calc(var(--ml-button-font-size, 1em) * 1.3);
	height: var(--ml-button-height, 32px);
	padding: var(--ml-button-pd-size, 4px 12px);
	color: var(--ml-button-text-color, initial);
	background-color: var(--ml-button-bg-color, transparent);
	border: 1px solid var(--ml-button-border-color, #000);

	&.size--mini {
		--ml-button-height: 20px;
		--ml-button-pd-size: 2px 4px;
	}
	&.text-size--mini {
		--ml-button-font-size: 0.75em;
	}
	&.size--small {
		--ml-button-height: 26px;
		--ml-button-pd-size: 3px 6px;
	}
	&.text-size--small {
		--ml-button-font-size: 0.825em;
	}
	&.size--medium {
		--ml-button-height: 32px;
		--ml-button-pd-size: 4px 12px;
	}
	&.text-size--medium {
		--ml-button-font-size: 1em;
	}
	&.size--large {
		--ml-button-height: 40px;
		--ml-button-pd-size: 8px 16px;
	}
	&.text-size--large {
		--ml-button-font-size: 1.25em;
	}

	&:not(.is-disabled):hover {
		background-color: var(--ml-button-hover-bg-color);
		border-color: var(--ml-button-hover-border-color);
		color: var(--ml-button-hover-text-color);
	}

	&:not(:last-child) {
		margin-right: 10px;
	}
	&.is-link {
		border: 0;
		border-radius: 0;
		height: initial;
		line-height: initial;
		padding: 2px 4px;
		display: inline-block;
		&:hover {
			text-decoration: underline;
		}
	}
}

.text-strong {
	font-weight: bold;
}
.text-decoration {
	text-decoration: underline;
}

.theme {
	&.theme-is__default {
		--ml-button-text-color: initial;
		--ml-button-hover-text-color: initial;

		--ml-button-hover-border-color: var(--ml-border-color-hover, #e0e0e0);
		--ml-button-border-color: var(--ml-border-color, #e0e0e0);

		--ml-button-hover-bg-color: var(--ml-bg-color-hover);
		--ml-button-bg-color: var(--ml-bg-color);
	}
	&.theme-is__primary {
		--ml-button-text-color: var(--ml-color-primary-9);
		--ml-button-border-color: var(--ml-color-primary);
		--ml-button-bg-color: var(--ml-color-primary);

		--ml-button-hover-text-color: var(--ml-color-primary-9);
		--ml-button-hover-border-color: var(--ml-color-primary-3);
		--ml-button-hover-bg-color: var(--ml-color-primary-3);
		&.is-plain {
			--ml-button-text-color: var(--ml-color-primary);
			--ml-button-border-color: var(--ml-color-primary);
			--ml-button-bg-color: var(--ml-color-primary-9);
			--ml-button-hover-text-color: var(--ml-color-primary-9);
			--ml-button-hover-border-color: var(--ml-color-primary);
			--ml-button-hover-bg-color: var(--ml-color-primary);
		}
		&.is-border {
			--ml-button-hover-text-color: var(--ml-color-primary-5);
			--ml-button-hover-border-color: var(--ml-color-primary-5);
		}
		&.is-link {
			--ml-button-text-color: var(--ml-color-primary);
			&:not(.is-plain) {
				--ml-button-hover-text-color: var(--ml-color-primary-5);
			}
		}
	}
	&.theme-is__info {
		--ml-button-text-color: var(--ml-color-info-9);
		--ml-button-border-color: var(--ml-color-info);
		--ml-button-bg-color: var(--ml-color-info);

		--ml-button-hover-text-color: var(--ml-color-info-9);
		--ml-button-hover-border-color: var(--ml-color-info-3);
		--ml-button-hover-bg-color: var(--ml-color-info-3);
		&.is-plain {
			--ml-button-text-color: var(--ml-color-info);
			--ml-button-border-color: var(--ml-color-info);
			--ml-button-bg-color: var(--ml-color-info-9);

			--ml-button-hover-text-color: var(--ml-color-info-9);
			--ml-button-hover-border-color: var(--ml-color-info);
			--ml-button-hover-bg-color: var(--ml-color-info);
		}
		&.is-border {
			--ml-button-hover-text-color: var(--ml-color-info-5);
			--ml-button-hover-border-color: var(--ml-color-info-5);
		}
		&.is-link {
			--ml-button-text-color: var(--ml-color-info);
			&:not(.is-plain) {
				--ml-button-hover-text-color: var(--ml-color-info-5);
			}
		}
	}
	&.theme-is__success {
		--ml-button-text-color: var(--ml-color-success-9);
		--ml-button-border-color: var(--ml-color-success);
		--ml-button-bg-color: var(--ml-color-success);

		--ml-button-hover-text-color: var(--ml-color-success-9);
		--ml-button-hover-border-color: var(--ml-color-success-3);
		--ml-button-hover-bg-color: var(--ml-color-success-3);
		&.is-plain {
			--ml-button-text-color: var(--ml-color-success);
			--ml-button-border-color: var(--ml-color-success);
			--ml-button-bg-color: var(--ml-color-success-9);

			--ml-button-hover-text-color: var(--ml-color-success-9);
			--ml-button-hover-border-color: var(--ml-color-success);
			--ml-button-hover-bg-color: var(--ml-color-success);
		}
		&.is-border {
			--ml-button-hover-text-color: var(--ml-color-success-5);
			--ml-button-hover-border-color: var(--ml-color-success-5);
		}
		&.is-link {
			--ml-button-text-color: var(--ml-color-success);
			&:not(.is-plain) {
				--ml-button-hover-text-color: var(--ml-color-success-5);
			}
		}
	}
	&.theme-is__warning {
		--ml-button-text-color: var(--ml-color-warning-9);
		--ml-button-border-color: var(--ml-color-warning);
		--ml-button-bg-color: var(--ml-color-warning);

		--ml-button-hover-text-color: var(--ml-color-warning-9);
		--ml-button-hover-border-color: var(--ml-color-warning-3);
		--ml-button-hover-bg-color: var(--ml-color-warning-3);
		&.is-plain {
			--ml-button-text-color: var(--ml-color-warning);
			--ml-button-border-color: var(--ml-color-warning);
			--ml-button-bg-color: var(--ml-color-warning-9);

			--ml-button-hover-text-color: var(--ml-color-warning-9);
			--ml-button-hover-border-color: var(--ml-color-warning);
			--ml-button-hover-bg-color: var(--ml-color-warning);
		}
		&.is-border {
			--ml-button-hover-text-color: var(--ml-color-warning-5);
			--ml-button-hover-border-color: var(--ml-color-warning-5);
		}
		&.is-link {
			--ml-button-text-color: var(--ml-color-warning);
			&:not(.is-plain) {
				--ml-button-hover-text-color: var(--ml-color-warning-5);
			}
		}
	}
	&.theme-is__error {
		--ml-button-text-color: var(--ml-color-error-9);
		--ml-button-border-color: var(--ml-color-error);
		--ml-button-bg-color: var(--ml-color-error);

		--ml-button-hover-text-color: var(--ml-color-error-9);
		--ml-button-hover-border-color: var(--ml-color-error-3);
		--ml-button-hover-bg-color: var(--ml-color-error-3);

		&.is-plain {
			--ml-button-text-color: var(--ml-color-error);
			--ml-button-border-color: var(--ml-color-error);
			--ml-button-bg-color: var(--ml-color-error-9);

			--ml-button-hover-text-color: var(--ml-color-error-9);
			--ml-button-hover-border-color: var(--ml-color-error);
			--ml-button-hover-bg-color: var(--ml-color-error);
		}
		&.is-border {
			--ml-button-hover-text-color: var(--ml-color-error-5);
			--ml-button-hover-border-color: var(--ml-color-error-5);
		}
		&.is-link {
			--ml-button-text-color: var(--ml-color-error);
			&:not(.is-plain) {
				--ml-button-hover-text-color: var(--ml-color-error-5);
			}
		}
	}
	&.is-disabled {
		opacity: 0.6;
	}

	&.is-link,
	&.is-border,
	&.is-border.is-plain {
		--ml-button-bg-color: transparent;
		--ml-button-hover-bg-color: transparent;
	}
	&.is-link {
		--ml-button-border-color: transparent;
		--ml-button-hover-border-color: transparent;
	}
}
</style>
