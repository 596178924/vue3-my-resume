<template>
	<slot></slot>
</template>

<script setup>
// import { ref, watch } from "vue-demi";
// import { useCssVar } from "@vueuse/core";
// import { mixColor } from "@/utils/colorFn";

// const themeColors = {
// 	primary: "#1890ff",
// 	success: "#13ce66",
// 	warning: "#ffba00",
// 	error: "#ff4d4f",
// 	info: "#909399",
// };

// const degrees = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const lightDegrees = [1, 2, 3, 5, 7, 9];
// const darkDegrees = [2];
// function getDegreeArr(_degrees, themeColorKey, _isDark) {
// 	const _dark = _isDark ? "dark" : "light";
// 	return _degrees.map((item) => {
// 		return [getVarName(themeColorKey, _dark, item), item];
// 	});
// }
// function getLightDegreeArr(themeColorKey, _isDark) {
// 	return getDegreeArr(lightDegrees, themeColorKey, _isDark);
// }
// function getDarkDegreeArr(themeColorKey, _isDark) {
// 	return getDegreeArr(darkDegrees, themeColorKey, _isDark);
// }

// function getVarName(_key, _dark, scale) {
// 	return `${_key}-${_dark}-${scale}`;
// }

/**
 * @description: 设置主题变量
 * @param {string} _var 变量名
 * @param {string} c 主题色
 * @param {string} dc 混合色
 * @param {number} m [0 - 1] 调整混合度
 * @return {string} new color
 */
// function setMixVars(_var, c, dc, m) {
// 	// console.log("setMixVars:",_var, c, dc, m);
// 	useCssVar(_var, ref(null)).value = dc ? mixColor(c, dc, m) : c;
// 	// const mix = dc ? mixColor(c, dc, m) : c;
// 	// console.log("setMixVars:", _var, mix);
// 	// useCssVar(_var, ref(null)).value = mix;
// }
// function startMixinThemeColors(_isDark) {
// 	// const _isDark = isDark.value;
// 	const _mixDark = "#000000";
// 	const _mixLight = "#ffffff";
// 	Object.keys(themeColors).map((themeColorKey) => {
// 		const _varColor = themeColors[themeColorKey];
// 		const _themeVar = `--ml-color-${themeColorKey}`;
// 		const lightVarArr = getLightDegreeArr(_themeVar, !_isDark);
// 		lightVarArr.map((_Var) => {
// 			setMixVars(_Var[0], _varColor, _mixLight, _Var[1] / 10);
// 		});
// 		const darkVarArr = getDarkDegreeArr(_themeVar, _isDark);
// 		darkVarArr.map((_Var) => {
// 			setMixVars(_Var[0], _varColor, _mixDark, _Var[1] / 10);
// 		});
// 		setMixVars(_themeVar, _varColor);
// 	});
// }
// startMixinThemeColors(isDark.value);
// watch(
// 	() => isDark.value,
// 	(n) => {
// 		startMixinThemeColors(n);
// 	}
// );
// onMounted(() => {
// 	// toggleDark();
// 	// console.log(isDark.value);
// });
</script>

<style lang="scss" scoped></style>
