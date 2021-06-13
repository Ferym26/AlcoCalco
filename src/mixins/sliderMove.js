const sliderMove = {
	data () {
		return {
			slideDirection: 'right',
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
			}, 3000)
		},
		stopAutoSlide () {
			let timer = null; // таймер перезапуска автоматической прокрутки
			clearInterval(this.interval);
			clearTimeout(timer)
			timer = setTimeout(() => {
				this.autoSlide();
			}, 120000)
		}
	}
}

export default sliderMove
