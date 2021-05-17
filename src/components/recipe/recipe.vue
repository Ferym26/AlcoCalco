<template lang='pug'>
	.recipe(
		ref='recipe'
		:style='{backgroundColor: bgColor}'
	)
		.recipe__bg
			img(src="~@/assets/images/cubalibre-bg.jpg", alt="bg")
		.recipe__content
			.recipe__subtitle Ваш коктейль
			.recipe__title {{ title }}
			.recipe__descr
				.recipe__descr-title {{ taste }}
				.recipe__descr-body
					.recipe__descr-text {{ descr }}
			.recipe__article {{ article }}
		.recipe__cocktail
			img(src="~@/assets/images/CubaLibre.png", alt="cocktail")
		.recipe__qr
			.recipe__qr-label Сканируйте QR-код
			.recipe__qr-text и получите рецепт и список покупок для приготовления коктейля
			.recipe__qr-field
				Qrcode(
					:url='url'
				)
</template>

<script>
import Qrcode from "@/components/qrcode/qrcode";
export default {
	name: 'Recipe',
	props: {
		id: {
			type: Number,
			default: null,
		},
		title: {
			type: String,
			default: '',
		},
		glassImg: {
			type: String,
			default: '',
		},
		titleMode: {
			type: String,
			default: '',
		},
		bgImg: {
			type: String,
			default: '',
		},
		bgColor: {
			type: String,
			default: '',
		},
		accentColor: {
			type: String,
			default: '',
		},
		url: {
			type: String,
			default: '',
		},
		descr: {
			type: String,
			default: '',
		},
		article: {
			type: String,
			default: '',
		},
		taste: {
			type: String,
			default: '',
		},
	},
	components: {
        Qrcode
    },
	mounted () {
		this.$refs.recipe.style.setProperty('--color-accent', this.accentColor);
	}
}
</script>

<style lang='sass' src='./style.sass'></style>
