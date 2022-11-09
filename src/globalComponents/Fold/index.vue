<template>
	<div class="ml-fold">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "ml-fold",
};
</script>
<script setup>
import { computed, defineProps, defineEmits, provide, toRefs } from "vue-demi";
import provideKeys from "./provides";
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
	modelValue: {
		type: String,
		required: true,
	},
	accordion: {
		type: Boolean,
	},
});
const { modelValue } = toRefs(props);
const openItemsName = computed({
	set: (v) => emits("update:modelValue", v),
	get: () => modelValue.value,
});

provide(provideKeys.fold.onChange, changeModelValue);
provide(provideKeys.fold.activeNames, modelValue);
function changeModelValue(v) {
	openItemsName.value = v;
}
</script>

<style lang="scss" scoped>
.ml-fold {
	box-shadow: var(--ml-box-shadow-card, (0 0 6px rgba(0, 0, 0, 0.3)));
	overflow: hidden;
	border-radius: 4px;
}
html[color-scheme="dark"] .ml-fold {
	box-shadow: 0 0 12px rgba(189, 189, 189, 0.2);
}
</style>
