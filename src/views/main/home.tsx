import { Breadcrumb, Dropdown, Icon, Layout, Menu } from 'antd';
import * as React from 'react';
import "@/styles/home.css"
//引入头部和侧导航组件
import HeaderComponent from "@/components/home/header"
import MenuComponent from "@/components/home/SubMenu"

//用来加载二级路由
import RouteView from "../../router/RouteView"

const { SubMenu } = Menu;
const { Content, Header, Sider } = Layout;



class Home extends React.Component {
  public render() {
    return (
      <Layout>
        {/* 头部导航 */}
        <HeaderComponent></HeaderComponent>

        {/* 侧边导航 */}
        <Layout>
          <Sider width={200}>
            <MenuComponent></MenuComponent>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>

            <Content
              style={{
                margin: 0,
                minHeight: 280,
                padding: 24,
              }}
            >
              {/* 用来加载二级路由 */}
              <RouteView children={this.props.children} />

            </Content>
          </Layout>
        </Layout>
        
      </Layout>
    )
  }
}

export default Home;