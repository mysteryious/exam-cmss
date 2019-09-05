import { Icon, Menu } from 'antd';
import * as React from 'react';
import { NavLink } from "react-router-dom"

const { SubMenu } = Menu;


const menuList = [
  {
    id:1,
    key: "sub1",
    title: "试题管理",
    icon: "sliders",
    child: [
      {
        id: 1,
        title: "添加试题",
        to: "/main/addQuestions"
      },
      {
        id: 2,
        title: "试题分类",
        to: "/main/questionsType",
      },
      {
        id: 2,
        title: "查看试题",
        to: "/main/watchQuestions",
      }
    ]
  },
  {
    id:2,
    key: "sub2",
    title: "用户管理",
    icon: "user",
    child: [
      {
        id: 1,
        title: "添加用户",
        to: "/main/addUser",
      },
      {
        id: 2,
        title: "用户展示",
        to: "/main/showUser",
      }
    ]
  },
  {
    id: 3,
    key: "sub3",
    title: "考试管理",
    icon: "schedule",
    child: [
      {
        id: 1,
        title: "添加考试",
        to: "/main/addExam",
      },
      {
        id: 2,
        title: "试卷列表"
      }
    ]
  },
  {
    id: 4,
    key: "sub4",
    title: "班级管理",
    icon: "project",
    child: [
      {
        id: 1,
        title: "班级管理",
        to: "/main/grade",
      },
      {
        id: 2,
        title: "教室管理",
        to: "/main/room",
      },
      {
        id: 3,
        title: "学生管理",
        to: "/main/student",
      }
    ]
  },
  {
    id: 5,
    key: "sub5",
    title: "阅卷管理",
    icon: "project",
    child: [
      {
        id: 1,
        title: "待批班级"
      }
    ]
  }
]






class MenuComponent extends React.Component {
  public render() {
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {
          menuList && menuList.map((item, index) => {
            return <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  {item.title}
                </span>
              }
            >
              {
                item.child && item.child.map((i, ind) => {
                  return <Menu.Item key={ind}>
                    {i.to ? <NavLink to={i.to}>{i.title}</NavLink> : i.to}
                  </Menu.Item>
                })
              }
            </SubMenu>
          })
        }
      </Menu>
    );
  }
}

export default MenuComponent;
