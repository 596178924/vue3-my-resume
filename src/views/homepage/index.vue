<template>
	<div>
		<div>
			<ml-button v-for="item in musics" :key="item.title" @click="changeSrc(item.src)">
				{{ item.title }}
			</ml-button>
		</div>
		<AudioPlayer :src="musicSrc"></AudioPlayer>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue-demi";

onMounted(() => {
	changeSrc(musics[musicIndex.value].src);
});
const musicIndex = ref(0);
const musicSrc = ref();
function changeSrc(src) {
	musicSrc.value = src;
}
const musics = [
	{
		title: "没那么简单",
		src: "http://m10.music.126.net/20221028114007/6f558c6e600ee38f515e75f7bb68b554/ymusic/26e3/266e/0df5/65aa454a70463ab2648a30f942c2a64f.mp3",
	},
	{
		title: "测试音频",
		src: "http://m8.music.126.net/21180815163607/04976f67866d4b4d11575ab418904467/ymusic/515a/5508/520b/f0cf47930abbbb0562c9ea61707c4c0b.mp3",
	},
];
</script>

<style lang="scss" scoped></style>
