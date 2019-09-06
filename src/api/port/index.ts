//老师的登录接口
export const Userlogin='/user/login'
// 获取试题
export const getQuestion='/exam/getQuestionsType'

// 获取课程安排
export const getSubject = '/exam/subject'

// 获取考试类型
export const getExamType = '/exam/examType'

//获取考试题目类型
export const getQuestionsType = '/exam/getQuestionsType'

// 添加试题类型
export const insertQuestionsType="/exam/insertQuestionsType"
  
//用于获取所有的试题
export const getQuestions="/exam/questions/new"

//用于获取某个试题详情
export const questionDetail="/exam/questions/condition"


//获取已经分配教室的班级
export const getmangergrade = '/manger/grade'

//获取全部教室
export const getmangerroom = '/manger/room'

//获取没有分配教室的班级
export const getmangerstudentnew = '/manger/student/new'

//获取所有的课程
export const getexamsubject = '/exam/subject'



//添加教室号接口
export const addmangerroom = '/manger/room'

//删除教室号接口
export const deletemangerroom = '/manger/room/delete'


//添加班级接口
export const addmangergrade = '/manger/grade'