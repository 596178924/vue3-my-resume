<template>
	<button @click="TimeoutEffect.start">开始时间</button>
	<button @click="TimeoutEffect.stop">关闭时间</button>
	<p>isActive: {{ TimeoutEffect.isActive }}</p>
	<transition name="fade">
		<p v-show="show">过度文本</p>
	</transition>
</template>

<script setup>
import { ref } from "vue-demi";
import { useTimeoutEffect } from "@gc/_hooks/useSideEffect";

const show = ref(false);
function updateShow() {
	show.value = !show.value;
}
const TimeoutEffect = useTimeoutEffect(
	() => {
		console.log("时间");
		updateShow();
	},
	1000,
	{
		immediate: false,
		loop: true,
	}
);
</script>
