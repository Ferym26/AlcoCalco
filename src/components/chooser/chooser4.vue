<template lang="pug">
.chooser(
	:class='"chooser--" + theme'
)
	.chooser__btn-group
		button.btn-back(
			@click.prevent='back()'
		) назад
			svg.icon(viewBox="0 0 28 46" xmlns="http://www.w3.org/2000/svg")
				path(d="M25.3141 45.2647L26.8314 43.7579C27.3052 43.2837 27.5663 42.6528 27.5663 41.9785C27.5663 41.3046 27.3052 40.6729 26.8314 40.1987L9.6422 23.0103L26.8505 5.80203C27.3243 5.32856 27.585 4.6969 27.585 4.02298C27.585 3.34905 27.3243 2.71701 26.8505 2.24317L25.3425 0.736006C24.3619 -0.245335 22.7646 -0.245336 21.7841 0.736006L1.22188 21.2245C0.748418 21.698 0.414821 22.3289 0.414821 23.0088L0.414821 23.0166C0.414821 23.6909 0.748792 24.3219 1.22188 24.7953L21.7283 45.2647C22.2018 45.739 22.8518 45.9992 23.5257 46C24.2 46 24.841 45.739 25.3141 45.2647Z")
	h1.chooser__title Настрой свой #[br] персональный коктейль!
	.chooser__descr
		span.chooser__descr-text {{ descr }}
	.slider
		vue-slider(
			v-model="value"
			:data="opts"
			:data-value="'id'"
			:data-label="'title'"
			:tooltip="'none'"
			:contained="true"
			:height='11'
			:dotSize='95'
		)
		.slider__nav
			button.slider-btn.slider-btn--prev(
				@click.prevent='sliderPrevStep'
				aria-label='prev'
			)
				svg.icon(viewBox="0 0 28 46" xmlns="http://www.w3.org/2000/svg")
					path(d="M25.3141 45.2647L26.8314 43.7579C27.3052 43.2837 27.5663 42.6528 27.5663 41.9785C27.5663 41.3046 27.3052 40.6729 26.8314 40.1987L9.6422 23.0103L26.8505 5.80203C27.3243 5.32856 27.585 4.6969 27.585 4.02298C27.585 3.34905 27.3243 2.71701 26.8505 2.24317L25.3425 0.736006C24.3619 -0.245335 22.7646 -0.245336 21.7841 0.736006L1.22188 21.2245C0.748418 21.698 0.414821 22.3289 0.414821 23.0088L0.414821 23.0166C0.414821 23.6909 0.748792 24.3219 1.22188 24.7953L21.7283 45.2647C22.2018 45.739 22.8518 45.9992 23.5257 46C24.2 46 24.841 45.739 25.3141 45.2647Z")
			button.slider-btn.slider-btn--next(
				@click.prevent='sliderNextStep'
				aria-label='next'
			)
				svg.icon(viewBox="0 0 28 46" xmlns="http://www.w3.org/2000/svg")
					path(d="M2.68589 0.735264L1.16863 2.24205C0.694787 2.71627 0.433744 3.34718 0.433744 4.02148C0.433744 4.69541 0.694787 5.32707 1.16863 5.80128L18.3578 22.9897L1.14955 40.198C0.675709 40.6714 0.41504 41.3031 0.41504 41.977C0.41504 42.6509 0.675708 43.283 1.14955 43.7568L2.65746 45.264C3.63806 46.2453 5.23536 46.2453 6.21595 45.264L26.7781 24.7755C27.2516 24.302 27.5852 23.6711 27.5852 22.9912L27.5852 22.9834C27.5852 22.3091 27.2512 21.6781 26.7781 21.2047L6.27168 0.735265C5.79821 0.261048 5.14822 0.000752116 4.4743 4.347e-06C3.8 4.25858e-06 3.15899 0.261048 2.68589 0.735264Z")
		//- .slider__descr Двигай ползунки и узнай, какой коктейль подходит тебе больше всего
	.chooser__action
		button.btn(
			@click.prevent='setOptions()'
		) Сгенерировать!
	.chooser__bg
		img.bgpic.bgpic--left(
			:src="require(`@/assets/images/${setBgPic('left')}`)"
			alt="bg"
		)
		img.bgpic.bgpic--right(
			:src="require(`@/assets/images/${setBgPic('right')}`)"
			alt="bg"
		)
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import sliderMove from "@/mixins/sliderMove.js"
import pics from "@/assets/data/choosers.js"
import reset from "@/mixins/reset.js"
export default {
	name: "Chooser",
	props: {
		stepName: {
			type: String,
			default: '',
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
	mixins: [sliderMove, reset],
	data () {
		return {
			value: 0,
		}
	},
	mounted () {
		if (this.opts.length === 1) {
			this.setOptions();
			// this.$store.commit('setBackBtnVisible', false);
			this.$emit('nextStep', 'recipe');
		} else {
			this.addSequence({[this.stepName]: true});
		}
		this.resetByTime();
	},
	computed : {
		...mapGetters({
			selectedGroup: 'getSelectedGroup',
			options: 'getOptions',
		}),
		opts () {
			const menu = this.selectedGroup.volume[this.options.volume].menu;
			const allAlco = menu.filter(item => {
				return item.taste === this.options.taste
			});
			const opts = [];
			allAlco.forEach((item) => {
				// opts.push({id: i, title: item.brand});
				opts.push(item.brand);
			});
			// const optsSet = new Set(opts);
			// const unicAlcos = [...optsSet];
			// return unicAlcos
			const optsSet = new Set(opts);
			const unicAlcos = [...optsSet];
			const arra = [];
			unicAlcos.forEach((item, i) => {
				arra.push({id: i, title: item})
			})
			return arra
		},
		pics () {
			return pics.c4
		},
	},
	methods: {
		...mapActions({
			addOptions: 'addOptions',
			addSequence: 'addSequence',
		}),
		nextStep () {
			//quantity volume taste alcohol recipe
			setTimeout(() => {
				this.$emit('nextStep', 'recipe');
			}, 500)
		},
		setBgPic (side) {
			const name = this.opts.filter(item => {
				return item.id === this.value
			});
			const pica = this.pics.filter(item => {
				return item.name === name[0].title
			});
			if (side === 'left') {
				return pica[0].bgPics.left
			} else {
				return pica[0].bgPics.right
			}
		},
		setOptions () {
			this.addOptions({[this.stepName]: this.opts[this.value].title});
			this.nextStep();
		},
		back () {
			this.$store.commit('setOption', {
				key: 'taste',
				value: null,
			});
			this.addSequence({[this.stepName]: false});
			this.$emit('setStep', 'taste');
		},
	},
};
</script>

<style lang="sass" src="./style.sass"></style>
