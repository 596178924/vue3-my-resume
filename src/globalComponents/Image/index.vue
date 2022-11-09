<template>
	<div class="m-image">
		<img class="m-image__inner" :src="src" alt="error" loading="lazy" @click="handlerClick" @error="onError" />
	</div>
</template>

<script setup>
// import defaultImg from '@/assets/imageLoadError.png'
import { defineProps } from "vue-demi";
const props = defineProps({
	src: {
		type: String,
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

function handlerClick(el) {
	console.log(el);
	// console.dir();
	el.target.src = props.src
}
function onError(el) {
	console.log(el);
	el.target.src = require('@/assets/imageLoadError.png')
}
</script>

<style lang="scss" scoped>
.m-image {
	// width: 100%;
	// height: 100%;
	background-color: var(--ml-fill-color-dark, #f2f2f2);
	display: inline-block;
	// align-items: center;
	// justify-content: center;
	&__inner-error {
		color: var(--ml-text-color-disabled, #d3d3d3);
	}
}
</style>
