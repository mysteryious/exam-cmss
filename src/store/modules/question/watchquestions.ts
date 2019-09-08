import { observable, action } from "mobx"
import { getSubject, getExamType, getQuestionsType, getQuestions } from "@/api/index"


/**
 * @class watchquestions
 * getSubject 获取课程类型
 * getExamType 获取考试类型
 * getQuestionsType  获取考试题目类型
 * getQuestions 获取所有的试题
 */


class watchquestions {

  @action async getSubject(params: any): Promise<any> {
    let result: any = await getSubject();
    return result
  }

  @action async getExamType(): Promise<any> {
    let result: any = await getExamType();
    return result
  }
  @action async getQuestionsType (): Promise<any> {
    let result: any = await getQuestionsType();
    return result
  }
  @action async getQuestions(): Promise<any> {
    let result: any = await getQuestions();
    console.log(result)
    return result
  }
}

export default watchquestions
