import { observable, action } from "mobx"
import { showUser, showIdentity, authorityApi, identity_api_authority_relation, view_authority, identity_view_authority_relation } from "../../../api/user"


class showuser {
  //用户展示
  @action async showUser(): Promise<object> {
    const result: any = await showUser();
    return { ...result }
  }
  //展示身份数据
  @action async showIdentity(): Promise<object> {
    const result: any = await showIdentity();
    return result.data
  }
  //添加api接口权限
  @action async authorityApi(): Promise<object> {
    const result: any = await authorityApi();
    return result.data
  }
  //展示身份和api权限关系
  @action async identity_api_authority_relation(): Promise<object> {
    const result: any = await identity_api_authority_relation();
    return result.data
  }
  //获取视图权限数据
  @action async view_authority(): Promise<object> {
    const result: any = await view_authority();
    return result.data
  }
  //展示身份和视图权限关系
  @action async identity_view_authority_relation(): Promise<object> {
    const result: any = await identity_view_authority_relation();
    return result.data
  }
}
export default showuser
