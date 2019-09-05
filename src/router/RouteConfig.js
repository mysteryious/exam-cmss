import React from "react";

const RouteConfig = [
  {
    component: React.lazy(() => import("@/views/main/home")),
    path: "/main",
    children: [
      {//试题分类
        component: React.lazy(() => import("@/views/main/question/questionsType")),
        path: "/main/questionsType",
      },
      {//查看试题
        component: React.lazy(() => import("@/views/main/question/watchQuestions")),
        path: "/main/watchQuestions",
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
    path: "/",
    redirect: "/login"
  }
];

export default RouteConfig;
