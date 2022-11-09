<template>
	<div class="m-scrollbar-hover">
		<slot></slot>
	</div>
</template>

<script setup>
// import { defineProps, } from 'vue-demi';
// const props = defineProps({
// })
</script>

<style lang="scss" scoped>
@import "@/styles/theme/mixin.scss";
.m-scrollbar-hover,
.m-scrollbar {
	@include scrollbar;
	max-height: 100%;
	overflow: hidden;
	overflow-y: auto;
}
.m-scrollbar-hover {
	&::-webkit-scrollbar-thumb {
		box-shadow: inset 0 0 4px rgba(216, 216, 216, 0.8);
		transition: background-color 0.3s;
	}
	&:hover {
		--ml-scrollbar-bg-color: var(--ml-color-primary, initial);
	}
}
.m-scrollbar {
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	--ml-scrollbar-bg-color: var(--ml-color-primary, initial);
}
</style>
