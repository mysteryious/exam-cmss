import { getToken } from "@/utils/cookie"
import store from "@/store/index"

function guard(history: any) {
  //判断是否存在登录态还用不用登录
  beforeEach(history)
  //每一天跳转路由请求数据都要判断是否有登录态
  const unListen = history.listen((location: object) => {
    beforeEach(history)
  })
}
const beforeEach = async (history: any) => {
  //判断是否登录
  if (getToken()) {
    //登录成功后获取权限信息
    let userInfo: any = await store.user.userInfo;
    if (!Object.keys(userInfo).length) {
      userInfo = await store.user.getUserInfo();
    }
  } else {
    // 去登陆页面
    history.replace('/login');
  }
}

export const filterView = async (RouteConfig: object[]) => {
  //后台的路由表
  let viewAutority = await store.user.getViewAuthority();
  console.log(viewAutority)
  const forbiddenView: object[] = [];

  function func(RouteConfig: object[], viewAutority: object[]) {
    const routes: object[] = [];
    RouteConfig.forEach((item: any) => {
      if (item.children) {
        item.children = func(item.children, viewAutority);
      }

      if (item.view_id) {
        let itemIndev = viewAutority.findIndex((value: any) => value.view_id === item.view_id);
        // console.log(item, itemIndev)
        if (itemIndev != -1) {
          routes.push(item)
        } else {
          //如果不对的话，就到404  找不到文件
          forbiddenView.push({ path: item.path, redirect: '/404' });
        }
      } else {
        console.log(item)
        routes.push(item)
      }
    })
    return routes
  }
  let routes = func(RouteConfig, viewAutority);
  console.log('routes...', routes, 'forbiddenView...', forbiddenView);
  return forbiddenView.concat(routes);
}



// const forbiddenView: object[] = [];

// function func(originRoutes: object[], viewAutority: object[]): object[]{
//     const routes: object[] = [];
//     originRoutes.forEach(({...item}:any)=>{
//         if (item.children){
//             item.children = func(item.children, viewAutority);
//         }

//         if(item.view_id){
//             console.log('item...', item);
//             if (viewAutority.findIndex((value: any)=>value.view_id === item.view_id) !== -1){
//                 routes.push(item);
//             }else{
//                 forbiddenView.push({from:item.path, to: '/403'});
//             }
//         }else{
//             routes.push(item);
//         }
//     })
//     return routes;
// }


// let routes = func(originRoutes, viewAutority);
// console.log('routes...', routes, 'forbiddenView...', forbiddenView);
//   // return forbiddenView.concat(routes);
//   return viewAutority
// }

export default guard