<template lang='pug'>
	.recipe(
		ref='recipe'
		:style='{backgroundColor: currentCocktail.bgColor}'
	)
		.recipe__bg
			img(:src="require(`@/assets/images/${currentCocktail.bgImg}`)", alt="bg")
		.recipe__content
			button.btn-reset(
				@click.prevent='reset()'
			) в начало
				svg.icon(viewBox="0 0 28 46" xmlns="http://www.w3.org/2000/svg")
					path(d="M25.3141 45.2647L26.8314 43.7579C27.3052 43.2837 27.5663 42.6528 27.5663 41.9785C27.5663 41.3046 27.3052 40.6729 26.8314 40.1987L9.6422 23.0103L26.8505 5.80203C27.3243 5.32856 27.585 4.6969 27.585 4.02298C27.585 3.34905 27.3243 2.71701 26.8505 2.24317L25.3425 0.736006C24.3619 -0.245335 22.7646 -0.245336 21.7841 0.736006L1.22188 21.2245C0.748418 21.698 0.414821 22.3289 0.414821 23.0088L0.414821 23.0166C0.414821 23.6909 0.748792 24.3219 1.22188 24.7953L21.7283 45.2647C22.2018 45.739 22.8518 45.9992 23.5257 46C24.2 46 24.841 45.739 25.3141 45.2647Z")

			.recipe__subtitle Ваш коктейль
			.recipe__title(
				:class='titleClass()'
			)
				span {{ currentCocktail.title }}
			.recipe__descr
				.recipe__descr-title Вкус {{ currentCocktail.taste }}
				.recipe__descr-body
					.recipe__descr-text {{ descr }}
			.recipe__article {{ currentCocktail.article }}
		.recipe__cocktail
			img(:src="require(`@/assets/images/${currentCocktail.glassImg}`)", alt="cocktail")
		.recipe__qr
			.recipe__qr-label Сканируйте QR-код
			.recipe__qr-text и получите рецепт и список покупок для приготовления коктейля
			.recipe__qr-field
				Qrcode(
					:url='currentCocktail.url'
				)
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
			// 
		}
	},
	computed: {
		...mapGetters({
			options: 'getOptions',
			selectedGroup: 'getSelectedGroup',
		}),
		currentCocktailID () {
			const menu = this.selectedGroup.volume[this.options.volume].menu;
			const coctail = menu.filter(item => {
				return item.brand === this.options.alcohol && item.taste === this.options.taste
			});
			return coctail[0].cocktailID
		},
		currentCocktail () {
			const coctailArr = cocktails.filter(item => {
				return item.id === this.currentCocktailID
				// return item.id === 13 // 13 14 35
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
		// this.resetByTime();
	},
	methods: {
		setColor () {
			this.$refs.recipe.style.setProperty('--color-accent', this.currentCocktail.accentColor);
		},
		titleClass () {
			const titleLength = this.currentCocktail.title.length;
			if (titleLength <= 5) {
				return 'recipe__title--size-1'
			}
			if (titleLength > 5 && titleLength <= 10) {
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
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
