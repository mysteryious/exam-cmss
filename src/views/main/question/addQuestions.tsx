import * as React from "react"
import { inject, observer } from "mobx-react"
import { Layout, Input, Button, Form, Select, Modal, message } from 'antd'
import { FormComponentProps } from "antd/lib/form/Form";
import { getocaltion, removeltion } from "@/utils/login"
import {injectIntl} from "react-intl"
import Editor from 'for-editor'
import "@/styles/question/addQuestions.css"

const { confirm } = Modal;
const url = require('url')
const querystring = require("querystring")



interface PropInto {
  question: any,
  match: any,
  form: any,
  watchquestions: any,
  value: any,
  addQuestions: any,
  history: any,
  intl:any
}

@inject("watchquestions", "question", "addQuestions")
@observer

class addQuestions extends React.Component<PropInto>{
  constructor(props: any) {
    super(props);
  }
  state = {
    examType: [],
    questionsType: [],
    subject: [],
    title: '请输入题目标题,不操过20个字',
    questions_stem: '请输入内容...',
    exam_name: "",//周考二
    subject_text: "",//组件化开发
    questions_type_text: "",//代码阅读题
    questions_answer: "",
    id: null,
    exam_id: '',
    subject_id: '',
    questions_type_id: ''
  }


  handleChange = (value: any, name: string) => {
    this.setState({ [name]: value })
  }

  public showConfirm = () => {
    //用来判断是修改还是添加
    let _this = this;
    const query = url.parse(window.location.search).query
    const data = querystring.parse(query)
    let questions_id = data.id;
    let config = {}
    const { title, questions_stem, exam_id, subject_id, questions_type_id, questions_answer } = _this.state;

    let params = {
      title,
      questions_stem,
      questions_answer,
      subject_id,
      questions_type_id,
      exam_id
    }

    if (questions_id) {
      config = {
        title: '您要修改吗？',
        content: '确定要修改这道题吗？',
        onOk: async () => {
          const resolve = await _this.props.addQuestions.updateQuestion({ questions_id, ...params })
          if (resolve.code != 1) {
            message.error(resolve.msg, 1)
          } else {
            message.success(resolve.msg, 1, () => {
              _this.props.history.push("/main/watchQuestions")
            })
          }
        },
      }
    } else {
      config = {
        title: '你确定要添加这道试题吗？',
        content: '真的要添加吗？',
        onOk: async () => {
          if (title && questions_stem && questions_answer && subject_id && questions_type_id && exam_id) {
            const resolve = await _this.props.addQuestions.addingQuestions({ ...params, user_id: "w6l6n-cbvl6s" })
            if (resolve.code === 1) {
              message.success(resolve.msg, 1, () => {
                _this.props.history.push("/main/watchQuestions")
              })
            } else {
              message.error(resolve.msg, 1)
            }
          } else {
            message.error("请将页面填写完整", 1)
          }
        },
      }
    }


    confirm({
      ...config,
      cancelText: "取消",
      okText: "确定"
    });
  }

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

  public async componentDidMount() {
    const query = url.parse(window.location.search).query
    const data = querystring.parse(query)

    //获取数据
    this.getList()

    let questions_id = data.id;
    //获取详情的数据
    if (questions_id) {
      const result = await this.props.question.questionDetail({
        questions_id
      });
      const { title, questions_stem, exam_name, exam_id, subject_text, subject_id, questions_type_text, questions_type_id, questions_answer } = result.data[0];


      this.setState({
        id: questions_id,
        title,
        questions_stem,
        exam_name,
        exam_id,
        subject_text,
        subject_id,
        questions_type_text,
        questions_type_id,
        questions_answer
      })
    }
  }
  public render() {
    // * title  题干
    // * questions_stem 主题
    // * exam_name 考试类型
    // * subject_text 课程类型
    // * questions_type_text  题目类型
    // * questions_answer  答案
    const {formatMessage}=this.props.intl
    const { subject, examType, questionsType, id, title, questions_stem, exam_name, exam_id, subject_text, subject_id, questions_type_text, questions_type_id, questions_answer } = this.state;
    return (
      <div className="question">
        <header>
          <h2 className="question-title">{formatMessage({id:"menu.question.addQuestions"})}</h2>
        </header>

        <div className='main' style={{ marginBottom: '20px', background: '#fff' }}>
          <Form className="login-form">
            <Form.Item>
              <h3>题目信息</h3>
              <p>题干</p>
              <Input value={title} className="style_input" onChange={e => this.handleChange(e.target.value, "title")} />
            </Form.Item>

            <Form.Item>
              <div >
                <p>题目主题</p>
                <div className="editorItem">
                  <Editor value={questions_stem} style={{ height: "600px" }} onChange={value => this.handleChange(value, "questions_stem")} />
                </div>
              </div>
            </Form.Item>

            <Form.Item>
              <div >
                <p>请选择考试类型</p>
                <Select  style={{ width: 120 }} onChange={(value:any)  => this.handleChange(value,"exam_id")}>
                  {examType && examType.map((item: any, index: number) => {
                    return <Select.Option value={item.exam_id} key={index}>{item.exam_name}</Select.Option>
                  })}
                </Select>
                <p>请选择课程类型</p>
                <Select  style={{ width: 120 }} onChange={(value:any) => this.handleChange(value, "subject_id")}>
                  {subject && subject.map((item: any, index: number) => {
                    return <Select.Option key={index} value={item.subject_id}>{item.subject_text}</Select.Option>
                  })}
                </Select>
                <p>请选择题目类型</p>
                <Select style={{ width: 120 }} onChange={(value:any)  => this.handleChange(value, "questions_type_id")}>
                  {questionsType && questionsType.map((item: any, index: number) => {
                    return <Select.Option value={item.questions_type_id} key={index}>{item.questions_type_text}</Select.Option>
                  })}
                </Select>
              </div>
            </Form.Item>

            <Form.Item>
              <div >
                <h2>答案信息</h2>
                <div className="editorItem">
                  <Editor value={questions_answer} style={{ height: "600px" }} onChange={value => this.handleChange(value, "questions_answer")} />
                </div>
              </div>
            </Form.Item>


            <Button type='primary' onClick={this.showConfirm.bind(this)}>提交</Button>

          </Form>

        </div>
      </div>
    )
  }


}

export default injectIntl(addQuestions)
