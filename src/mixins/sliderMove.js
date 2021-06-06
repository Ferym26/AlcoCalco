const sliderMove = {
	methods: {
		sliderPrevStep () {
			if (this.value > 1) {
				this.value -= 1
			}
		},
		sliderNextStep () {
			if (this.value < this.opts.length) {
				this.value += 1
			}
		},
	}
}

export default sliderMove
