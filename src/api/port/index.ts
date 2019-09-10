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
//更新试题
export const update="/exam/questions/update"
//添加试题
export const addQuestions="/exam/questions"



//获取已经分配教室的班级
export const getmangergrade = '/manger/grade'
//获取全部教室
export const getmangerroom = '/manger/room'

//获取所有没有分班的学生接口
export const getmangerstudentnew = '/manger/student/new'
//获取所有的课程
export const getexamsubject = '/exam/subject'

//获取所有已经分班的学生的接口
export const getmangerstudent = '/manger/student'

//删除学生接口
export const deletemangerstudent = '/manger/student/'

//展示用户数据
export const showUser="/user/user"  
//展示身份数据
export const showIdentity="/user/identity"
//添加api接口权限  
export const authorityApi="/user/api_authority"
//展示身份和api权限关系
export const identity_api_authority_relation="/user/identity_api_authority_relation"
//获取视图权限数据
export const view_authority="/user/view_authority"
//展示身份和视图权限关系
export const identity_view_authority_relation="/user/identity_view_authority_relation"






//添加教室号接口
export const addmangerroom = '/manger/room'
//删除教室号接口
export const deletemangerroom = '/manger/room/delete'
//添加班级接口
export const addmangergrade = '/manger/grade'
//更新班级信息
export const mangergradeupdate = '/manger/grade/update'
//删除班级接口
export const deletemangergrade = '/manger/grade/delete'



//获取考试类型
export const getexamType = '/exam/examType'

//获取试卷列表
export const getexamList = '/exam/exam'


//获取用户展示页面数据
export const getShowUserdata = '/user'
