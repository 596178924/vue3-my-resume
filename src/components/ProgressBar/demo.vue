<template>
	<div class="scroll" id="scroll" ref="ProgressRef">
		<div class="mask" id="mask" ref="InnerRef"></div>
		<div class="bar" id="bar" ref="DragRef" @mousedown="dargDownEvent"></div>
		<!-- <div class="bar" id="bar" ref="DragRef"></div> -->
	</div>
	<!-- <p></p> -->
</template>

<script setup>
import { onMounted, shallowRef, reactive } from "vue-demi";

const ProgressRef = shallowRef();
const InnerRef = shallowRef();
const DragRef = shallowRef();
const dragDB = reactive({
	grabbing: false,
	startX: 0,
	endX: 0,
});

onMounted(() => {
	// init();
	// demoinit();
});

function init() {
	// const scroll = ProgressRef.value;
	// const mask = InnerRef.value;
	// const bar = DragRef.value;
	// const barleft = 0;
	// bar.onmousedown = function (event) {
	// 	console.log("onmousedown this", event, this);
	// 	const event = event || window.event;
	// 	const leftVal = event.clientX - this.offsetLeft;
	// };
	// // 拖动一定写到 down 里面才可以
	// document.onmousemove = function (event) {
	// 	const event = event || window.event;
	// 	barleft = event.clientX - leftVal;
	// 	if (barleft < 0) barleft = 0;
	// 	else if (barleft > scroll.offsetWidth - bar.offsetWidth) barleft = scroll.offsetWidth - bar.offsetWidth;
	// 	mask.style.width = barleft + "px";
	// 	DragRef.value.style.left = barleft + "px";
	// 	//防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
	// 	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	// };
	// document.onmouseup = function () {
	// 	document.onmousemove = null; //弹起鼠标不做任何操作
	// };
}
function dargDownEvent(e) {
	const event = e || window.event;
	dragDB.startX = event.clientX - DragRef.value.offsetLeft;
	document.addEventListener("mousemove", eventMove, false);
	document.addEventListener("mouseup", eventEnd, false);
	// document.onmousemove = eventMove;
	// document.onmouseup = eventEnd;
}
function eventMove(e) {
	console.log("move", e);
	try {
		const event = e || window.event;
		const eventProgress = ProgressRef.value;
		// console.log("onmousemove this", event, that);
		dragDB.endX = event.clientX - dragDB.startX;
		if (dragDB.endX < 0) {
			dragDB.endX = 0;
		} else if (dragDB.endX > eventProgress.offsetWidth - DragRef.value.offsetWidth) {
			dragDB.endX = eventProgress.offsetWidth - bar.offsetWidth;
		}
		InnerRef.value.style.width = dragDB.endX + "px";
		DragRef.value.style.left = dragDB.endX + "px";
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	} catch (error) {
		console.error(error);
	}
}
function eventEnd() {
	document.removeEventListener("mousemove", eventMove, false);
	document.removeEventListener("mouseup", eventEnd, false);
	// document.onmousemove = null;
	// document.onmouseup = null;
}

// function demoinit() {
// 	var scroll = document.getElementById("scroll");
// 	var bar = document.getElementById("bar");
// 	var mask = document.getElementById("mask");
// 	var ptxt = document.getElementsByTagName("p")[0];
// 	var barleft = 0;
// 	bar.onmousedown = function (event) {
// 		var event = event || window.event;
// 		console.log("event", event, "this", this);
// 		// console.log("event.clientX", event.clientX, "this.offsetLeft", this.offsetLeft);
// 		var leftVal = event.clientX - this.offsetLeft;
// 		console.log("onmousemove leftVal", leftVal);

// 		var that = this;
// 		console.log("onmousedown this", event, this);
// 		// 拖动一定写到 down 里面才可以
// 		document.onmousemove = function (event) {
// 			var event = event || window.event;
// 			// console.log("onmousemove this", event, that);
// 			barleft = event.clientX - leftVal;
// 			if (barleft < 0) barleft = 0;
// 			else if (barleft > scroll.offsetWidth - bar.offsetWidth) barleft = scroll.offsetWidth - bar.offsetWidth;
// 			mask.style.width = barleft + "px";
// 			that.style.left = barleft + "px";
// 			ptxt.innerHTML = "已经走了" + parseInt((barleft / (scroll.offsetWidth - bar.offsetWidth)) * 100) + "%";

// 			//防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
// 			window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
// 		};
// 	};
// 	document.onmouseup = function () {
// 		document.onmousemove = null; //弹起鼠标不做任何操作
// 	};
// }
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
