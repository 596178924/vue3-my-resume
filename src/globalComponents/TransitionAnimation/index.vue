<template>
	<transition
		:name="name"
		@before-enter="onBeforeEnter"
		@after-enter="onAfterEnter"
		@before-live="onBeforeLeave"
		@after-leave="onAfterLeave"
	>
		<slot></slot>
	</transition>
</template>

<script>
export default {
	name: "m-transition-animation",
};
</script>
<script setup>
import { defineProps } from "vue-demi";
const emits = defineEmits(["open", "opened", "closed", "close"]);
const props = defineProps({
	name: {
		type: String,
		default: "fade",
	},
});
function onBeforeEnter() {
	emits("open");
}
function onAfterEnter() {
	emits("opened");
}
function onBeforeLeave() {
	emits("close");
}
function onAfterLeave() {
	emits("closed");
}
</script>

<style lang="scss" scoped></style>
