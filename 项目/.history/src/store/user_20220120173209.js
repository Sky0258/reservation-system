import { reqUserRegister } from "../api";
const state = {};
const mutations = {};
const actions = {
    userRegister({commit},user){
        reqUserRegister(user);
    }
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}