import { observable, action } from "mobx"
import { getQuestion, insertQuestionsType ,questionDetail} from "@/api/index"


class question {
  // 按条件获取试题
  @action async getQuestion(params: any): Promise<any> {
    let result: any = await getQuestion(params);
    return result
  }

  //添加试题分类
  @action async insertQuestionsType(params:any): Promise<any> {
    let result: any = await insertQuestionsType(params);
    return result
  }

  //获取试题详情
  @action async questionDetail(params:any): Promise<any> {
    let result: any = await questionDetail(params);
    return result
  }
}

export default question
