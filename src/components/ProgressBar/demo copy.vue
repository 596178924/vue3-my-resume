<template>
	<div class="scroll" id="scroll">
		<div class="bar" id="bar"></div>
		<div class="mask" id="mask"></div>
	</div>
	<p></p>
</template>

<script setup>
import { onMounted } from "vue-demi";

onMounted(() => {
	var scroll = document.getElementById("scroll");
	var bar = document.getElementById("bar");
	var mask = document.getElementById("mask");
	var ptxt = document.getElementsByTagName("p")[0];
	var barleft = 0;
	bar.onmousedown = function (event) {
		var event = event || window.event;
		var leftVal = event.clientX - this.offsetLeft;
		var that = this;
		// 拖动一定写到 down 里面才可以
		document.onmousemove = function (event) {
			var event = event || window.event;
			barleft = event.clientX - leftVal;
			if (barleft < 0) barleft = 0;
			else if (barleft > scroll.offsetWidth - bar.offsetWidth) barleft = scroll.offsetWidth - bar.offsetWidth;
			mask.style.width = barleft + "px";
			that.style.left = barleft + "px";
			ptxt.innerHTML = "已经走了" + parseInt((barleft / (scroll.offsetWidth - bar.offsetWidth)) * 100) + "%";

			//防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
			window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
		};
	};
	document.onmouseup = function () {
		document.onmousemove = null; //弹起鼠标不做任何操作
	};
});
</script>

<style lang="scss" scoped>
.scroll {
	width: 300px;
	height: 10px;
	background: #ccc;
	position: relative;
}

.bar {
	width: 10px;
	height: 10px;
	background: #369;
	position: absolute;
	top: 0;
	left: 0;
	cursor: pointer;
}

.mask {
	position: absolute;
	left: 0;
	top: 0;
	background: rgb(174, 196, 218);
	width: 0;
	height: 10px;
}
</style>
