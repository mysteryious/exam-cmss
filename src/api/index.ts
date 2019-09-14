import * as port from "./port/index"
import request from "../utils/request"





// 获取试题
export let getQuestion = (params: object) => {
  return request.get(port.getQuestion, { params });
}
// 获取课程安排
export let getSubject = () => {
  return request.get(port.getSubject);
}
// 获取考试类型
export let getExamType = () => {
  return request.get(port.getExamType);
}
// 获取考试题目类型
export let getQuestionsType = () => {
  return request.get(port.getQuestionsType);
}
// 添加试题类型
export let insertQuestionsType = (params: object) => {
  return request.get(port.insertQuestionsType, { params });
}
//获取所有的试题
export let getQuestions = () => {
  return request.get(port.getQuestions)
}
//用于获取某个试题详情
export let questionDetail = (params: object) => {
  return request.get(port.questionDetail, { params })
}
//更新试题
export let updateQuestion = (params: object) => {
  return request.put(port.update, params)
}
//添加试题
export let addingQuestions = (params: object) => {
  return request.post(port.addQuestions, params)
}







//获取班级管理
export let getmangergrade = () => {
  return request.get(port.getmangergrade);
}
//获取教室管理
export let getmangerroom = () => {
  return request.get(port.getmangerroom);
}
//获取没有分配教室的班级
export let getmangerstudentnew = () => {
  return request.get(port.getmangerstudentnew);
}
//获取所有的课程
export let getexamsubject = () => {
  return request.get(port.getexamsubject);
}

//删除学生接口
export let deletemangerstudent = (params: object) => {
  return request.delete(port.deletemangerstudent + params);
}





//添加教室号接口
export let addmangerroom = (params: object) => {  
  return request.post(port.addmangerroom, params);
}
//删除教室号接口
export let deletemangerroom = (params: object) => {
  return request.delete(port.deletemangerroom, { data: params });
}
//添加班级接口
export let addmangergrade = (params: object) => {
  return request.post(port.addmangergrade, params);
}
//更新班级信息
export let mangergradeupdate = (params: object) => {
  return request.put(port.mangergradeupdate, params);
}
//删除班级接口
export let deletemangergrade = (params: object) => {
  return request.delete(port.deletemangergrade, { data: params });
}
//获取考试类型
export let getexamType = () => {
  return request.get(port.getexamType);
}

//获取所有已经分班的学生的接口
export let getmangerstudent = () => {
  return request.get(port.getmangerstudent);
}

//获取试卷列表
export let getexamList = ()=>{
  return request.get(port.getexamList);
}
//获取试卷详情
export let examDetail=(params:any)=>{
  return request.get(`/exam/exam/${params}`);
}

//创建试卷
export let setexamList = (params:any)=>{
  return request.post(port.getexamList,params);
}