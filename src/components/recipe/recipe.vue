<template lang='pug'>
	.recipe(
		ref='recipe'
		:style='{backgroundColor: currentCocktail.bgColor}'
	)
		.recipe__bg
			img(:src="require(`@/assets/images/${currentCocktail.bgImg}`)", alt="bg")
		.recipe__content
			//- .recipe__debagger
				input(
					v-model='debugID'
					type="text"
				)
				button(
					@click.prevent='setDebugCocktail()'
				) показать
			button.btn-reset(
				@click.prevent='reset()'
			) В начало
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
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'Recipe',
	components: {
		Qrcode
	},
	data () {
		return {
			autoResetTime: 2, //minutes
			// debugID: 1,
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
		...mapActions({
			resetOptions: 'resetOptions',
		}),
		setColor () {
			this.$refs.recipe.style.setProperty('--color-accent', this.currentCocktail.accentColor);
		},
		reset () {
			this.resetOptions();
			this.setStep();
		},
		resetByTime () {
			setTimeout(() => {
				this.reset();
			}, 60000 * this.autoResetTime)
		},
		setStep () {
			//quantity volume taste alcohol recipe
			this.$emit('setStep', 'quantity');
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
