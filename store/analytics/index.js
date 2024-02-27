import Moment from 'moment-timezone'
export const state = () => ({
  lastDate: '29',
  status: '',
  dStartDate: Moment().format('YYYY-MM-DD'),
  dEndDate: Moment().format('YYYY-MM-DD'),
  activeDate: Moment().format('YYYY-MM-DD'),
  statusList: [],
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
  SET_STATUS(state, payload) {
    state.status = payload
  },
  SET_STATUS_LIST(state, payload) {
    state.statusList = payload
  },
  SET_ACTIVE_DATE(state, payload) {
    state.activeDate = payload
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
  setStatus({ commit }, payload) {
    commit('SET_STATUS', payload)
  },
  setStatusList({ commit }, payload) {
    commit('SET_STATUS_LIST', payload)
  },
  setActiveDate({ commit }, payload) {
    commit('SET_ACTIVE_DATE', payload)
  },
}

export const getters = {
  getLastDate: (state) => state.lastDate,
  getStartDate: (state) => state.dStartDate,
  getEndDate: (state) => state.dEndDate,
  getStatus: (state) => state.status,
  getStatusList: (state) => state.statusList,
  getActiveDate: (state) => state.activeDate,
}
