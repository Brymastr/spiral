const actions = {
  async getPrimes({ state, commit }) {
    const primesResult = await fetch('http://192.168.0.119:3000');
    const primes = await primesResult.text();
    return primes;
  },
};

const mutations = {};

const getters = {};

const state = {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
