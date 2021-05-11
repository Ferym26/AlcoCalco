<template lang="pug">
	.chooser(
		:class='"chooser--" + theme'
	)
		h1.chooser__title Настрой свой персональный коктейль!
		.chooser__descr
			span.chooser__descr-text {{ descr }}
		.slider
			vue-slider(
				v-model="value"
				:data="list"
				:data-value="'id'"
				:data-label="'name'"
				:tooltip="'none'"
			)
			.slider__nav
				button.slider-btn(
					@click.prevent='sliderPrevStep'
				) Prev
				button.slider-btn(
					@click.prevent='sliderNextStep'
				) Next
			.slider__descr Двигай ползунки и узнай, какой коктейль подходит тебе больше всего
		.chooser__action
			button.btn(
				@click.prevent='nextStep()'
			) Да, я буду один
</template>

<script>
export default {
	name: "Chooser",
	props: {
		list: {
			type: Array,
			default: () => ([]),
		},
		theme: {
			type: String,
			default: '',
		},
		descr: {
			type: String,
			default: '',
		},
		step: {
			type: String,
			default: '',
		}
	},
	data: () => ({
		value: 1,
	}),
	mounted () {
		//
	},
	methods: {
		sliderPrevStep () {
			if (this.value > 1) {
				this.value -= 1
			}
		},
		sliderNextStep () {
			if (this.value < this.list.length) {
				this.value += 1
			}
		},
		nextStep () {
			//quantity volume mood alcohol recipe
			if (this.step === 'quantity' && this.value === 1) {
				this.$emit('nextStep', 'mood');
				return false;
			}
			if (this.step === 'quantity' && this.value !== 1) {
				this.$emit('nextStep', 'volume');
				return false;
			}
			switch (this.step) {
				case 'volume':
					this.$emit('nextStep', 'mood');
					break
				case 'mood':
					this.$emit('nextStep', 'alcohol');
					break
				case 'alcohol':
					this.$emit('nextStep', 'recipe');
					break
				default:
					this.$emit('nextStep', 'quantity');
			}
		}
	},
};
</script>

<style lang="sass" src="./style.sass"></style>
