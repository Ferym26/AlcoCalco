<template lang='pug'>
	.recipe.recipe--theme-1
		.recipe__bg
			img(src="~@/assets/images/CubaLibre-bg.jpg", alt="bg")
		.recipe__title
		.recipe__descr
		.recipe__article
		.recipe__cocktail
			img(src="~@/assets/images/CubaLibre.png", alt="cocktail")
		.recipe__qr
			.recipe__qr-label Сканируйте QR-код
			.recipe__qr-text и получите рецепт и список покупок для приготовления коктейля
			.recipe__qr-field
</template>

<script>
export default {
	name: 'Recipe',
}
</script>

<style lang='sass' src='./style.sass'></style>
