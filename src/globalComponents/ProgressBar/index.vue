<template>
	<p>
		{{dragDB}}
	</p>
	<div class="ml-progress" ref="ProgressRef">
		<div class="ml-progress__inner" :style="bindInnerStyles">
			<div class="ml-progress__drag" ref="DragRef" :class="bindDragClass" @mousedown.stop="eventDragStart"></div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, defineEmits, shallowRef, computed, toRefs, reactive, watch } from "vue-demi";
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
	modelValue: {
		type: Number,
		default: 0,
	},
	max: {
		type: Number,
		default: 0,
	},
});
const { modelValue, max } = toRefs(props);

const dragDB = reactive({
	grabbing: false,
	startX: 0,
	endX: 0,
});
watch(()=> modelValue.value, (n)=> {
	const pw = ProgressRef.value ? ProgressRef.value.clientWidth : 0;
	const p = Math.floor((n / max.value) * 100);
	dragDB.endX =  Math.floor((p * pw) / 100)
})

const ProgressRef = shallowRef();
const DragRef = shallowRef();
const bindDragClass = computed(() => {
	return {
		"is-grabbing": dragDB.grabbing == true,
	};
});
const percentage = computed(() => {
	const pw = ProgressRef.value ? ProgressRef.value.clientWidth : 0;
	const p = Math.floor((dragDB.endX / pw) * 100);
	return p;
});
const bindInnerStyles = computed(() => {
	return {
		"--ml-inner-width": `${percentage.value}%`,
	};
});

function eventDragStart(event) {
	// console.log("开始拖拽");
	dragDB.grabbing = true;
	dragDB.startX = event.clientX - DragRef.value.offsetLeft;
	document.addEventListener("mousemove", eventDragMove, false);
	document.addEventListener("mouseup", eventDragEnd, false);
}
function eventDragMove(event) {
	// console.log(event);
	try {
		const x = event.clientX - dragDB.startX;
		moveEndX(x);
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	} catch (error) {
		console.error(error);
	}
}
function eventDragEnd(e) {
	dragDB.grabbing = false;
	document.removeEventListener("mousemove", eventDragMove, false);
	document.removeEventListener("mouseup", eventDragEnd, false);
	const v = Math.floor((max.value * percentage.value) / 100);
	emits("update:modelValue", v);
	// console.log("拖拽结束");
}
function moveEndX(x) {
	const _domProgress = ProgressRef.value;
	if (x < 0) {
		x = 0;
	} else if (x > _domProgress.offsetWidth) {
		x = _domProgress.offsetWidth;
	}
	dragDB.endX = x;
}
</script>

<style lang="scss" scoped>
.ml-progress {
	--ml-progress-size: 12px;
	$size: var(--ml-progress-size, 16px);
	height: $size;
	width: 100%;
	background: #f2f2f2;
	&__inner {
		position: relative;
		height: 100%;
		width: var(--ml-inner-width, 0);
		background: var(--ml-color-primary-7);
		transition: width .1s;
	}
	&__drag {
		cursor: pointer;
		position: absolute;
		top: 0;
		left: 100%;
		transform: translateX(-50%);
		width: $size;
		height: $size;
		border-radius: 50%;
		background: var(--ml-color-primary);
	}
}
.is-grabbing {
	cursor: grabbing;
}
</style>
