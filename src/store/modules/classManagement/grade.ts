import { observable, action } from "mobx"
import {getmangergrade} from "@/api/index"


class grade {
     // 获取已经分配教室的班级
     @action async getmangergrade(params: any): Promise<any>{
      let result: any = await getmangergrade();
      return result
  }
}

export default grade
  