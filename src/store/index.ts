<<<<<<< HEAD
import User from "./modules/user/user"
import Question from "./modules/question/question"
import Watchquestions from "./modules/question/watchquestions"

const user=new User()
const question=new Question()
const watchquestions=new Watchquestions()

export default {
  user,
  question,
  watchquestions
}
=======
import User from "./modules/user/user"
import Question from "./modules/question/question"
import Watchquestions from "./modules/question/watchquestions"
import Grade  from './modules/classManagement/grade'
import Room from './modules/classManagement/room'
import Student from './modules/classManagement/student'



const user=new User()
const question=new Question()
const watchquestions=new Watchquestions()
const grade = new Grade()
const room = new Room() 
const student = new Student()

export default {
  user,
  question,
  watchquestions,
  grade,
  room,
  student
} 
>>>>>>> 75de82662435c15033062cbce8cb24df30c0c742
