<template>
	<div class="ml-fold-item" :class="[isShow ? 'is-open-item' : 'is-hidden-item']">
		<div class="ml-fold-item__header" @click="eventChange">
			<slot name="title">
				{{ title }}
			</slot>
		</div>
		<transition name="visibility">
			<div class="ml-fold-item__content" v-show="isShow">
				<div class="ml-fold-item__content-wapper">
					<slot></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: "ml-fold-item",
};
</script>
<script setup>
import { computed, defineProps, inject } from "vue-demi";
import provideKeys from "./provides";
const emits = defineEmits("update:name");
const props = defineProps({
	name: {
		type: String,
	},
	title: {
		type: String,
	},
	disabled: {
		type: Boolean,
	},
});

const onChange = inject(provideKeys.fold.onChange);
const modelValue = inject(provideKeys.fold.activeNames);
const isShow = computed(() => props.name == modelValue.value);
function eventChange() {
	onChange(props.name);
}
</script>

<style lang="scss" scoped>
$border: var(--ml-border);

.visibility-enter-active,
.visibility-leave-active {
	transition: max-height 0.3s linear, opacity 0.3s linear;
	overflow: hidden;
}
.visibility-enter-from,
.visibility-leave-to {
	opacity: 0;
	max-height: 0;
	overflow: hidden;
}
.visibility-leave-from,
.visibility-enter-to {
	max-height: 100vh;
	opacity: 1;
}

.ml-fold-item {
	&__header {
		padding: 20px;
		cursor: pointer;
		&:hover {
			background-color: var(--ml-fill-color-light);
		}
	}
	&__content-wapper {
		margin: 20px;
	}
	&:not(:last-child) {
		.ml-fold-item__header {
			border-bottom: $border;
		}
	}
}
.is-open-item {
	.ml-fold-item__header {
		border-bottom: $border;
	}
	&:not(:last-child) {
		.ml-fold-item__content {
			border-bottom: $border;
		}
	}
}
</style>
