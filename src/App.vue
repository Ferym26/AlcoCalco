<template lang="pug">
	#app.wrapper
		.step(
			v-if='step === "quantity"'
		)
			Chooser1(
				:key='1'
				:stepName='"quantity"'
				:theme='"theme-1"'
				:descr='"Для начала выбери количество людей, с которыми ты бы разделил коктейль"'
				:step='step'
				@nextStep='setStep'
				@firstValue='setFirstValue'
			)
		.step(
			v-if='step === "volume"'
		)
			Chooser2(
				:key='2'
				:stepName='"volume"'
				:theme='"theme-2"'
				:descr='"Выбери уровень громкости посиделки"'
				:step='step'
				@nextStep='setStep'
				@setStep='setStep'
			)
		.step(
			v-if='step === "taste"'
		)
			Chooser3(
				:key='3'
				:stepName='"taste"'
				:theme='"theme-3"'
				:descr='"Выбери вкус под свое настроение"'
				:step='step'
				@nextStep='setStep'
				@setStep='setStep'
			)
		.step(
			v-if='step === "alcohol"'
		)
			Chooser4(
				:key='4'
				:stepName='"alcohol"'
				:theme='"theme-4"'
				:descr='"Выбери предпочитаемый тип алкоголя"'
				:step='step'
				@nextStep='setStep'
				@setStep='setStep'
			)
		.step(
			v-if='step === "recipe"'
		)
			Recipe(
				@setStep='setStep'
			)
		WarningAlco(
			:firstValue='firstValue'
			@nextStep='setStep'
		)
		VideoPlay

</template>

<script>
import Chooser1 from "@/components/chooser/chooser1";
import Chooser2 from "@/components/chooser/chooser2";
import Chooser3 from "@/components/chooser/chooser3";
import Chooser4 from "@/components/chooser/chooser4";
import Recipe from "@/components/recipe/recipe";
import WarningAlco from "@/components/warningAlco/warningAlco";
import VideoPlay from "@/components/videoPlay/videoPlay";
// import choosers from "@/assets/data/choosers.js";
export default {
	name: "App",
	components: {
		Chooser1,
		Chooser2,
		Chooser3,
		Chooser4,
		Recipe,
		WarningAlco,
		VideoPlay,
	},
	data: () => ({
		step: 'quantity', // quantity volume taste alcohol recipe
		firstValue: 0,
	}),
	methods: {
		setStep (step) {
			this.step = step
		},
		setFirstValue (value) {
			this.firstValue = value
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
