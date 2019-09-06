import { observable, action } from "mobx"
import {getmangergrade,getexamsubject,getmangerstudentnew,addmangergrade} from "@/api/index"


class grade {
  // 获取已经分配教室的班级
  @action async getmangergrade(params: any): Promise<any>{
    let result: any = await getmangergrade();
    return result
  }
  // 获取所有的课程
  @action async getexamsubject(params: any): Promise<any>{
    let result: any = await getexamsubject();
    return result
  }

  //获取没有分配教室的班级
  @action async getmangerstudentnew(params: any): Promise<any>{
    let result: any = await getmangerstudentnew();
    return result
  }

  //添加添加班级接口
  @action async addmangergrade(params: any): Promise<any>{
    let result: any = await addmangergrade(params);
    return result
  }
}  

export default grade
  