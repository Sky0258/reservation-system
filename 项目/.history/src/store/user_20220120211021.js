import { Promise } from "core-js";
import { reqUserRegister } from "../api";
const state = {};
const mutations = {};
const actions = {
    async userRegister({ commit },user){
       let result = await reqUserRegister(user);
    //    if(result.code == 200){
    //        return 'ok';
    //    }else{
    //        return Promise.reject(new Error('faile'));
    //    }
    console(result);
    }
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}