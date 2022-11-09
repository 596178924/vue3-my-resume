<template>
	<meter></meter>
</template>

<script setup>
// import { defineProps } from "vue-demi";
// const props = defineProps({});
</script>

<style lang="scss" scoped>
meter {
	--size: 60px;
	--gradient: linear-gradient(
		to right,
		red calc(var(--size) - 1px),
		transparent 0 calc(var(--size) + 1px),
		orange 0 calc(var(--size) * 2 - 1px),
		transparent 0 calc(var(--size) * 2 + 1px),
		green 0
	);

	width: calc(3 * var(--size));
	border: 0; /* Safari */
	position: relative;
	&::after {
		content: "弱 中 强 aaaaaaaaaaaaaaaaaaaaaa";
		position: absolute;
		font-size: 14px;
		line-height: 20px;
		height: 20px;
		overflow: hidden;
		left: calc(var(--size) / 2 - 0.5em);
		right: calc(var(--size) / 2 - 0.5em);
		text-align: justify;
		-webkit-text-fill-color: transparent;
		background: var(--gradient) calc(0.5em - var(--size) / 2) / calc(3 * var(--size));
		background-clip: text;
	}
	&::-webkit-meter-bar {
		height: 12px;
		width: calc(3 * var(--size));
		border: 0;
		background: #eee;
		-webkit-mask: var(--gradient);
		mask: var(--gradient);
	}
}
// _::-moz-meter-bar,
// meter {
// 	height: 12px;
// 	background: #eee;
// }
// ::-webkit-meter-even-less-good-value {
// 	background: red;
// }
// ::-webkit-meter-suboptimum-value {
// 	background: linear-gradient(to right, red var(--size), orange 0);
// }
// ::-webkit-meter-optimum-value {
// 	background: linear-gradient(to right, red var(--size), orange 0 calc(2 * var(--size)), green 0);
// }
</style>
