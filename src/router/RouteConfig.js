
import React from "react";

const RouteConfig = [
  {
    component: React.lazy(() => import("@/views/main/home")),
    path: "/main",
    view_id: "main",
    children: [
      {//添加试题
        component: React.lazy(() => import("@/views/main/question/addQuestions")),
        path: "/main/addQuestions",
        view_id: "main-addQuestions"
      },
      {//试题分类
        component: React.lazy(() => import("@/views/main/question/questionsType")),
        path: "/main/questionsType",
        view_id: "main-questionsType"
      },
      {//查看试题
        component: React.lazy(() => import("@/views/main/question/watchQuestions")),
        path: "/main/watchQuestions",
        view_id: "main-watchQuestions"
      },
      {//查看试题详情
        component: React.lazy(() => import("@/views/main/question/questionDetail")),
        path: "/main/question/detail/:id",
      },

      {//添加用户
        component: React.lazy(() => import("@/views/main/user/addUser")),
        path: "/main/addUser",
        view_id: "main-addUser"
      },
      {//用户展示
        component: React.lazy(() => import("@/views/main/user/showUser")),
        path: "/main/showUser",
        view_id: "main-showUser"
      },

      
      {//班级管理
        component: React.lazy(() => import("@/views/main/classManagement/grade")),
        path: "/main/grade",
        view_id: "main-grade"
      },
      {//教室管理
        component: React.lazy(() => import("@/views/main/classManagement/room")),
        path: "/main/room",
        view_id: "main-room"
      },
      {//学生管理
        component: React.lazy(() => import("@/views/main/classManagement/student")),
        path: "/main/student",
        view_id: "main-student"
      },
      {//添加考试
        component: React.lazy(() => import("@/views/main/classExam/addExam")),
        path: "/main/addExam",
        view_id: "main-examEdit"
      },
      {//试卷列表
        component: React.lazy(() => import("@/views/main/classExam/examList")),
        path: "/main/examList",
        view_id: "main-examList"
      },
      {//试卷列表
        component: React.lazy(() => import("@/views/main/vip/vip")),
        path: "/main/vip",
        view_id: "main-examPaperClassmate"
      },
      {
        path: "/main",
        redirect: "/main/questionsType"
      }
    ]
  },
  {
    component: React.lazy(() => import("@/views/login/index")),
    path: "/login"
  },
  {
    component: () => <div>403</div>,
    path: '/403',
  },
  {
    component: () => <div>404</div>,
    path: '/404'
  },
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: '*',
    redirect: '/404'
  }
];

export default RouteConfig;
