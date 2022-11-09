<template>
	<div class="m-image" ref="targetRef">
		<!-- lazy -->
		<!-- loading -->
		<span v-show="imageStyle == 1">loading...</span>
		<!-- load -->
		<img
			class="m-image__inner"
			v-if="imageStyle > 0"
			v-show="imageStyle == 2"
			:src="src"
			alt=""
			loading="lazy"
			@load="onLoad"
			@error="onError"
		/>
		<!-- error -->
		<span class="m-image__inner-error" v-if="imageStyle == 3">
			<slot name="error">
				load error !
			</slot>
		</span>
	</div>
</template>

<script setup>
import defaultImg from '@/assets/imageLoadError.png'

import { defineProps, ref, shallowRef } from "vue-demi";
import { useIntersectionObserver } from "./lazy";
// const props =
defineProps({
	src: {
		type: String,
	},
	lazy: {
		type: Boolean,
		default: false,
	},
	width: {
		type: String,
		default: "",
	},
	height: {
		type: String,
		default: "",
	},
});

const targetRef = shallowRef();
useIntersectionObserver(targetRef.value, () => {
	imageStyle.value = 1;
});

/**
 * 0 lazy
 * 1 loading
 * 2 load
 * 3 error
 */
const imageStyle = ref(0);

function onLoad(el) {
	console.log("图片加载完成", el);
	imageStyle.value = 2;
}
function onError() {
	imageStyle.value = 3;
}
</script>

<style lang="scss" scoped>
.m-image {
	background-color: var(--ml-fill-color-dark, #f2f2f2);
	display: inline-block;
	&__inner-error {
		color: var(--ml-text-color-disabled, #d3d3d3);
	}
}
</style>
