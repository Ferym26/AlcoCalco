import { mapActions } from 'vuex';

const reset = {
	data () {
		return {
			autoResetTime: 2, //minutes
			timer: null,
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
			const _this = this;
			document.addEventListener('mousemove', resetTimer);
			document.addEventListener('keypress', resetTimer);
			document.addEventListener('scroll', resetTimer);
			document.addEventListener('click', resetTimer);
			function resetTimer() {
				clearInterval(_this.timer);
				_this.timer = setTimeout(() => {
					_this.reset();
				}, 60000 * _this.autoResetTime)
			}
			resetTimer();
		},
	},
}

export default reset;
