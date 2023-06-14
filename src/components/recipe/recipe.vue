<template lang='pug'>
.recipe(
	v-if="currentCocktail"
	ref='recipe'
	:style='{backgroundColor: currentCocktail.bgColor}'
)
	.recipe__bg
		img(:src="require(`@/assets/images/${currentCocktail.bgImg}`)", alt="bg")
	
	.recipe__content
		.recipe__btn-group
			button.btn-back(
				@click.prevent='back()'
			) назад
				svg.icon(viewBox="0 0 28 46" xmlns="http://www.w3.org/2000/svg")
					path(d="M25.3141 45.2647L26.8314 43.7579C27.3052 43.2837 27.5663 42.6528 27.5663 41.9785C27.5663 41.3046 27.3052 40.6729 26.8314 40.1987L9.6422 23.0103L26.8505 5.80203C27.3243 5.32856 27.585 4.6969 27.585 4.02298C27.585 3.34905 27.3243 2.71701 26.8505 2.24317L25.3425 0.736006C24.3619 -0.245335 22.7646 -0.245336 21.7841 0.736006L1.22188 21.2245C0.748418 21.698 0.414821 22.3289 0.414821 23.0088L0.414821 23.0166C0.414821 23.6909 0.748792 24.3219 1.22188 24.7953L21.7283 45.2647C22.2018 45.739 22.8518 45.9992 23.5257 46C24.2 46 24.841 45.739 25.3141 45.2647Z")
			button.btn-reset(
				@click.prevent='reset()'
			) в начало
				svg.icon(viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg")
					path(d="M26.8315 43.758L25.3145 45.2647C24.8413 45.739 24.2002 46 23.5259 46C22.8521 45.9992 22.2021 45.739 21.7285 45.2647L1.22217 24.7953C0.749023 24.3219 0.415039 23.6909 0.415039 23.0166V23.0088C0.415039 22.3289 0.748535 21.698 1.22217 21.2245L21.7842 0.735992C22.7646 -0.245331 24.3623 -0.245331 25.3428 0.735992L26.8506 2.24319C27.3247 2.71707 27.5854 3.34903 27.5854 4.02298C27.5854 4.69693 27.3247 5.32864 26.8506 5.80203L9.64258 23.0103L26.8315 40.1988C27.3052 40.6729 27.5664 41.3046 27.5664 41.9785C27.5664 42.6529 27.3052 43.2837 26.8315 43.758ZM44.4165 43.758L42.8994 45.2647C42.4263 45.739 41.7852 46 41.1108 46C40.437 45.9992 39.7871 45.739 39.3135 45.2647L18.8071 24.7953C18.334 24.3219 18 23.6909 18 23.0166V23.0088C18 22.3289 18.3335 21.698 18.8071 21.2245L39.3691 0.735992C40.3496 -0.245331 41.9473 -0.245331 42.9277 0.735992L44.4355 2.24319C44.9097 2.71707 45.1704 3.34903 45.1704 4.02298C45.1704 4.69693 44.9097 5.32864 44.4355 5.80203L27.2275 23.0103L44.4165 40.1988C44.8901 40.6729 45.1514 41.3046 45.1514 41.9785C45.1514 42.0808 45.1455 42.182 45.1338 42.2819C45.0674 42.8406 44.8184 43.3556 44.4165 43.758Z")
		.recipe__subtitle Ваш коктейль
		.recipe__title(
			:class='titleClass()'
		)
			span {{ currentCocktail.title }}
		.recipe__descr
			.recipe__descr-body
				.recipe__descr-title Вкус {{ currentCocktail.taste }}
				.recipe__descr-text {{ descr }}
		.recipe__article(v-html="currentCocktail.article")
	
	.recipe__cocktail
		img(:src="require(`@/assets/images/${currentCocktail.glassImg}`)", alt="cocktail")
	
	.recipe__qr
		.recipe__qr-label Сканируйте QR-код
		.recipe__qr-text и получите рецепт и список покупок для приготовления коктейля
		.recipe__qr-field
			Qrcode(
				:url='currentCocktail.url'
			)

	.recipe__debug(v-if='isDebugMode')
		input(type="text")
		button(@click="currentCocktailID++") +
		button(@click="currentCocktailID--") -
</template>

<script>
import Qrcode from "@/components/qrcode/qrcode"
import cocktails from "@/assets/data/cocktails.js"
import { mapGetters } from 'vuex'
import reset from "@/mixins/reset.js"
export default {
	name: 'Recipe',
	components: {
		Qrcode
	},
	mixins: [reset],
	data () {
		return {
			isDebugMode: false,
		}
	},
	computed: {
		...mapGetters({
			options: 'getOptions',
			selectedGroup: 'getSelectedGroup',
			// backBtnVisible: 'getBackBtnVisible',
			sequence: 'getSequence',
		}),
		currentCocktailID () {
			const menu = this.selectedGroup.volume[this.options.volume].menu;
			const coctail = menu.filter(item => {
				return item.brand === this.options.alcohol && item.taste === this.options.taste
			});
			return coctail[0]?.cocktailID
		},
		currentCocktail () {
			if(this.currentCocktailID === undefined) return undefined
			const coctailArr = cocktails.filter(item => {
				return item.id === this.currentCocktailID
				// return item.id === 41;
			});
			const cocktail = coctailArr[0]
			return cocktail
		},
		descr () {
			return this.selectedGroup.volume[this.options.volume].volumeDescr
		}
	},
	mounted () {
		this.setColor();
		this.resetByTime();
	},
	methods: {
		setColor () {
			this.$refs.recipe.style.setProperty('--color-accent', this.currentCocktail.accentColor);
		},
		titleClass () {
			const titleLength = this.currentCocktail.title.length;
			if (titleLength <= 6) {
				return 'recipe__title--size-1'
			}
			if (titleLength > 6 && titleLength <= 10) {
				return 'recipe__title--size-2'
			}
			if (titleLength > 10 && titleLength <= 15) {
				return 'recipe__title--size-3'
			}
			if (titleLength > 15 && titleLength <= 20) {
				return 'recipe__title--size-4'
			}
			if (titleLength > 20) {
				return 'recipe__title--size-5'
			}
		},
		back () {
			if (this.sequence.alcohol) {
				this.$store.commit('setOption', {
					key: 'alcohol',
					value: null,
				});
				this.$emit('setStep', 'alcohol');
			} else {
				this.$store.commit('setOption', {
					key: 'taste',
					value: null,
				});
				this.$emit('setStep', 'taste');
			}
		},
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
