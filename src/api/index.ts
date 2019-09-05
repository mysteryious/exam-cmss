
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


// 添加试题类型
export let insertQuestionsType = (params: object)=>{
  return request.get(port.insertQuestionsType,{params});
}

// 获取考试类型
export let getQuestionsType = ()=>{
  return request.get(port.getQuestionsType);
}

//获取班级管理
export let getmangergrade = ()=>{
  return request.get(port.getmangergrade);
}

//获取教室管理
export let getmangerroom = ()=>{
  return request.get(port.getmangerroom);
}

//获取没有分配教室的班级
export let getmangerstudentnew = ()=>{
  return request.get(port.getmangerstudentnew);
}