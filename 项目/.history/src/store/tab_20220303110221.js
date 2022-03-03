export default {
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: '/Welcome',
                name: 'Welcome',
                label: '首页'
            }
        ],
        currentMenu: null
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse =! state.isCollapse
        },
        selectMenu(state, val){
            if(val.name !== 'Welcome') {
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if(result === -1){
                    state.tabsList.push(val)
                }else {
                    state.currentMenu = null
                }
            }
        }
    }
}

const state