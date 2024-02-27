import Moment from 'moment-timezone'
export const state = () => ({
  lastDate: '29',
  dStartDate: Moment().format('YYYY-MM-DD'),
  dEndDate: Moment().format('YYYY-MM-DD'),
  activeDate: Moment().format('YYYY-MM-DD'),
  isDurationApplied: false,
})
export const mutations = {
  SET_LASTDATE(state, payload) {
    state.lastDate = payload
  },
  SET_STARTDATE(state, payload) {
    state.dStartDate = payload
  },
  SET_ENNDATE(state, payload) {
    state.dEndDate = payload
  },
  SET_ACTIVE_DATE(state, payload) {
    state.activeDate = payload
  },
  SET_IS_DURATION_APPLIED: (state, payload) => {
    state.isDurationApplied = payload
  },
}
export const actions = {
  setLastDate({ commit }, payload) {
    commit('SET_LASTDATE', payload)
  },
  setStartDate({ commit }, payload) {
    commit('SET_STARTDATE', payload)
  },
  setEndDate({ commit }, payload) {
    commit('SET_ENNDATE', payload)
  },
  setActiveDate({ commit }, payload) {
    commit('SET_ACTIVE_DATE', payload)
  },
  setDurationApplied({ commit }, payload) {
    commit('SET_IS_DURATION_APPLIED', payload)
  },
}

export const getters = {
  getLastDate: (state) => state.lastDate,
  getStartDate: (state) => state.dStartDate,
  getEndDate: (state) => state.dEndDate,
  getActiveDate: (state) => state.activeDate,
  getIsDurationApplied: (state) => state.isDurationApplied,
}
