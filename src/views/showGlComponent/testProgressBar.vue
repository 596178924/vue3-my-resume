<template>
	<div>
		<ml-card size="large">
			<div class="box">测试用进度条</div>
			<p>pv:{{ pv }}</p>
			<!-- <MlProgress v-model="pv" :max="maxPv"></MlProgress> -->
			<!-- <ProgressBar :max="maxPv" v-model="pv"></ProgressBar> -->
			<!-- <div class="box"> -->
				<ProgressBar :max="maxPv" v-model="pv"></ProgressBar>
			<!-- </div> -->
		</ml-card>
	</div>
</template>

<script setup>
import { ref } from "vue-demi";
// import MlProgress from '@gc/AudioPlayer/Progress'
// import ProgressBar from '@/components/ProgressBar/indexCopy.vue'
import ProgressBar from "@gc/ProgressBar";
// import ProgressBar from "@/components/ProgressBar/demo";

const pv = ref(16);
const maxPv = ref(300);
</script>

<style lang="scss" scoped>
.box {
	width: 300px;
}
</style>
