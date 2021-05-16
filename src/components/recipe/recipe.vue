<template lang='pug'>
	.recipe.recipe--theme-1
		.recipe__bg
			img(src="~@/assets/images/CubaLibre-bg.jpg", alt="bg")
		.recipe__content
			.recipe__subtitle Ваш коктейль
			.recipe__title Cuba Libre
			.recipe__descr
				.recipe__descr-title Вкус сладкий
				.recipe__descr-body
					.recipe__descr-text Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero maiores sequi nam sunt laboriosam? Cupiditate, esse? Ducimus earum quidem mollitia aut eaque hic? Iste eum nesciunt esse veniam architecto mollitia?
			.recipe__article Cuba Libre в переводе с испанского языка означает «свободная Куба», и это многое говорит о напитке. Неординарное сочетание Havana Club Especial с нотками ванили и карамели, а также кислинка лайма выводит коктейль на новый уровень вкуcа.
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
