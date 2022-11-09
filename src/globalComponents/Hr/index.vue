<script>
import { textAlignInterface } from "@gc/_interfaceTypes.js";
import { bindClassName } from "@gc/_utils.js";
import { h, renderSlot, computed } from "vue-demi";
export default {
	props: {
		title: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			default: "solid",
			validator: (v) =>
				[
					"solid",
					"dashed",
					"wavy",
					"double",
					"dashed-filled",
					"edge-weak",
					"twill",
					"twill-colorful",
					"space-square",
                    "double-arrow",
				].includes(v),
		},
		align: {
			type: String,
			default: "center",
			validator: (v) => textAlignInterface.includes(v),
		},
	},
	setup(props, { slots }) {
		const dividerClass = computed(() =>
			bindClassName([
				"ml-hr",
				`hr--${props.type}`,
				slots.tilte || props.title ? `ml-hr--title-position-${props.align}` : "",
			])
		);
		const slotTitle = () => {
			if (props.title) {
				return h("span", {}, props.title);
			} else {
				return renderSlot(slots, "title");
			}
		};
		const notTitle = computed(() => !slots.tilte && !props.title);
		const modTitle = () => {
			if (notTitle.value) return "";
			return h(
				"div",
				{
					className: "ml-hr__title",
				},
				slotTitle()
			);
		};
		const bindLeftClassName = computed(() =>
			bindClassName([
				"ml-hr__line",
				{
					"ml-hr__line--left": notTitle.value != true,
				},
			])
		);
		const modLineLeft = () =>
			h("div", {
				className: bindLeftClassName.value,
			});
		const modLineRight = () => {
			if (notTitle.value) return "";
			return h("div", {
				className: "ml-hr__line ml-hr__line--right",
			});
		};
		return () => {
			return h("div", { className: dividerClass.value }, [modLineLeft(), modTitle(), modLineRight()]);
		};
	},
};
</script>

<style lang="scss" scoped>
$borderColor: var(--ml-border-color, #e6e6e6);
.ml-hr {
	display: flex;
	align-items: center;
	text-align: center;
	&.hr--dashed {
		--ml-border-style: dashed;
	}
	&.hr--solid {
		--ml-border-style: solid;
	}
	&.hr--double {
		--ml-divider-border-size: 3px 0 0;
		--ml-border-style: double;
	}
}
.ml-hr--title-position {
	&-center {
		.ml-hr__line--left,
		.ml-hr__line--right {
			flex: 1 1 100%;
		}
	}
	&-left {
		.ml-hr__line--left {
			flex: 1 0 2em;
		}
		.ml-hr__line--right {
			flex: 1 1 100%;
		}
	}
	&-right {
		.ml-hr__line--left {
			flex: 1 1 100%;
		}
		.ml-hr__line--right {
			flex: 1 0 2em;
		}
	}
}
.ml-hr__title {
	flex: 1 0 auto;
}
.ml-hr__title {
	padding: 0 8px;
}
.ml-hr__line {
	margin: 10px 0;
	border-width: var(--ml-divider-border-size, 1px 0 0);
	border-style: var(--ml-border-style, solid);
	border-color: var(--ml-border-color, #e6e6e6);
	line-height: 0;
	flex: 1 1 100%;
}
.ml-hr.hr--wavy {
	.ml-hr__line {
		--ml-divider-border-size: 0;
		letter-spacing: 100vw;
		white-space: nowrap;
		overflow: hidden;
		padding-top: 0.75em;
		height: 0;
		&::before {
			display: block;
			content: "\2000\2000";
			text-decoration: overline;
			text-decoration: overline wavy;
			padding-top: 0.5em;
			color: $borderColor;
		}
	}
}
.ml-hr.hr--dashed-filled {
	.ml-hr__line {
		--ml-divider-border-size: 0;
		padding-top: 1px;
		/* for IE浏览器 */
		background: repeating-linear-gradient(to right, #a2a9b6 0px, #a2a9b6 4px, transparent 0px, transparent 10px);
		/* for 现代浏览器 */
		background: repeating-linear-gradient(
			to right,
			#a2a9b6 0 var(--dashed-filled, 4px),
			transparent 0 calc(var(--dashed-filled, 4px) + var(--dashed-open, 6px))
		);
	}
}
.ml-hr.hr--edge-weak {
	.ml-hr__line {
		--ml-divider-border-size: 0;
		padding-top: 1px;
	}
	.ml-hr__line--left {
		background: linear-gradient(to right, transparent, #d0d0d5);
	}
	.ml-hr__line--right {
		background: linear-gradient(to left, transparent, #d0d0d5);
	}
}

.ml-hr.hr--twill {
	.ml-hr__line {
		--ml-divider-border-size: 0;
		padding-top: 3px;
		background: repeating-linear-gradient(135deg, $borderColor 0px, $borderColor 1px, transparent 1px, transparent 6px);
	}
}
.ml-hr.hr--twill-colorful {
	.ml-hr__line {
		--ml-divider-border-size: 0;
		padding-top: 3px;
		background: linear-gradient(135deg, red, orange, green, blue, purple);
		--mask-image: repeating-linear-gradient(135deg, #000 0px, #000 1px, transparent 1px, transparent 6px);
		-webkit-mask-image: var(--mask-image);
		mask-image: var(--mask-image);
	}
}
.ml-hr.hr--space-square {
	.ml-hr__line {
		--ml-divider-border-size: 0;
		color: #d0d0d5;
		background: linear-gradient(currentColor, currentColor) no-repeat center;
		background-size: calc(100% - 2em) 1px;
		display: flex;
		justify-content: space-between;
		&::before,
		&::after {
			content: "";
			display: block;
			width: 0.75em;
			height: 0.75em;
			transform: rotate(45deg);
			box-sizing: border-box;
			border: 1px solid;
			margin: 3px;
		}
	}
}

.ml-hr.hr--double-arrow {
	.ml-hr__line {
		--ml-divider-border-size: 0 3px 5px;
		border: double;
		border-color: inherit transparent;
		height: 1px;
		overflow: visible;
		margin-left: 20px;
		margin-right: 20px;
		position: relative;
		&:before,
		&:after {
			content: "";
			position: absolute;
			width: 5px;
			height: 5px;
			border-width: 0 3px 3px 0;
			border-style: double;
			top: -3px;
			background: radial-gradient(2px at 1px 1px, currentColor 2px, transparent 0) no-repeat;
		}
		&:before {
			transform: rotate(-45deg);
			left: -20px;
		}
		&:after {
			transform: rotate(135deg);
			right: -20px;
		}
	}
}
// 'twill','twill-colorful'
</style>
