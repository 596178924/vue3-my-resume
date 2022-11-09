<template>
	<ml-button @click="toggleDark()">Is Dark:{{ isDark }}</ml-button>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark({
	selector: "html",
	attribute: "color-scheme",
	valueDark: "dark",
	valueLight: "light",
});
const toggleDark = useToggle(isDark);
</script>

<style lang="scss" scoped></style>
