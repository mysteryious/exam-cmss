import * as React from "react"
import { List, message, Spin, Select, Button, Layout } from 'antd'
import { inject, observer } from "mobx-react"
import "@/styles/question/watchquestion.css"

interface PropInto {
  watchquestions: any,
  history: any,
  question: any
}

@inject("watchquestions", "question")
@observer

class watchQuestions extends React.Component<PropInto>{
  state = {
    subject: [],
    examType: [],
    questionsType: [],
    getQuestions: []
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
    console.log(subject,examType,questionsType)
    //获取所有的试题
    const getQuestions = await this.props.question.questionDetail();
    getQuestions.data.map((item: any, index: number) => item.key = index)

    this.setState({
      subject: subject.data,
      examType: examType.data,
      questionsType: questionsType.data,
      getQuestions: getQuestions.data
    })
  }

  handleChange = (value: string) => {
    console.log(value)
  }

  public render() {
    const { subject, examType, questionsType, getQuestions } = this.state
    return (
      <div className="demo-infinite-container">
        <header>
          <h2 className="logo-title">查看试题</h2>
        </header>

        <div className="top">
          <div className="top-item">
            <div className="left">
              <span>课程类型:</span>
            </div>
            <div className="right-one">
              {
                subject && subject.map((item: any, index: number) => {
                  return <span key={item.subject_id}>{item.subject_text}</span>
                })
              }
            </div>
          </div>

          <div className='right'>
            <div className="item">
              <span>考试类型:</span>
              <Select style={{ width: 120 }}  onChange={this.handleChange.bind(this)}>
                {examType && examType.map((item: any, index: number) => {
                  return <Select.Option value={item.exam_id} key={index}>{item.exam_name}</Select.Option>
                })}
              </Select>
            </div>
            <div className="item">
              <span>题目类型:</span>
              <Select style={{ width: 120 }} >
                {questionsType && questionsType.map((item: any, index: number) => {
                  return <Select.Option value={item.questions_type_id} key={index}>{item.questions_type_text}</Select.Option>
                })}
              </Select>
            </div>
            <div className="item">
              <Button type="primary" icon="search">
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
                    <div className="ant-list-item-content" onClick={() => this.props.history.push(`/main/question/detail/${item.questions_id}`)}>
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

export default watchQuestions

