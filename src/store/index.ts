import User from "./modules/user/user"
import Question from "./modules/question/question"
import Watchquestions from "./modules/question/watchquestions"
import AddQuestions from "./modules/question/addQuestions"


import Showuser from "./modules/user/showuser"
import Grade  from './modules/classManagement/grade'
import Room from './modules/classManagement/room'
import Student from './modules/classManagement/student'
import Exam from './modules/classExam/addExam'
import ExamList from './modules/classExam/examList'

const user=new User()
const question=new Question()
const watchquestions=new Watchquestions()
const addQuestions=new AddQuestions()

const showuser=new Showuser()
const grade = new Grade()
const room = new Room() 
const student = new Student()
const exam = new Exam()
const examlist = new ExamList()

export default {
  user,
  question,
  watchquestions,
  addQuestions,
  showuser,
  grade,
  room,
  student,  
  exam,
  examlist
}
  