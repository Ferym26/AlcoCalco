<template lang='pug'>
	.recipe(
		ref='recipe'
		:style='{backgroundColor: currentCocktail.bgColor}'
	)
		.recipe__bg
			img(:src="require(`@/assets/images/${currentCocktail.bgImg}`)", alt="bg")
		.recipe__content
			.recipe__subtitle Ваш коктейль
			.recipe__title {{ currentCocktail.title }}
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
export default {
	name: 'Recipe',
	components: {
		Qrcode
	},
	computed: {
		...mapGetters({
			options: 'getOptions',
			selectedGroup: 'getSelectedGroup',
		}),
		currentCocktail () {
			const coctailArr = cocktails.filter(item => {
				return item.id === this.options.alco
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
	},
	methods: {
		setColor () {
			this.$refs.recipe.style.setProperty('--color-accent', this.currentCocktail.accentColor);
		}
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
