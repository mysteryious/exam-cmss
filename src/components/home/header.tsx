import * as React from 'react';
import { Dropdown, Icon, Layout, Menu, Select, Avatar, Modal, Upload, message, Form, Input, Tooltip, Cascader, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { inject, observer } from "mobx-react"
import { FormComponentProps } from "antd/lib/form/Form";
import { getUserInfo } from '@/api/user';


const { SubMenu } = Menu;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { Content, Header, Sider } = Layout;


interface UserFormProps extends FormComponentProps {
  global: any,
  user: any,
  history: any
}


function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

@inject("global", "user")
@observer


class HeaderComponent extends React.Component<UserFormProps, any>{
  //弹出框
  showModal = () => {
    console.log("ssksksdsd")
  };

  //用来判断语言
  handleChange = (value: string) => {
    this.props.global.setGlobal(value);
  }

  UploadChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: any) =>
        this.setState({
          imageUrl: info.file.response.data[0].path,
          loading: false,
        })
      );
    }
  };

  getList = async () => {
    //获取用户信息
    const userInfo = await this.props.user.getUserInfo();
    this.setState({ ...userInfo })
  };

  //点击取消按钮
  handleCancel = (e: any) => {
    this.setState({
      visible: false
    });
  };

  state = {
    visible: false,
    loading: false,
    imageUrl: "",
    user_name: "",
    user_id: ""
  }

  componentDidMount() {
    this.getList()
  }


  public render() {
    const menu = (
      <Menu>
        <Menu.Item><a onClick={() => this.setState({ visible: true })}>个人中心</a></Menu.Item>
        <Menu.Item><a>我的班级</a></Menu.Item>
        <Menu.Item><a>设置</a></Menu.Item>
        <Menu.Item><a>退出登录</a></Menu.Item>
      </Menu>
    );
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传头像</div>
      </div>
    );
    const formItemLayout = {
      labelCol: { span: 4, offset: 4 },
      wrapperCol: { span: 12 },
    };
    const { imageUrl, user_name, user_id } = this.state;
    const { avatar } = this.props.user;
    const { getFieldDecorator } = this.props.form;
    return (
      <Header className="header">
        <div className="logo" >
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg" alt="" />
        </div>
        <Dropdown className="dropdown" overlay={menu} >
          <span>
            <Avatar src={avatar} style={{ marginRight: 8 }}></Avatar>
            {user_name ? <span>{user_name}</span> : ""}
          </span>
        </Dropdown>

        <Select defaultValue="zh" style={{ width: 120, float: "right", marginTop: "16px", marginRight: 8 }} onChange={(value: any) => this.handleChange(value)}>
          <Option value="zh">中文</Option>
          <Option value="en">英文</Option>
        </Select>

        <Modal
          title="完善个人信息"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="保存"
        >

          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="用户头像">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://123.206.55.50:11000/upload"
                beforeUpload={beforeUpload}
                onChange={this.UploadChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Form.Item>

            <Form.Item label="用户ID">
              {getFieldDecorator('user_id', {
                initialValue: user_id,
                rules: [
                  {
                    required: true,
                    message: 'Please input your user_id!'
                  }
                ]
              })(<Input disabled={true} />)}
            </Form.Item>

            <Form.Item label="用户名">
              {getFieldDecorator('user_name', {
                initialValue: user_name,
                rules: [
                  {
                    required: true,
                    message: 'Please input your user_name!'
                  }
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="密码">
              {getFieldDecorator('user_pwd', {
                rules: [
                  {
                    validator: (ruler: object[], value: string, callback: any) => {
                      if (value && /^(?![a-z]+$)(?![A-Z]+$)(?!([^(a-zA-Z\!\*\.\#)])+$)^.{8,16}$/.test(value)) {
                        callback();
                      } else if (!value) {
                        callback();
                      } else {
                        callback('Please input valid password!')
                      }
                    }
                  }
                ],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      </Header>
    );
  }
  public handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        const { imageUrl, user_id } = this.state
        const data = await this.props.user.updateUser({
          ...values,
          avatar: imageUrl
        })

        if (data.code === 1) {
          message.success(data.msg, 3, () => {
            this.props.user.getUserInfo();
            this.setState({
              visible: false
            });
          })
        }
      }
    });
  };
}

export default Form.create()(HeaderComponent);
