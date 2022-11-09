<template>
	<div class="m-audio-player">
		<p>当前播放时间：{{ audioData.currentTime }}</p>
		<p>音频总体时间：{{ audioData.duration }}</p>
		<ml-audio
			ref="audioRef"
			:src="src"
			v-model:currentTime="audioData.currentTime"
			v-model:duration="audioData.duration"
		></ml-audio>
		<!-- <div>
			{{ src }}
		</div> -->
		<div class="btns">
			<button @click="updatePlaybackRate(0.5)">改变播放速度0.5</button>
			<button @click="updatePlaybackRate(1)">改变播放速度1</button>
			<button @click="updatePlaybackRate(1.5)">改变播放速度1.5</button>
			<br />
			<button @click="updateVolume(0.5)">改变播放音量0.5</button>
			<button @click="updateVolume(1)">改变播放音量1</button>
			<button @click="updateVolume(1.5)">改变播放音量1.5</button>
			<br />
			<button @click="updateCurrentTime(10)">改变播放时间 10</button>
		</div>

		<ml-button theme="primary" @click="playMusic"> 播放 </ml-button>
		<ml-button @click="stopMusic"> 暂停 </ml-button>
		<el-slider :max="audioData.duration" v-model="audioData.currentTime" :show-tooltip="false" @change="updateCurrentTime"/>

	</div>
</template>

<script setup>
import { defineProps, reactive, ref } from "vue-demi";
import mlAudio from "./Audio.vue";
// import mlAudioProgressBar from "./Progress.vue"

// const props =
defineProps({
	src: {
		type: String,
		default: "",
	},
});
const audioData = reactive({
	currentTime: 0,
	duration: 0,
});
const audioRef = ref();
function playMusic() {
	audioRef.value.play();
}
function stopMusic() {
	audioRef.value.pause();
}

function updatePlaybackRate(v) {
	audioRef.value.updatePlaybackRate(v);
}
function updateVolume(v) {
	audioRef.value.updateVolume(v);
}
function updateCurrentTime(v) {
	audioRef.value.updateCurrentTime(v);
}
</script>

<style lang="scss" scoped>
.btns {
	button {
		font-size: 12px;
		height: 32px;
		padding: 4px 8px;
		margin: 4px;
		background-color: var(--ml-fill-color-dark);
		&:hover {
			background-color: var(--ml-fill-color-light);
		}
	}
}
.m-audio-player {
	padding: 8px;
	// background-color: #fff;
}
</style>
