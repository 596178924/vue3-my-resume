<template>
	<div class="m-audio" :class="bindClass">
		<audio
			ref="audioRef"
			v-bind="playerBind"
			crossOrigin="anonymous"
			preload="none"
			@canplay="onRefCanplay"
			@canplaythrough="onRefCanplaythrough"
			@durationchange="onRefDurationchange"
			@timeupdate="onRefTimeupdate"
			@ended="onRefEnded"
			@pause="onRefPause"
			@volumechange="onRefVolumechange"
		>
			<source :src="src" />
			您的浏览器不支持 audio 元素。
		</audio>
	</div>
</template>

<script setup>
import { defineProps, ref, defineExpose, defineEmits, computed, toRefs, watch,   unref } from "vue-demi";
import { isNumber } from "@gc/_validator.js";

const emits = defineEmits([
	"loaded",
	"canplay",
	"canplaythrough",
	"durationchange",
	"timeupdate",
	"ended",
	"pause",
	"volumechange",
    'update:currentTime',
    'update:duration',
]);

const props = defineProps({
	src: {
		type: String,
		default: "",
	},
	controls: {
		// 展示控键
		type: Boolean,
		default: false,
	},
	loop: {
		// 循环播放
		type: Boolean,
	},
	autoplay: {
		// 自动播放
		type: Boolean,
	},
	muted: {
		// 静音
		type: Boolean,
	},
    currentTime: {
        type: Number,
        default: 0
    },
    duration: {
         type: Number,
        default: 0
    }
});

const bindClass = computed(() => ({
	"is-hidden": props.controls,
}));

const playerBind = computed(() => ({
	autoplay: props.autoplay,
	loop: props.loop,
	muted: props.muted,
	controls: props.controls,
}));

const { src } = toRefs(props);
watch(
	() => src.value,
	() => onLoad()
);
const currentTime = computed({
    get: ()=> props.currentTime,
    set: (v)=> emits('update:currentTime',v)
})
const duration = computed({
    get: ()=> props.duration,
    set: (v)=> emits('update:duration',v)
})

/**

    属性
    可读写属性:

    src: 播放文件地址
    autoplay: 基于用户体验角度 各大浏览器禁止自动播放
    controls: 控制器显示
    muted: 是否静音
    loop: 是否循环播放
    currentSrc: 当前播放地址
    currentTime: 当前播放时长 单位 s
    duration: 音频时长 单位 s
    volume: 音乐音量 [0, 1] 最小值 0 最大值 1
    playbackRate: 播放速度

    只读属性:
    paused: 音乐是否暂停播放 true--暂停 false--播放
    ended: 音乐是否结束播放 true--结束 false--没有结束 设置了loop 音频重复循环播放 不会结束()

*/

defineExpose({
	play: play,
	pause: pause,
	updateVolume: updateVolume,
	updatePlaybackRate: updatePlaybackRate,
	updateCurrentTime: updateCurrentTime,
});
const audioRef = ref();
function play() {
	audioRef.value.play();
}
function load() {
	audioRef.value.load();
}
function pause() {
	audioRef.value.pause();
}

// 改变播放音量
function updateVolume(_v) {
	if (!(_v >= 0 && _v <= 1)) {
		return Error("Uncaught RangeError: _v must be between 0 and 1 ");
	}
	if (!isNumber(_v)) {
		return Error("Uncaught TypeError: _v is not a Number");
	}
	audioRef.value.volume = _v;
}
// 改变播放速度
function updatePlaybackRate(_v) {
	if (!isNumber(_v)) {
		return Error("Uncaught TypeError: _v is not a Number");
	}
	audioRef.value.playbackRate = _v;
}
// 切换播放时间
function updateCurrentTime(_v) {
	if (!isNumber(_v)) {
		return Error("Uncaught TypeError: _v is not a Number");
	}
	audioRef.value.currentTime = _v;
}
/*
@canplay="onRefCanplay"
@canplaythrough="onRefCanplaythrough"
@durationchange="onRefDurationchange"
@timeupdate="onRefTimeupdate"
@ended="onRefEnded"
@pause="onRefPause"
@volumechange="onRefVolumechange"

事件
oncanplay: 音频可以播放事件(缓冲已足够开始时)
oncanplaythrough: 音频可以不缓冲直接从头执行到尾
ondurationchange: 当媒体时长被改变
ontimeupdate: 播放时间更新的事件
onended: 当音频结束播放事件
onpause: 当音频播放暂停事件
onvolumechange: 当音量发生改变时触发
*/

function onLoad() {
	console.log("音频加载");
	load()
	emits("loaded", audioRef.value);
}
function onRefCanplay(e) {
	console.log("音频可以播放");
	emits("canplay", e);
}
function onRefCanplaythrough(e) {
	console.log("音频可以不缓冲直接从头执行到尾");
	emits("canplaythrough", e);
}
function onRefDurationchange(e) {
	console.log("当媒体时长被改变");
	duration.value = e.target.duration;
	emits("durationchange", unref(duration));
}
function onRefTimeupdate(e) {
	console.log("播放时间更新");
    currentTime.value = e.target.currentTime
	emits("timeupdate", unref(currentTime));
}
function onRefEnded(e) {
	console.log("音频结束播放", e.target.ended);
	emits("ended", e.target.ended);
}
function onRefPause(e) {
	console.log("音频播放暂停", e.target.paused);
	emits("pause", e.target.paused);
}
function onRefVolumechange(e) {
	console.log("音量发生改变");
	emits("volumechange", e.target.volume);
}
</script>

<style lang="scss" scoped>
.m-audio.is-hidden {
	display: none;
}
</style>
