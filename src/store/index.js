import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import Primes from './modules/primes';
import Control from './modules/control';

const vuexPersist = new VuexPersist({
  key: 'ulam',
  storage: localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Primes,
    Control,
  },
  plugins: [vuexPersist.plugin],
});
