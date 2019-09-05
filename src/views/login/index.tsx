import { Button, Checkbox, Form, Icon, Input, message } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import * as React from "react";
import { inject, observer } from "mobx-react"
import "@/styles/user/login.css"


interface UserFormProps extends FormComponentProps {
  age: number,
  name: string,
  history: any,
  user: any
}


@inject("user")
@observer

class Login extends React.Component<UserFormProps, any> {
  public state = {};
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { user_name, user_pwd } = this.props.user.account;

    return (
      <div className="login">
        <div className="login-wraper">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("user_name", {
                initialValue: user_name,
                rules: [
                  { required: true, message: "Please input your user_name!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("user_pwd", {
                initialValue: user_pwd,
                rules: [
                  { required: true, message: "Please input your user_pwd!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="user_pwd"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                initialValue: false,
                valuePropName: "checked"
              })(<Checkbox>记住密码</Checkbox>)}
              {getFieldDecorator('autoLogin', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Auto login in 7 days</Checkbox>)}
              <a className="login-form-forgot" href="">
                忘记密码
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登陆
            </Button>
            </Form.Item>

          </Form>
        </div>
      </div>
    );
  }
  public handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        //老师登录接口
        let data = await this.props.user.login(values);
        if (data.code === 1) {
          message.success(data.msg, 3, () => {
            this.props.history.push("/main")
          })
        }
      }
    });
  };
}

export default Form.create()(Login);




