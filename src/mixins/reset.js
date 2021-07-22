import { mapActions } from 'vuex';

const reset = {
	data () {
		return {
			autoResetTime: 2, //minutes
		}
	},
	methods: {
		...mapActions({
			resetOptions: 'resetOptions',
			addSequence: 'addSequence',
		}),
		setStep () {
			//quantity volume taste alcohol recipe
			this.$emit('setStep', 'quantity'); // переход на первый шаг после ожидания
		},
		reset () {
			// this.$store.commit('setBackBtnVisible', true);
			this.addSequence({'quantity': false});
			this.addSequence({'volume': false});
			this.addSequence({'taste': false});
			this.addSequence({'alcohol': false});
			this.resetOptions();
			this.setStep();
		},
		resetByTime () {
			setTimeout(() => {
				this.reset();
			}, 60000 * this.autoResetTime)
		},
	},
}

export default reset;
