<template>
	<div class="n-space" :style="bindStyle">
		<slot></slot>
	</div>
</template>

<script setup>
import { computed, defineProps } from "vue-demi";
import { isString, isNumber, isArray } from "@gc/_validator.js";
import { sizeInterface, justifyContentInterface, alignItemsInterface } from "@gc/_interfaceTypes.js";

const props = defineProps({
	inline: {
		type: Boolean,
		default: false,
	},
	wrap: {
		type: Boolean,
		default: true,
	},
	reverse: {
		type: Boolean,
		default: false,
	},
	vertical: {
		type: Boolean,
		default: false,
	},
	center: {
		type: Boolean,
		default: false,
	},
	align: {
		type: String,
		default: "flex-start",
		validator: (v) => alignItemsInterface.includes(v),
	},
	justify: {
		type: String,
		default: "flex-start",
		validator: (v) => justifyContentInterface.includes(v),
	},
	size: {
		type: [String, Number, Array],
		default: "medium",
		validator: (v) => {
			if (isArray(v)) {
				const vArr = [...v];
				if (vArr.length > 4) return false;
				return vArr.find((_vitem) => !isNumber(_vitem)) ? false : true;
			}
			if (isNumber(v)) {
				return true;
			}
			if (isString(v)) {
				if (isNumber(Number(v))) {
					return true;
				}
				return sizeInterface.includes(v);
			}
			return false;
		},
	},
	sizeUnit: {
		type: String,
		default: "px",
		validator: (v) => ["px", "%"].includes(v),
	},
});

const gapSizes = {
	mini: [2, 4], //迷你号
	small: [4, 8], //小号
	medium: [8, 12], //中号 * 默认
	large: [12, 16], //大号
};
const bindStyle = computed(() => {
	const _vertical = props.vertical ? "column" : "row";
	const direction = _vertical + (props.reverse ? "-reverse" : "");
	const wrap = props.wrap ? "wrap" : "nowrap";
	const styles = {
		display: props.inline ? "inline-flex" : "flex",
		"flex-flow": `${direction} ${wrap}`,
		gap: setGaps(props.size),
		"justify-content": props.center == true ? "center" : props.justify,
		"align-items": props.center == true ? "center" : props.align,
	};
	return styles;
});
function setGaps(_size) {
	let gaps = [];
	if (isNumber(_size) || isNumber(Number(_size))) {
		gaps = [Number(_size)];
	} else if (isString(_size)) {
		gaps = gapSizes[_size];
	} else if (isArray(_size)) {
		return gapsArray(_size, props.sizeUnit);
	} else {
		gaps = gapSizes["medium"];
	}
	// .join('px ')
	return gapsArray(gaps, props.sizeUnit);
}
function gapsArray(_size, sizeUnit = "px") {
	return _size.map((item) => `${item}${sizeUnit}`).join(" ");
}
</script>

<style lang="scss" scoped></style>
