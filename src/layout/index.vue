<template>
	<!-- <ConfigVariables> </ConfigVariables> -->
	<!-- <ml-scrollbar class="layout-scrollbar"> -->
		<div id="layout">
			<DarkChangeBtn></DarkChangeBtn>
			<Main></Main>
		</div>
	<!-- </ml-scrollbar> -->
</template>

<script setup>
// import ConfigVariables from "@gc/ConfigVariables";
import DarkChangeBtn from "@/components/DarkChangeBtn";
import Main from "./Main";
</script>

<style lang="scss" scoped>
.layout-scrollbar {
	height: 100vh;
}
</style>
