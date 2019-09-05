import * as port from "./port/index"
import request from "../utils/request"



// 获取试题
export let getQuestion = (params: object)=>{
  return request.get(port.getQuestion, {params});
}

// 获取课程安排
export let getSubject = ()=>{
  return request.get(port.getSubject);
}

// 获取考试类型
export let getExamType = ()=>{
  return request.get(port.getExamType);
}

//  获取题目类型
export let getQuestionsType = ()=>{
  return request.get(port.getQuestionsType);
}

// 添加试题类型
export let insertQuestionsType = (params: object)=>{
  return request.get(port.insertQuestionsType,{params});
}
