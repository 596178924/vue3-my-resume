<template>
	<div class="view">
		<Fold v-model="activeId">
			<FoldItem name="第一个" title="哈哈哈">
				<p>内容</p>
				<p>内容</p>
				<p>内容</p>
				<p>内容</p>
				<p>内容</p>
				<p>内容</p>
			</FoldItem>
			<FoldItem name="第二个" title="嘻嘻嘻">
				内容
			</FoldItem>
			<FoldItem name="第三个" title="黑黑黑">
				内容
			</FoldItem>
			<FoldItem name="第四个" title="啦啦啦">
				内容
			</FoldItem>
		</Fold>
		<div class="anima"></div>
	</div>
</template>

<script setup>
import { ref, readonly } from "vue-demi";
import Fold from "@gc/Fold/index"
import FoldItem from "@gc/Fold/item"
const activeId = ref('第一个')
</script>

<style lang="scss" scoped>
.view {
	font-size: 14px;
}
.ml-fold{
	margin: 10px;
}
</style>
