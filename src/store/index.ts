import User from "./modules/user/user"
import Question from "./modules/question/question"
import Watchquestions from "./modules/question/watchquestions"
import Showuser from "./modules/user/showuser"
import Grade  from './modules/classManagement/grade'
import Room from './modules/classManagement/room'
import Student from './modules/classManagement/student'
import Exam from './modules/classExam/addExam'

const user=new User()
const question=new Question()
const watchquestions=new Watchquestions()
const showuser=new Showuser()
const grade = new Grade()
const room = new Room() 
const student = new Student()
const exam = new Exam()

export default {
  user,
  question,
  watchquestions,
  showuser,
  grade,
  room,
  student,  
  exam
}
  