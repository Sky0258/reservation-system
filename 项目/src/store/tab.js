// export default {
//     state: {
//         isCollapse: false,
//         tabsList: [
//             {
//                 path: '/Welcome',
//                 name: 'Welcome',
//                 label: '首页'
//             }
//         ],
//         currentMenu: null
//     },
//     mutations: {
//         collapseMenu(state) {
//             state.isCollapse =! state.isCollapse
//         },
//         selectMenu(state, val){
//             if(val.name !== 'Welcome') {
//                 state.currentMenu = val
//                 const result = state.tabsList.findIndex(item => item.name === val.name)
//                 if(result === -1){
//                     state.tabsList.push(val)
//                 }else {
//                     state.currentMenu = null
//                 }
//             }
//         }
//     }
// }
// export default {
//     state: {
//       menu: [],
//       currentMenu: null,
//       // 管理tag标签数据
//       tabsList: [
//       // tag标签默认标签是首页，且不可删除。
//         {
//           path: '/',
//           name: 'home',
//           label: '首页',
//           icon: 'home'
//         }
//       ]
//     },
//     mutations: {
//       selectMenu(state, val) {
//         // 判断当前菜单name是否为home，如果是则将currentMenu属性设置为null，如果不是则将val赋值给currentMenu属性
//         // val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
//         if (val.name !== 'home') {
//           // 如果点击导航菜单不是home，将用户点击导航菜单对象赋值给currentMenu对象
//           state.currentMenu = val
//           // 如果点击导航菜单不是home，首先遍历tag标签数组tabsList是否已有val中的name，如果有则不再重复添加，没有则添加val到tag标签数组tabsList
//           let result = state.tabsList.findIndex(item => item.name === val.name)
//           result === -1 ? state.tabsList.push(val) : ''
//         } else {
//           state.currentMenu = null
//         }
//       },
//       // 关闭tag标签方法
//       closeTab(state, val) {
//         // 首先判断val要删除的tag标签在tabsList数组中是否存在，如果存在则删除
//         let result = state.tabsList.findIndex(item => item.name === val.name)
//         state.tabsList.splice(result, 1)
//       }
//     },
//     actions: {},
//     modules: {}
//   }
  
  