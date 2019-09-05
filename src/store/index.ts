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