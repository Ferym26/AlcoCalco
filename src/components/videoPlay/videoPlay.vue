<template lang='pug'>
.video-play(
	v-if='isVisible'
)
	video.video(muted loop autoplay playsinline poster='')
		source(src='@/assets/video/video-1.mp4' type="video/mp4")

</template>

<script>
export default {
	name: 'videoPlay',
	data() {
		return {
			isVisible: false,
			timer: null,
			timeToStart: 15, // min
		}
	},
	mounted() {
		this.showVideo();
	},
	methods: {
		showVideo () {
			const videoTimer = () => {
				this.timer = setTimeout(() => {
					this.isVisible = true;
				}, 60000 * this.timeToStart);
			}
			videoTimer();

			const resetTimer = () => {
				console.log(111);
				clearInterval(this.timer);
				this.isVisible = false;
				videoTimer();
			}

			document.addEventListener('click', resetTimer);
		},
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
