const actions = {
  setZoom({ commit }, zoom) {
    commit('setZoom', zoom)
  },
  setColor({ commit }, color) {
    commit('setColor', color)
  },
  setStart({ commit }, start) {
    commit('setStart', start)
  },
  setEnd({ commit }, end) {
    commit('setEnd', end)
  },
};

const mutations = {
  setZoom(state, payload) {
    state.zoom = payload;
  },
  setColor(state, payload) {
    state.color = payload;
  },
  setStart(state, payload) {
    state.start = payload;
  },
  setEnd(state, payload) {
    state.end = payload;
  },
};

const getters = {};

const state = {
  zoom: 5,
  start: 1,
  end: 50000,
  color: 'green',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
