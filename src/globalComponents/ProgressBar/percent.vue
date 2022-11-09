<template>
	<div class="percent">
		<svg>
			<circle cx="70" cy="70" r="70"></circle>
			<circle
				cx="70"
				cy="70"
				r="70"
				:style="{
					'--value': pv,
				}"
			></circle>
		</svg>
		<div class="number">{{ pv }}%</div>
	</div>
</template>

<script setup>
import { defineProps, nextTick, ref, watch } from "vue-demi";
const props = defineProps({
	modelValue: { type: Number },
});
// const { modelValue } = toRefs(props);
watch(
	() => props.modelValue,
	(n) => {
		console.log("开炮", n);
		nextTick(() => run(n));
	},
	{
		immediate: true,
	}
);
const pv = ref(0);
function run(v = 0) {
	if (typeof v !== "number") return;
	if (v == 0) {
		pv.value = 0;
		return;
	}
	console.log("正式开跑");
	// pv.value = 0;
	const fn = () => {
		if (pv.value < v) {
			pv.value++;
			requestAnimationFrame(() => {
				fn();
			});
		}
	};
	fn();
}
</script>

<style lang="scss" scoped>
.percent {
	$c: var(--ml-color-primary);
	$b: var(--ml-color, #000);
	width: 150px;
	height: 150px;
	border-radius: 50%;
	position: relative;
	.number {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 24px;
	}
	svg circle {
		width: 100%;
		height: 100%;
		fill: none;
		stroke-width: 10;
		stroke: var(--ml-border-color);
		stroke-dasharray: 440px;

		transform: translate(5px, 5px);
		&:last-child {
			stroke: $c;
			stroke-dashoffset: calc(440px - (440px * var(--value, 0)) / 100);
			stroke-linecap: round;
		}
	}
}
</style>
