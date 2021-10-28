import Vue from "vue";
import Vuex from "vuex";
import logic from "@/assets/data/logic.js";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		options: {
			quantity: 0,
			volume: 0,
			taste: null,
			alcohol: null,
		},
		selectedGroup: {},
		backBtnVisible: true,
		sequence: {
			quantity: false,
			volume: false,
			taste: false,
			alcohol: false,
		},
		confirmationPopupVisibility: false,
	},
	getters: {
		getSelectedGroup (state) {
			return state.selectedGroup;
		},
		getOptions (state) {
			return state.options;
		},
		getBackBtnVisible (state) {
			return state.backBtnVisible;
		},
		getSequence (state) {
			return state.sequence;
		},
		getConfirmationPopupVisibility (state) {
			return state.confirmationPopupVisibility;
		},
	},
	mutations: {
		setSelectedGroup (state, payload) {
			state.selectedGroup = payload;
		},
		setOptions (state, payload) {
			const key = Object.keys(payload);
			state.options[key[0]] = payload[key[0]];
		},
		setResetOptions (state, payload) {
			state.options = payload;
		},
		setOption (state, payload) {
			state.options[payload.key] = payload.value;
		},
		setBackBtnVisible (state, payload) {
			state.backBtnVisible = payload;
		},
		setSequence (state, payload) {
			const key = Object.keys(payload);
			state.sequence[key[0]] = payload[key[0]];
		},
		setConfirmationPopupVisibility (state, payload) {
			state.confirmationPopupVisibility = payload;
		}
	},
	actions: {
		calcGroup ({ commit }, id) {
			commit('setSelectedGroup', logic[`group${id}`])
		},
		addOptions ({ commit }, obj) {
			commit('setOptions', obj);
		},
		resetOptions ({ commit }) {
			const defaultOptions = {
				quantity: 0,
				volume: 0,
				taste: null,
				alcohol: null,
			};
			commit('setResetOptions', defaultOptions)
		},
		addSequence ({ commit }, obj) {
			commit('setSequence', obj);
		},
	},
});
