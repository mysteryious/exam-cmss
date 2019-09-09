import * as React from "react"
import { List, message, Spin, Select, Button, Layout } from 'antd'
import { inject, observer } from "mobx-react"
import "@/styles/question/watchquestion.css"


interface PropInto {
  watchquestions: any,
  history: any,
  question:any
}


@inject("watchquestions","question")
@observer



class watchQuestions extends React.Component<PropInto>{

  constructor(props: any) {
    super(props);
    this.getList()
  }

  state = {
    subject: [],
    examType: [],
    questionsType: [],
    getQuestions: []
  }

  public getList = async () => {
    //获取课程类型
    const subject = await this.props.watchquestions.getSubject();
    //获取考试类型
    const examType = await this.props.watchquestions.getExamType();
    //获取考试题目类型
    const questionsType = await this.props.watchquestions.getQuestionsType();
    //获取所有的试题
    const getQuestions = await this.props.watchquestions.getQuestions();
    getQuestions.data.map((item: any, index: number) => item.key = index)

    const data = await this.props.question.questionDetail()
    console.log(data, "date")

    this.setState({
      subject: subject.data,
      examType: examType.data,
      questionsType: questionsType.data,
      getQuestions: getQuestions.data
    })
  }

  public jump = (id: string) => {
    this.props.history.push(`/main/question/detail/${id}`)
  }

  public modify = (id: string) => {
    this.props.history.replace(`/main/addQuestions?id=${id}`)
  }

  public componentDidMount() {
    this.getList()
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
                  return <span key={index}>{item.subject_text}</span>
                })
              }
            </div>
          </div>

          <div className='right'>
            <div className="item">
              <span>考试类型:</span>
              <Select defaultValue="周考一" style={{ width: 120 }} >
                {examType && examType.map((item: any, index: number) => {
                  return <Select.Option key={index}>{item.exam_name}</Select.Option>
                })}
              </Select>
            </div>
            <div className="item">
              <span>题目类型:</span>
              <Select defaultValue="周考一" style={{ width: 120 }} >
                {examType && examType.map((item: any, index: number) => {
                  return <Select.Option key={index}>{item.exam_name}</Select.Option>
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
                renderItem={(item: any, index: number) => (

                  <List.Item key={index} onClick={()=>this.jump(item.questions_id)}>
                    <List.Item.Meta
                      title={item.title}
                      key={index}
                      description={[
                        <span>{item.questions_type_text}</span>,
                        <span>{item.subject_text}</span>,
                        <span>{item.exam_name}</span>,
                        <br />,
                        <a href="/main/question/detail" style={{ color: "#0139FD", paddingTop: "10px", display: "block" }}>{item.user_name}发布</a>
                      ]}
                    // onClick={()=>this.jump(item.questions_id)}
                    />

                    <div><a onClick={() => this.modify(item.questions_id)} style={{ color: "#0139FD" }}>编辑</a></div>
                  </List.Item>
                )}
              >
              </List>
            </Layout>
          </div>
        </div>

      </div>
    )
  }
}

export default watchQuestions

