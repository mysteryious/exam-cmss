import * as React from "react";
import { Form, Button, Input, Select, Radio } from "antd";
import "@/styles/user/adduser.css";
const { Option } = Select;
class Add extends React.Component {
  state = {
    size: "large"
  };
  handleSizeChange = (e: any) => {
    this.setState({ size: e.target.value });
  };
  public render() {
    const { size } = this.state;
    return (
      <div className="add">
        <h3>添加用户</h3>
        <div className="content">
          <Form className="wrap">
            <Form.Item className="wrap_item zxy">
              <div className="tits">
                <Radio.Group value={size} onChange={this.handleSizeChange}>
                  <Radio.Button value="large">添加用户</Radio.Button>
                  <Radio.Button value="default">更新用户</Radio.Button>
                </Radio.Group>
              </div>
              <div className={size==="large" ? 'show':'hide'}>
                <div>
                  <Input placeholder="请输入用户名" />
                  <Input placeholder="请输入密码" />
                  <Select placeholder="请选择身份id" style={{ width: 180 }}>
                    <Option value="管理员">管理员</Option>
                    <Option value="出题者">出题者</Option>
                    <Option value="浏览者">管理员</Option>
                  </Select>
                </div>
                <div className="btns">
                  <Button className="sure">确定</Button>
                  <Button className="reset" htmlType="reset">
                    重置
                  </Button>
                </div>
              </div>

              <div className={size==="default" ? 'show':'hide'}>
                <div>
                  
                  <Select placeholder="请选择身份id" style={{ width: 180 }}>
                    <Option value="zhaoxiaoru">zhaoxiaoru</Option>
                    <Option value="liuyu">liuyu</Option>
                    <Option value="yihang">yihang</Option>
                  </Select>
                  <Input placeholder="请输入用户名" />
                  <Input placeholder="请输入密码" />
                  <Select placeholder="请选择身份id" style={{ width: 180 }}>
                    <Option value="管理员">管理员</Option>
                    <Option value="出题者">出题者</Option>
                    <Option value="浏览者">管理员</Option>
                  </Select>
                </div>
                <div className="btns">
                  <Button className="sure">确定</Button>
                  <Button className="reset" htmlType="reset">
                    重置
                  </Button>
                </div>
              </div>
            </Form.Item>

            <Form.Item className="wrap_item">
              <div className="tits">
                <p className="active">添加身份</p>
              </div>
              <div>
                <Input placeholder="请输入身份名称" />
              </div>
              <div className="item_box">
                <div className="btns">
                  <Button className="sure">确定</Button>
                  <Button className="reset">重置</Button>
                </div>
              </div>
            </Form.Item>

            <Form.Item className="wrap_item">
              <div className="tits">
                <p className="active">添加api接口权限</p>
              </div>
              <div>
                <Input placeholder="请输入api接口权限名称" />
                <Input placeholder="请输入api接口权限url" />
                <Input placeholder="请输入api接口权限方法" />
              </div>
              <div className="item_box">
                <div className="btns">
                  <Button className="sure">确定</Button>
                  <Button className="reset">重置</Button>
                </div>
              </div>
            </Form.Item>

            <Form.Item className="wrap_item">
              <div className="tits">
                <p className="active">添加视图接口权限</p>
              </div>
              <div>
                <Select placeholder="请选择已有视图" style={{ width: 180 }}>
                  <Option value="管理员">管理员</Option>
                  <Option value="出题者">出题者</Option>
                  <Option value="浏览者">管理员</Option>
                </Select>
              </div>
              <div className="item_box">
                <div className="btns">
                  <Button className="sure">确定</Button>
                  <Button className="reset">重置</Button>
                </div>
              </div>
            </Form.Item>

            <Form.Item className="wrap_item">
              <div className="tits">
                <p className="active">给身份设置api接口权限</p>
              </div>
              <div>
                <Select placeholder="请选择身份id" style={{ width: 180 }}>
                  <Option value="管理员">管理员</Option>
                  <Option value="出题者">出题者</Option>
                  <Option value="浏览者">管理员</Option>
                </Select>
              </div>
              <div>
                <Select
                  placeholder="请选择api接口权限id"
                  style={{ width: 180 }}
                >
                  <Option value="管理员">管理员</Option>
                  <Option value="出题者">出题者</Option>
                  <Option value="浏览者">管理员</Option>
                </Select>
              </div>
              <div className="item_box">
                <div className="btns">
                  <Button className="sure">确定</Button>
                  <Button className="reset">重置</Button>
                </div>
              </div>
            </Form.Item>
            <Form.Item className="wrap_item">
              <div className="tits">
                <p className="active">给身份设置视图权限</p>
              </div>
              <div>
                <Select placeholder="请选择身份id" style={{ width: 180 }}>
                  <Option value="管理员">管理员</Option>
                  <Option value="出题者">出题者</Option>
                  <Option value="浏览者">管理员</Option>
                </Select>
              </div>
              <div>
                <Select placeholder="请选择视图权限id" style={{ width: 180 }}>
                  <Option value="管理员">管理员</Option>
                  <Option value="出题者">出题者</Option>
                  <Option value="浏览者">管理员</Option>
                </Select>
              </div>
              <div className="item_box">
                <div className="btns">
                  <Button className="sure">确定</Button>
                  <Button className="reset">重置</Button>
                </div>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Add;
