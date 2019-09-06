import { observable, action } from "mobx"
import { getSubject, getExamType, getQuestionsType, getQuestions } from "@/api/index"


class watchquestions {
  //获取课程类型
  @action async getSubject(params: any): Promise<any> {
    let result: any = await getSubject();
    return result
  }
  //获取考试类型
  @action async getExamType(): Promise<any> {
    let result: any = await getExamType();
    return result
  }
  //获取考试题目类型
  @action async getQuestionsType(): Promise<any> {
    let result: any = await getQuestionsType();
    return result
  }
  //获取所有的试题
  @action async getQuestions(): Promise<any> {
    let result: any = await getQuestions();
    return result
  }
}

export default watchquestions
