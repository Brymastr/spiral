import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import Primes from './modules/primes';
// import AsyncComputed from 'vue-async-computed';
// import appSettings from './modules/appSettings';
// import fiscalDates from './modules/fiscalDates';
// import shortcuts from './modules/shortcuts';
// import user from './modules/user';
// import routing from './modules/routing';
// import systemSync from './modules/systemSync';

const vuexPersist = new VuexPersist({
  key: 'ulam',
  storage: localStorage,
});

Vue.use(Vuex);
// Vue.use(AsyncComputed);

export default new Vuex.Store({
  modules: {
    Primes,
  },
  plugins: [vuexPersist.plugin],
});
