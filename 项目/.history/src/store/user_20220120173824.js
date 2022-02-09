import { reqUserRegister } from "../api";
const state = {};
const mutations = {};
const actions = {
    userRegister({commit},user){
       let result = await reqUserRegister(user);
       console.log(result);
    }
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}