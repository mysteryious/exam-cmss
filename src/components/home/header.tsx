import * as React from 'react';
import { Breadcrumb, Dropdown, Icon, Layout, Menu, Select } from 'antd';
import { inject, observer } from "mobx-react"


const { SubMenu } = Menu;
const { Option } = Select;
const { Content, Header, Sider } = Layout;
const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        个人中心
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        我的班级
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        设置
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        退出登录
      </a>
    </Menu.Item>
  </Menu>
);

@inject("global")
@observer


class HeaderComponent extends React.Component<any>{
  //用来判断语言
  handleChange = (value: string) => {
    this.props.global.setGlobal(value);
  }


  public render() {
    return (
      <Header className="header">
        <div className="logo" >
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg" alt="" />
        </div>
        <Dropdown className="dropdown" overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            panhuijuan <Icon type="down" />
          </a>
        </Dropdown>

        <Select defaultValue="zh" style={{ width: 120 }} onChange={(value: any) => this.handleChange(value)}>
          <Option value="zh">中文</Option>
          <Option value="en">英文</Option>
        </Select>
      </Header>
    );
  }
}

export default HeaderComponent;
