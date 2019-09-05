import { observable, action } from "mobx"
import {getQuestion} from "@/api/index"


class question {
     // 按条件获取试题
     @action async getQuestion(params: any): Promise<any>{
      let result: any = await getQuestion(params);
      return result
  }
}

export default question
