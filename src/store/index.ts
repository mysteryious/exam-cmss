import User from "./modules/user/user"
import Global from "./modules/user/global"
import Question from "./modules/question/question"
import Watchquestions from "./modules/question/watchquestions"
import AddQuestions from "./modules/question/addQuestions"


import Showuser from "./modules/user/showuser"
import Grade  from './modules/classManagement/grade'
import Room from './modules/classManagement/room'
import Student from './modules/classManagement/student'
import Exam from './modules/classExam/addExam'

const user=new User()
const global=new Global()
const question=new Question()
const watchquestions=new Watchquestions()
const addQuestions=new AddQuestions()

const showuser=new Showuser()
const grade = new Grade()
const room = new Room() 
const student = new Student()
const exam = new Exam()

export default {
  user,
  global,
  question,
  watchquestions,
  addQuestions,
  showuser,
  grade,
  room,
  student,  
  exam
}
  