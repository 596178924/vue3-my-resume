<template>
	<div>
		<p>{{val}}</p>
		<Percent :modelValue="val"></Percent>
		<ml-button @click="run(50)"> 测试百分比动画 </ml-button>
		<ml-button @click="run(val +10)"> 测试百分比动画 </ml-button>
		<ml-button @click="run(0)"> 测试百分比动画 </ml-button>
	</div>
</template>

<script setup>
import { ref } from "vue-demi";
import Percent from '@/globalComponents/ProgressBar/percent'

const val = ref(80);
function run(v){
	val.value = v
}
</script>

<style lang="scss" scoped>
</style>
