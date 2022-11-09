<template>
	<teleport to="body">
		<transition name="fade">
			<div
				class="m-overlayer"
				:style="maskStyle"
				:class="{
					'curcor-pointer': maskClosable,
				}"
				v-show="modelValue"
				@click.stop="handlerModelClick"
			>
				<div class="m-overlayer__wrap">
					<slot></slot>
				</div>
			</div>
		</transition>
	</teleport>
</template>

<script setup>
import { defineProps, defineEmits } from "vue-demi";
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
	modelValue: {
		type: Boolean,
	},
	maskClosable: {
		type: Boolean,
		default: true,
	},
	maskStyle: {
		type: [Object, String, Array],
		default: () => {},
	},
});

function handlerModelClick() {
	if (props.maskClosable == true) {
		emits("update:modelValue", false);
	}
}
</script>

<style lang="scss" scoped>
.m-overlayer {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	z-index: var(--ml-index-top, 1000);
	background-color: var(--ml-overlay-color-lighter);
}
.m-overlayer__wrap {
	width: 100%;
	max-height: 100vh;
	overflow: auto;
}
.curcor-pointer {
	cursor: pointer;
}
</style>
