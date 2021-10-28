<template lang='pug'>
	.warning-alco(
		:class='{"is-open": isConfPopup}'
	)
		.warning-alco__overlay
		
		.warning-alco__content(
			v-if='!isDenide'
		)
			h2.warning-alco__title Вам есть 18 лет?
			.warning-alco__form
				.warning-alco__action
					button.btn.btn--agree(
						@click.prevent='setOptions()'
					) Da
					button.btn.btn--denide(
						@click.prevent='denide()'
					) Net
		
		.warning-alco__content(
			v-if='isDenide'
		)
			h2.warning-alco__title Мы придерживаемся правил ответственного употребления алкоголя, поэтому не можем дать доступ к списку коктейлей пока вам не исполнилось 18&nbsp;лет.
			.warning-alco__form
				.warning-alco__action
					button.btn.btn--denide(
						@click.prevent='close()'
					) Закрыть
		
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import sliderMove from "@/mixins/sliderMove.js"
export default {
	name: 'warningAlco',
	props: {
		firstValue: {
			type: Number,
			default: 0,
		}
	},
	mixins: [sliderMove],
	data() {
		return {
			stepName: 'quantity',
			isDenide: false,
			timeClose: 1000, //sec
		}
	},
	computed: {
		...mapGetters({
			isConfPopup: 'getConfirmationPopupVisibility',
		}),
	},
	methods: {
		...mapActions({
			calcGroup: 'calcGroup',
			addOptions: 'addOptions',
		}),
		setOptions () {
			this.$store.commit('setConfirmationPopupVisibility', false);
			this.calcGroup(this.firstValue);
			this.addOptions({[this.stepName]: this.firstValue});
			this.nextStep();
		},
		nextStep () {
			//quantity volume taste alcohol recipe
			// this.$emit('nextStep', 'volume');
			if (this.firstValue === 0) {
				setTimeout(() => {
					this.$emit('nextStep', 'taste');
					return false;
				}, 500)
			}
			if (this.firstValue !== 0) {
				setTimeout(() => {
					this.$emit('nextStep', 'volume');
					return false;
				}, 500)
			}
		},
		denide () {
			this.isDenide = true;
			setTimeout(() => {
				this.$store.commit('setConfirmationPopupVisibility', false);
			}, this.timeClose * 1000)
		},
		close () {
			this.$store.commit('setConfirmationPopupVisibility', false);
			this.isDenide = false;
		},
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
