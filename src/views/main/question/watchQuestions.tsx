import * as React from "react"
import { List, message, Spin, Select, Button, Layout, Tag } from 'antd'
const { CheckableTag } = Tag;
import { inject, observer } from "mobx-react"
import { injectIntl } from "react-intl"
import "@/styles/question/watchquestion.css"

interface PropInto {
  watchquestions: any,
  history: any,
  question: any,
  intl: any
}

@inject("watchquestions", "question")
@observer

class watchQuestions extends React.Component<PropInto>{
  state = {
    subject: [],//课程类型
    examType: [],//考试类型
    questionsType: [],//考试题目类型
    getQuestions: [],//所有的试题
    questions_id: "",//试题id
    questions_type_id: "",//课程类型id
    subject_id: "",//课程id
    exam_id: "",//考试类型id
  }
  constructor(props: any) {
    super(props);
    this.getList()
  }


  public getList = async () => {
    //获取课程类型
    const subject = await this.props.watchquestions.getSubject();
    //获取考试类型
    const examType = await this.props.watchquestions.getExamType();
    //获取考试题目类型
    const questionsType = await this.props.watchquestions.getQuestionsType();
    //获取所有的试题
    const getQuestions = await this.props.question.questionDetail();
    getQuestions.data.map((item: any, index: number) => item.key = index)
    subject.data.map((item: any, index: number) => item.checked = false)


    this.setState({
      subject: subject.data,
      examType: examType.data,
      questionsType: questionsType.data,
      getQuestions: getQuestions.data
    })
  }

  handleChange = (value: any, name: string) => {
    this.setState({ [name]: value })
  }



  handleSublit = async () => {
    const { questions_type_id, subject_id, exam_id } = this.state
    let array = []

    if (questions_type_id && subject_id && exam_id) {
      array = await this.props.question.questionDetail({ questions_type_id, subject_id, exam_id });
    } else if (questions_type_id && subject_id) {
      array = await this.props.question.questionDetail({ questions_type_id, subject_id });
    } else if (questions_type_id && exam_id) {
      array = await this.props.question.questionDetail({ questions_type_id, exam_id });
    } else if (subject_id && exam_id) {
      array = await this.props.question.questionDetail({ subject_id, exam_id });
    } else if (questions_type_id) {
      array = await this.props.question.questionDetail({ questions_type_id });
    } else if (subject_id) {
      array = await this.props.question.questionDetail({ subject_id });
    } else if (exam_id) {
      array = await this.props.question.questionDetail({ exam_id });
    } else {
      array = await this.props.watchquestions.getQuestionsType();
    }
    this.setState({ getQuestions: array.data })
  }


  public render() {
    const { subject, examType, questionsType, getQuestions, subject_id } = this.state
    const { formatMessage } = this.props.intl
    return (
      <div className="demo-infinite-container">
        <header>
          <h2 className="logo-title">{formatMessage({ id: "menu.question.watchQuestions" })}</h2>
        </header>

        <div className="top">
          <div className="top-item">
            <div className="left">
              <span>课程类型:</span>
            </div>
            <div className="right-one">
              {subject.map((item: any, index: number) => (
                <span key={item.subject_id} className={item.subject_id === subject_id ? "ant-tag-checkable-checked" : ""} onClick={() => this.handleChange(item.subject_id, "subject_id")}>
                  {item.subject_text}
                </span>
              ))}
            </div>
          </div>

          <div className='right'>
            <div className="item">
              <span>考试类型:</span>
              <Select style={{ width: 120 }} onChange={value => this.handleChange(value, "exam_id")}>
                {examType && examType.map((item: any, index: number) => {
                  return <Select.Option value={item.exam_id} key={index}>{item.exam_name}</Select.Option>
                })}
              </Select>
            </div>
            <div className="item">
              <span>题目类型:</span>
              <Select style={{ width: 120 }} onChange={value => this.handleChange(value, "questions_type_id")}>
                {questionsType && questionsType.map((item: any, index: number) => {
                  return <Select.Option value={item.questions_type_id} key={index}>{item.questions_type_text}</Select.Option>
                })}
              </Select>
            </div>
            <div className="item">
              <Button type="primary" icon="search" onClick={this.handleSublit.bind(this)}>
                查询
              </Button>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="demo-infinite-container">

            <Layout style={{ padding: '0 24px 24px', background: "#fff", borderRadius: "10px" }}>
              <List
                dataSource={getQuestions}
                renderItem={(item: any) => (
                  <List.Item>
                    <div className="ant-list-item-content" onClick={()=>this.props.history.push({ pathname: `/main/question/detail/${item.questions_id}`, state: { title: '试题详情' } })}>
                      <List.Item.Meta title={item.title} />
                      <span>{item.questions_type_text}</span>
                      <span>{item.subject_text}</span>
                      <span>{item.exam_name}</span>
                      <br />
                      <a href="/main/question/detail" style={{ color: "#0139FD", paddingTop: "10px", display: "block" }}>{item.user_name}发布</a>
                    </div>
                    <div><a onClick={() => this.props.history.replace(`/main/addQuestions?id=${item.questions_id}`)} style={{ color: "#0139FD" }}>编辑</a></div>
                  </List.Item>
                )}
              />
            </Layout>
          </div>
        </div>

      </div>
    )
  }
}

export default injectIntl(watchQuestions)

