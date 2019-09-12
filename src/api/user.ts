import * as port from "./port/index"
import request from "../utils/request"


//用户登录
export let userLogin = (params: object) => {
    console.log(params)
    return request.post(port.Userlogin, params)  
}
// 获取用户信息
export let getUserInfo = () => {
    return request.get(port.userInfo);
}  
// 获取用户权限
export let getViewAuthority = ()=>{
    return request.get(port.getViewAuthority);
}
// 更新用户信息
export let updateUser = (params: object)=>{
    console.log(params)
    return request.put(port.updateUser,params);
}



//用户展示
export let showUser = () => {
    return request.get(port.showUser);
}
//展示身份数据
export let showIdentity = () => {
    return request.get(port.showIdentity);
}
//添加api接口权限
export let authorityApi = () => {
    return request.get(port.authorityApi);
}
//展示身份和api权限关系
export let identity_api_authority_relation = () => {
    return request.get(port.identity_api_authority_relation);
}
//获取视图权限数据
export let view_authority = () => {
    return request.get(port.view_authority);
}

//展示身份和视图权限关系
export let identity_view_authority_relation = () => {
    return request.get(port.identity_view_authority_relation);
}


//获取用户展示页面数据
export let getShowUserdata = (params:object)=>{
    return request.get(port.getShowUserdata+""+params);
  }