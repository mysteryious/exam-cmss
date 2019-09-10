import * as React from "react"
import { Button, Table, Modal, Input } from 'antd';
import { array } from 'prop-types';
import {injectIntl} from "react-intl"
import { inject, observer } from "mobx-react"
import "@/styles/question/question.css"



const columns = [
  {
    title: '类型ID',
    dataIndex: 'questions_type_id',
    key: 'questions_type_id'
  },
  {
    title: '类型名称',
    dataIndex: 'questions_type_text',
    key: 'questions_type_text'
  },
  {
    title: '操作',
    dataIndex: 'questions_type_sort',
    key: 'questions_type_sort'
  }
];



interface PropInto {
  question: any,
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
    visible: false,
    value: ""
  }

  public getList = async () => {
    //获取试题分类的数据
    const result = await this.props.question.getQuestion();

    this.setState({
      dataSource: result.data
    })
  }

  public componentDidMount() {
    //获取数据
    this.getList()
  }


  //点击添加类型弹出提示框
  public showModal = () => {
    this.setState({
      visible: true,
    });
  };

  //点击确定按钮  添加试题类型
  public handleOk = async (e: { preventDefault: () => void }) => {
    const { value, dataSource } = this.state
    const data = await this.props.question.insertQuestionsType({
      text: value,
      sort: dataSource.length+1
    });
    //重新调用请求数据函数
    this.getList()
    //关闭全局提示框
    this.setState({
      visible: false,
    });
  };


  //输入框的onchange事件  保存输入框的value
  public onChange = (e: { target: any }) => {
    this.setState({
      value: e.target.value
    });
  };

  //点击取消按钮  关闭全局提示框
  public handleCancel = (e: { preventDefault: () => void }) => {
    this.setState({
      visible: false,
    });
  };


  public render() {
    const { dataSource, value } = this.state
    const {formatMessage}=this.props.intl
    return (
      <div className="question">
        <header>
          <h2 className="logo-title">{formatMessage({id:"menu.question.questionsType"})}</h2>
        </header>
        <div className='main' style={{ marginBottom: '20px', background: '#fff' }}>
          <Button type='primary' icon='plus' onClick={this.showModal}>
            添加类型
					</Button>
          <Table columns={columns} dataSource={dataSource} pagination={false} rowKey="questions_type_sort"/>
        </div>

        <div className="dialog">
          <Modal
            title="创建新类型"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            cancelText="取消"
            okText="确定"
          >
            <Input placeholder="请输入类型名称" value={value} className="style_input" onChange={this.onChange} />
          </Modal>
        </div>
      </div>
    )
  }
}

export default injectIntl(questionsType)
