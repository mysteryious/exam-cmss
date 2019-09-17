import { observable, action } from "mobx"
import { updateQuestion, addingQuestions } from "@/api/index"


class addQuestions {
  //更新试题
  @action async updateQuestion(params: object): Promise<any> {
    let result: any = await updateQuestion(params);
    return result
  }
  //添加试题
  @action async addingQuestions(params: object): Promise<any> {
    let result: any = await addingQuestions(params);
    return result
  }
}

export default addQuestions
