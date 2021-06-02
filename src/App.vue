<template lang="pug">
	#app.wrapper
		.step(
			v-if='step === "quantity"'
		)
			Chooser1(
				:key='1'
				:stepName='"quantity"'
				:opts='opts1'
				:theme='"theme-1"'
				:descr='"Для начала выбери количество людей, с которыми ты бы разделил коктейль:"'
				:step='step'
				@nextStep='setStep'
				@setOptions='setStepOption'
			)
		.step(
			v-if='step === "volume"'
		)
			Chooser2(
				:key='2'
				:stepName='"volume"'
				:opts='opts2'
				:theme='"theme-2"'
				:descr='"Выбери уровень громкости посиделки:"'
				:step='step'
				@nextStep='setStep'
				@setOptions='setStepOption'
			)
		.step(
			v-if='step === "taste"'
		)
			Chooser3(
				:key='3'
				:stepName='"taste"'
				:opts='opts3'
				:theme='"theme-3"'
				:descr='"Выбери вкус под свое настроение:"'
				:step='step'
				@nextStep='setStep'
				@setOptions='setStepOption'
				@setAlco='setAlcoList'
			)
		.step(
			v-if='step === "alcohol"'
		)
			Chooser4(
				:key='4'
				:stepName='"alco"'
				:opts='opts4'
				:theme='"theme-4"'
				:descr='"Выбери предпочитаемый тип алкоголя:"'
				:step='step'
				@nextStep='setStep'
				@setOptions='setStepOption'
				@generate='alcoSelector'
			)
		.step(
			v-if='step === "recipe"'
		)
			Recipe(
				:id='cocktail.id'
				:title='cocktail.title'
				:glassImg='cocktail.glassImg'
				:titleMode='cocktail.titleMode'
				:bgImg='cocktail.bgImg'
				:bgColor='cocktail.bgColor'
				:accentColor='cocktail.accentColor'
				:url='cocktail.url'
				:descr='cocktail.descr'
				:article='cocktail.article'
				:taste='cocktail.taste'
			)

</template>

<script>
import Chooser1 from "@/components/chooser/chooser1";
import Chooser2 from "@/components/chooser/chooser2";
import Chooser3 from "@/components/chooser/chooser3";
import Chooser4 from "@/components/chooser/chooser4";
import Recipe from "@/components/recipe/recipe";
import choosers from "@/assets/data/choosers.js";
import cocktails from "@/assets/data/cocktails.js";
export default {
	name: "App",
	components: { 
		Chooser1, 
		Chooser2, 
		Chooser3, 
		Chooser4, 
		Recipe,
	},
	data: () => ({
		step: 'quantity', // quantity volume taste alcohol recipe
		opts1: choosers.c1,
		opts2: choosers.c2,
		opts3: choosers.c3,
		opts4: [],
		cocktail: cocktails['CubaLibre'],
		options: {},
	}),
	methods: {
		setStep (step) {
			this.step = step
		},
		setStepOption (val) {
			this.options = {...this.options, ...val}
		},
		setAlcoList () {
			const _this = this;
			// this.opts4
			// this.options.taste
			// this.choosers.c4
			// кислый - 1 - ром джин виски текила
			// освежающий - 2 - ром джин виски аперитив текила
			// фруктовый - 3 - джин виски аперитив текила
			// сладкий - 4 - ром виски
			// оригинальный - 5 - ром текила
			let alcoArr = [];
			switch(this.options.taste) {
				case 1:
					alcoArr = [2, 3, 4, 5];
					break
				case 2:
					alcoArr = [1, 2, 3, 4, 5];
					break
				case 3:
					alcoArr = [1, 2, 3, 5];
					break
				case 4:
					alcoArr = [4, 5];
					break
				case 5:
					alcoArr = [2, 4];
					break
				default:
					console.error('error');
			}
			alcoArr.forEach((num) => {
				const alco = choosers.c4.filter(item => {
					return item.id === num
				});
				_this.opts4.push(...alco);
			});
			this.step = 'alcohol';
		},
		alcoSelector () {
			
		},
	},
	mounted () {
		//
	}
};
</script>

<style lang="scss">
@import "src/assets/styles/style.scss";
</style>
