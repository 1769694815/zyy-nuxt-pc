import Vue from 'vue'
import VDistpicker from 'v-distpicker'

export default () => {
	Vue.use(VDistpicker)
	Vue.component('v-distpicker', VDistpicker)
}