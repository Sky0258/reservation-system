import { reqUserRegister } from "../api";
const state = {};
const mutations = {};
const actions = {
    userRegister({commit},user){
       let result = await reqUserRegister(user);
    }
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}