import * as React from "react"
import { inject, observer } from "mobx-react"
import { FormComponentProps } from "antd/lib/form/Form"
import { Radio } from 'antd';
import {injectIntl} from "react-intl"
import "@/styles/user/adduser.css"

let tabs = [
  {
    id: 1,
    tab: "添加用户",
    user_name: '请输入用户名',
    user_pwd: '请输入密码',
    identity_id: []
  },
  {
    id: 2,
    tab: "更新用户",
    user_id: [],
    user_name: '请输入用户名',
    user_pwd: '请输入密码',
    identity_id: []
  }
]

interface PropInto {
  showuser: any,
  intl:any
}


@inject("question")
@observer


class questionsType extends React.Component<PropInto>{
  constructor(props: any) {
    super(props);
  }

  state = {
    dataSource: [],
    formLayout: 'horizontal'
  }

  public handleFormLayoutChange = (e: { target: any }) => {
    this.setState({ formLayout: e.target.value });
  };


  public onChange(e: { target: any }) {
    console.log(`radio checked:${e.target.value}`);
  }

  public render() {
    const { dataSource, formLayout } = this.state
    const {formatMessage}=this.props.intl
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
        : null;
    const buttonItemLayout =
      formLayout === 'horizontal'
        ? {
          wrapperCol: { span: 14, offset: 4 },
        }
        : null;

    return (
      <div className="adduser">
        <header>
          <h2 className="logo-title">{formatMessage({id:"menu.user.addUser"})}</h2>
        </header>

        <div className='adduser-main' style={{ marginBottom: '20px', background: '#fff' }}>

          <div className="main-item">
            <Radio.Group onChange={this.onChange} defaultValue="a">
              <Radio.Button value="a">添加用户</Radio.Button>
              <Radio.Button value="b">更新用户</Radio.Button>
            </Radio.Group>
          </div>

          <div className="main-item">
            <Radio.Button>添加身份</Radio.Button>
          </div>
          <div className="main-item">
            <Radio.Button>添加api接口权限</Radio.Button>
          </div>
          <div className="main-item">
            <Radio.Button>添加视图接口权限</Radio.Button>
          </div>
          <div className="main-item">
            <Radio.Button>给身份设置api接口权限</Radio.Button>
          </div>
          <div className="main-item">
            <Radio.Button>给身份设置视图权限</Radio.Button>
          </div>

        </div>


      </div>
    )
  }
}

export default injectIntl(questionsType)
