import * as React from "react"
import { inject, observer } from "mobx-react"
import { Layout, Input, Button, Form, Select } from 'antd'
import { FormComponentProps } from "antd/lib/form/Form";
import Editor from 'for-editor'
import "@/styles/question/addQuestions.css"

interface PropInto {
  question: any,
  match: any,
  form: any,
  watchquestions: any,
}

@inject("watchquestions")
@observer


class addQuestions extends React.Component<PropInto>{
  constructor(props: any) {
    super(props);
  }

  state = {
    dataSource: [],
    value: '请输入题目标题,不操过20个字',
    question: '请输入内容...',
    examType: [],
    questionsType: [],
    subject:[]
  }
  handleChange = (value: string) => {
    this.setState({
      value
    })
  }
  handleChangeQuestion = (question: string) => {
    this.setState({
      question
    })
  }

  //保存题干的值
  public onChange = (e: { target: any }) => {
    this.setState({
      value: e.target.value
    });
  };

  public getList = async () => {
    //获取课程类型
    const subject = await this.props.watchquestions.getSubject();
    //获取考试类型
    const examType = await this.props.watchquestions.getExamType();
    //获取考试题目类型
    const questionsType = await this.props.watchquestions.getQuestionsType();

    this.setState({
      subject: subject.data,
      examType: examType.data,
      questionsType: questionsType.data
    })
  }

  public componentDidMount() {
    //获取数据
    this.getList()
  }

  public handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        //老师登录接口
      }
    });
  };

  public render() {
    const { subject, examType, questionsType, dataSource, value, question } = this.state

    return (
      <div className="question">
        <header>
          <h2 className="question-title">添加试题</h2>
        </header>

        <div className='main' style={{ marginBottom: '20px', background: '#fff' }}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              <h3>题目信息</h3>
              <p>题干</p>
              <Input placeholder="请输入题目标题,不超过20个字" value={value} className="style_input" onChange={this.onChange} />
            </Form.Item>

            <Form.Item>
              <div >
                <p> 题目主题</p>
                <div className="editorItem">
                  <Editor value={question} style={{ height: "600px" }} onChange={this.handleChange.bind(this)} />
                </div>
              </div>
            </Form.Item>

            <Form.Item>
              <div >
                <p>请选择考试类型</p>
                <Select defaultValue="周考一" style={{ width: 120 }} >
                  {examType && examType.map((item: any, index: number) => {
                    return <Select.Option key={index}>{item.exam_name}</Select.Option>
                  })}
                </Select>
                <p>请选择课程类型</p>
                <Select defaultValue="javaScript上" style={{ width: 120 }} >
                  {subject && subject.map((item: any, index: number) => {
                    return <Select.Option key={index}>{item.subject_text}</Select.Option>
                  })}
                </Select>
                <p>请选择题目类型</p>
                <Select defaultValue="简答题" style={{ width: 120 }} >
                  {questionsType && questionsType.map((item: any, index: number) => {
                  return <Select.Option key={index}>{item.questions_type_text}</Select.Option>
                })}
                </Select>
              </div>
            </Form.Item>

            <Form.Item>
              <div >
                <h2>答案信息</h2>
                <div className="editorItem">
                  <Editor value={question} style={{ height: "600px" }} onChange={this.handleChange.bind(this)} />
                </div>
              </div>
            </Form.Item>

            <Button type='primary' htmlType="submit">
              提交
					  </Button>
          </Form>

        </div>
      </div>
    )
  }
}

export default addQuestions
