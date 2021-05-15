<template lang="pug">
	#app.wrapper
		.step(
			v-if='step === "quantity"'
		)
			Chooser(
				:key='1'
				:opts='opts1'
				:theme='"theme-1"'
				:descr='"Для начала выбери количество людей, с которыми ты бы разделил коктейль:"'
				:step='step'
				@nextStep='setStep'
			)
		.step(
			v-if='step === "volume"'
		)
			Chooser(
				:key='2'
				:opts='opts2'
				:theme='"theme-2"'
				:descr='"Выбери уровень громкости посиделки:"'
				:step='step'
				@nextStep='setStep'
			)
		.step(
			v-if='step === "taste"'
		)
			Chooser(
				:key='3'
				:opts='opts3'
				:theme='"theme-3"'
				:descr='"Выбери вкус под свое настроение:"'
				:step='step'
				@nextStep='setStep'
			)
		.step(
			v-if='step === "alcohol"'
		)
			Chooser(
				:key='4'
				:opts='opts4'
				:theme='"theme-4"'
				:descr='"Выбери предпочитаемый тип алкоголя:"'
				:step='step'
				@nextStep='setStep'
			)
		.step(
			v-if='step === "recipe"'
		)
			Recipe

</template>

<script>
import Chooser from "@/components/chooser/chooser";
import Recipe from "@/components/recipe/recipe";
import choosers from "@/assets/data/choosers.js";
export default {
	name: "App",
	components: { Chooser, Recipe },
	data: () => ({
		step: 'quantity', // quantity volume taste alcohol recipe
		opts1: choosers.c1,
		opts2: choosers.c2,
		opts3: choosers.c3,
		opts4: choosers.c4,
	}),
	methods: {
		setStep (step) {
			this.step = step
		}
	}
};
</script>

<style lang="scss">
@import "src/assets/styles/style.scss";
</style>
