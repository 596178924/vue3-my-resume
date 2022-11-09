<template>
	<ml-overlyer v-model="OverlyerHanderValue" :maskClosable="closable">
		<mTransitionAnimation
			:name="animation"
			@open="emits('open')"
			@opened="emits('opened')"
			@close="emits('close')"
			@closed="emits('closed')"
		>
			<div
				class="m-dialog-model is-media"
				v-show="modelValue"
				:class="bindModelClassName"
				:style="bindModelStyle"
				@click.stop
			>
				<div class="m-dialog-model__header">
					<div class="m-dialog-model__header-content" :class="bindHeaderContentClassName">
						<slot name="title">{{ props.title }}</slot>
					</div>
					<button class="m-dialog-model__header-close-btn" @click="closeModel">关闭</button>
				</div>
				<div class="m-dialog-model__body m-scrollbar">
					<slot></slot>
				</div>
				<div class="m-dialog-model__footer" v-if="slots.footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</mTransitionAnimation>
	</ml-overlyer>
</template>

<script setup>
import mOverlyer from "@gc/Overlyer";
import mTransitionAnimation from "@gc/TransitionAnimation";
import { defineProps, defineEmits, computed, useSlots } from "vue-demi";
import { isString } from "@gc/_validator";
const slots = useSlots();
const emits = defineEmits(["update:modelValue", "open", "opened", "closed", "close"]);
const props = defineProps({
	modelValue: {
		type: Boolean,
	},
	closable: {
		type: Boolean,
		default: false,
	},
	maskStyle: {
		type: [Object, String, Array],
		default: () => {},
	},
	animation: {
		type: String,
		default: "fade-up",
	},
	title: {
		type: String,
		default: "",
	},
	showClose: {
		type: Boolean,
		default: true,
	},
	top: {
		type: String,
		default: "",
	},
	center: {
		type: Boolean,
		default: false,
	},
	width: {
		type: String,
		default: "",
	},
	fullscreen: {
		type: Boolean,
		default: false,
	},
	spillage: {
		//是否允许高度超过屏幕
		type: Boolean,
		default: true,
	},
});
const bindModelStyle = computed(() => {
	const styles = [];
	if (props.fullscreen) {
		styles.push(`
			--ml-dialog-width:100%;
			--ml-dialog-height: 100vh;
			--ml-dialog-top: 0;
			--ml-border-radius-base: 0;
		`);
	} else {
		const _modelWidth = props.width;
		if (isString(_modelWidth) && _modelWidth.trim() !== "") {
			styles.push(`--ml-dialog-width:${_modelWidth};`);
		}
		const _modelTop = props.top;
		if (isString(_modelTop) && _modelTop.trim() !== "") {
			styles.push(`--ml-dialog-top:${_modelTop};`);
		}
	}
	return styles;
});
const bindModelClassName = computed(() => {
	const classList = [];
	if (props.fullscreen) {
		classList.push(`
			is-fullscreen
		`);
	}
	if (props.spillage != true) {
		classList.push(`
			not-spillage
		`);
	}
	return classList;
});
const bindHeaderContentClassName = computed(() => {
	const classList = [];
	if (props.center) {
		classList.push("text-center");
	}
	return classList;
});
const OverlyerHanderValue = computed({
	get: () => props.modelValue,
	set: (v) => emits("update:modelValue", v),
});
function closeModel() {
	emits("update:modelValue", false);
}

// function onBeforeEnter() {
// 	emits("open");
// }
// function onAfterEnter() {
// 	emits("opened");
// }
// function onBeforeLeave() {
// 	emits("close");
// }
// function onAfterLeave() {
// 	emits("closed");
// }
</script>

<style lang="scss" scoped>
.m-dialog-model {
	width: var(--ml-dialog-width, 50%);
	height: var(--ml-dialog-height, auto);
	margin: var(--ml-dialog-top, 15vh) auto var(--ml-dialog-bottom, 5vh);
	z-index: var(--ml-index-popper, 2000);
	background-color: var(--ml-bg-color-overlay);
	border-radius: var(--ml-border-radius-base, 4px);
	cursor: default;
	&:not(.is-fullscreen).is-media {
		@media screen and (max-width: 768px) {
			width: var(--ml-dialog-width-xs, 90%);
		}
	}
	&.not-spillage {
		--ml-dialog-top: 16px;
		--ml-dialog-bottom: 10px;
		--ml-dialog-body-height: calc(100vh - ((var(--ml-dialog-padding, 20px) + 3em) * 3));
		.m-dialog-model__body {
			max-height: var(--ml-dialog-body-height, 100vh);
			overflow-x: hidden;
			overflow-y: auto;
		}
	}
	&__header {
		position: relative;
		// padding: var(--ml-dialog-padding, 20px) ;
		&-close-btn {
			position: absolute;
			right: 0;
			top: 0;
			padding: 20px;
			border-radius: var(--ml-border-radius-base, 4px);
			font-size: 0.75em;
			transition: background-color 0.3s, border-radius 0.3s;
			&:hover {
				background-color: var(--ml-border-color-darker, #f2f2f2);
				border-radius: var(--ml-border-radius-round, 20px) var(--ml-border-radius-base, 4px)
					var(--ml-border-radius-round, 20px) var(--ml-border-radius-round, 20px);
			}
		}
	}
	&__body {
		max-height: var(--ml-dialog-body-height, initial);
	}
	&__body,
	&__header {
		padding: var(--ml-dialog-padding, 20px);
	}
	&__footer {
		padding: 0 var(--ml-dialog-padding, 20px) var(--ml-dialog-padding, 20px);
	}
}
.text-center {
	text-align: center;
}
</style>
