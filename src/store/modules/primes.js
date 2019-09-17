const API = process.env.VUE_APP_PRIMES_API;
const actions = {
  async getPrimes() {
    const primesResult = await fetch(API);
    const primes = await primesResult.text();
    return primes;
  },
};

const mutations = {};

const getters = {};

const state = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
