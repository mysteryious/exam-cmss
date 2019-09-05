import * as React from "react"
import { List, message, Spin, Select, Button } from 'antd'
import { inject, observer } from "mobx-react"
import "@/styles/question/watchquestion.css"


interface PropInto {
  watchquestions: any
}


@inject("watchquestions")
@observer



class watchQuestions extends React.Component<PropInto>{

  constructor(props: any) {
    super(props);
  }

  state = {
    subject: [],
    examType: [],
    questionsType:[]
  }

  public getList = async () => {
    //获取试题分类的数据
    const subject = await this.props.watchquestions.getSubject();
    const examType = await this.props.watchquestions.getExamType();
    const questionsType = await this.props.watchquestions.getQuestionsType();

    this.setState({
      subject: subject.data,
      examType: examType.data,
      questionsType: questionsType.data
    })
  }

  public componentDidMount() {
    this.getList()
  }

  public render() {
    const { subject, examType,questionsType } = this.state



    return (
      <div className="demo-infinite-container">
        <header>
          <h2 className="logo-title">查看试题</h2>
        </header>


        <div className="top">
          <div className="top-item">
            <div className="left">
              <span>课程类型</span>
            </div>
            <div className="right-one">
              {
                subject && subject.map((item: any, index: number) => {
                  return <span key={index}>{item.subject_text}</span>
                })
              }
            </div>
          </div>
          <div className='top-item'>
            <div className="left-two">
              <span>考试类型</span>
            </div>
            <div className="right">
              <div className="item">
                <p>请选择考试类型：</p>
                <Select defaultValue="周考一" style={{ width: 120 }} >
                  {examType && examType.map((item: any, index: number) => {
                    return <Select.Option value={item.exam_name} key={index}>{item.exam_name}</Select.Option>
                  })}
                </Select>
              </div>
              <div className="item">
                <p>请选择题目类型 :</p>
                <Select defaultValue="解答题" style={{ width: 120 }} >
                  {questionsType && questionsType.map((item: any, index: number) => {
                    return <Select.Option value={item.questions_type_text} key={index}>{item.questions_type_text}</Select.Option>
                  })}
                </Select>
              </div>
              <div className="item">
                <Button type="primary" icon="search">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default watchQuestions

