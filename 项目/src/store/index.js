import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

import user from "./user";
import contain from "./contain";

export default new Vuex.Store({
   modules:{
       user,
       contain
   }
});