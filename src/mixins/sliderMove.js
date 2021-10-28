const sliderMove = {
	data () {
		return {
			slideDirection: 'right',
			interval: null,
			timer: null, // таймер перезапуска автоматической прокрутки
			timeAutoSlide: 3, // sec
			timeRerunAutoSlide: 120, // sec
		}
	},
	methods: {
		sliderPrevStep () {
			if (this.value > 0) {
				this.value -= 1
			}
		},
		sliderNextStep () {
			if (this.value < this.opts.length - 1) {
				this.value += 1
			}
		},
		autoSlide () {
			this.interval = setInterval(() => {
				if (this.slideDirection === 'right') {
					if (this.value === this.opts.length - 1) {
						this.slideDirection = 'left'
					}
					this.sliderNextStep();
				}
				if (this.slideDirection === 'left') {
					this.sliderPrevStep();
					if (this.value === 0) {
						this.slideDirection = 'right'
					}
				}
			}, this.timeAutoSlide * 1000)
		},
		stopAutoSlide () {
			clearInterval(this.interval);
			clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				this.$store.commit('setConfirmationPopupVisibility', false);
				this.autoSlide();
			}, this.timeRerunAutoSlide * 1000)
		}
	}
}

export default sliderMove
