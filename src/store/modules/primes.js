const actions = {
  async getPrimes({ state, commit }) {
    if (state.primes.length === 0) {
      const primesResult = await fetch('http://192.168.0.119:3000');
      const primes = await primesResult.text();
      return primes;
    }
  },
};

const mutations = {
  setPrimes(state, payload) {
    state.primes = payload;
  },
};

const getters = {};

const state = {
  primes: '',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
