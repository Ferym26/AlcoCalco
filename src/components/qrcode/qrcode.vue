<template lang='pug'>
	QrcodeVue(
		:value="url"
		:size="size" 
		level="H"
	)
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
	name: 'Qrcode',
	props: {
		url: {
			type: String,
			default: '',
		}
	},
	components: {
		QrcodeVue,
	},
	data () {
		return {
			size: 339,
		}
	}
}
</script>
