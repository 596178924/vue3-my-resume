<template>
	<p>{{ totalPer }}</p>
	<div class="container" ref="outContainer">
		<div class="innerContainer" ref="innerContainer" :style="`width:${distance * 100}%`">
			<div class="block" ref="block" :style="`left:${distance * containerWidth - 10}px`"></div>
			<!-- <div class="tips" :style="`left:${distance * containerWidth - 68}px`">值：{{ totalPer }}/{{ total }}</div> -->
		</div>
	</div>
</template>
<script>
import { nextTick } from "vue-demi";
export default {
	props: {
		sliderType: {
			type: String,
			default: "",
		},
		initDistance: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: 0,
		},
		total: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			initVal: 0,
			distance: 0,
			initX: 0,
			containerWidth: 0,
			isFirst: true,
			totalPer: 0,
		};
	},
	watch: {
		initDistance(val) {
			//由于我们传递给父组件的值是经过max乘积得到的对应父组件的一个数值，所以要重新将数值转换回来
			this.distance = val / this.max;
		},
	},
	created() {
		console.log(this.total);
	},
	mounted() {
		//获取容器宽度
		nextTick(() => {
			this.init();
		});
	},
	computed: {},
	methods: {
		init() {
			this.containerWidth = this.$refs["outContainer"].offsetWidth;
			let block = this.$refs.block;
			//计算出百分比
			let percentage = this.containerWidth / this.max;
			//初始化的默认数值,distance是显示进度条的百分比，initVal是默认移动的距离px
			this.distance = (this.initDistance * percentage) / this.containerWidth;
			this.initVal = this.initDistance * percentage;
			block.onmousedown = (e) => {
				//记录首次点击的位置
				if (this.isFirst) {
					this.initX = e.clientX;
				}
				this.isFirst = false;
				document.onmousemove = (draw) => {
					if (draw.clientX - this.initX + this.initVal < 0) {
						this.distance = 0;
					} else {
						this.distance = (draw.clientX - this.initX + this.initVal) / this.containerWidth;
					}
					if (draw.clientX - this.initX + this.initVal >= this.containerWidth) {
						this.distance = 1;
					}
					if (this.sliderType == "sliderVal") {
						this.totalPer =
							Math.floor(this.total * this.distance) == 0 ? 0 : Math.floor(this.total * this.distance);
					} else {
						this.totalPer =
							(this.total * this.distance).toFixed(2) == 0 ? 0 : (this.total * this.distance).toFixed(2);
					}

					this.$emit(`update:${this.sliderType}`, this.distance * this.max);
				};
				document.onmouseup = () => {
					document.onmousedown = document.onmousemove = null;
				};
			};
		},
	},
};
</script>
<style lang="scss" scoped>
.container {
	width: 400px;
	height: 10px;
	background: #e4e7ed;
	border-radius: 5px;
	margin-top: 20px;
	margin-left: 10px;
	cursor: pointer;
	.innerContainer {
		position: relative;
		height: 100%;
		// width: 0px;
		border-radius: 5px;
		background: #409eff;
		.block {
			position: absolute;
			top: -2px;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			border: 2px solid #409eff;
			background: #ffffff;
			cursor: pointer;
		}
		// .tips {
		// 	position: absolute;
		// 	top: 17px;
		// 	color: #ffffff;
		// 	background: black;
		// 	padding: 0 10px;
		// 	min-width: 110px;
		// 	border-radius: 6px;
		// 	text-align: center;
		// 	font-size: 12px;
		// 	z-index: 1;
		// }
		// .tips:nth-child(1) {
		// 	position: absolute;
		// 	top: -50px;
		// }
		// .tips::after {
		// 	content: "";
		// 	position: absolute;
		// 	bottom: 100%;
		// 	left: 50%;
		// 	margin-left: -5px;
		// 	border-width: 5px;
		// 	border-style: solid;
		// 	border-color: transparent transparent black transparent;
		// }
	}
}
</style>
