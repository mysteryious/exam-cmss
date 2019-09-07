import * as React from "react"
import { inject, observer } from "mobx-react"
import { Layout, Input, Button, Form, Select } from 'antd'
import { FormComponentProps } from "antd/lib/form/Form";
import { getocaltion, removeltion } from "@/utils/login"
import Editor from 'for-editor'
import "@/styles/question/addQuestions.css"

interface PropInto {
  question: any,
  match: any,
  form: any,
  watchquestions: any,
}

@inject("watchquestions", "question")
@observer

// * stem  题干
// * theme 主题
// * examinationType 考试类型
// * courseType 课程类型
// * topicType  题目类型
// * answer  答案


class addQuestions extends React.Component<PropInto>{
  constructor(props: any) {
    super(props);
  }

  state = {
    dataSource: [],
    stem: '请输入题目标题,不操过20个字',
    theme: '请输入内容...',
    examinationType: "",
    courseType: "",
    topicType: "",
    answer: "",

    examType: [],
    questionsType: [],
    subject: []
  }
  handleChange = (value: string) => {
    this.setState({
      stem: value
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
      stem: e.target.value
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
  // componentWillMount() {
  //   removeltion("id")
  // }


  public async componentDidMount() {
    //获取数据
    this.getList()
    let questions_id = JSON.parse(getocaltion("id"))
    //获取详情的数据
    if (questions_id) {
      const result = await this.props.question.questionDetail({
        questions_id
      });
      const { title, questions_stem, exam_name, subject_text, questions_type_text, questions_answer } = result.data[0]
      this.setState({
        stem: title,
        theme: questions_stem,
        examinationType: exam_name,
        courseType: subject_text,
        topicType: questions_type_text,
        answer: questions_answer,
      })
    }
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
    const { subject, examType, questionsType, dataSource, stem, theme, examinationType, courseType, topicType, answer } = this.state

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
              <Input value={stem} className="style_input" onChange={this.onChange} />
            </Form.Item>

            <Form.Item>
              <div >
                <p> 题目主题</p>
                <div className="editorItem">
                  <Editor value={theme} style={{ height: "600px" }} onChange={this.handleChange.bind(this)} />
                </div>
              </div>
            </Form.Item>

            <Form.Item>
              <div >
                <p>请选择考试类型</p>
                <Select value={examinationType} style={{ width: 120 }} >
                  {examType && examType.map((item: any, index: number) => {
                    return <Select.Option key={index}>{item.exam_name}</Select.Option>
                  })}
                </Select>
                <p>请选择课程类型</p>
                <Select value={courseType} style={{ width: 120 }} >
                  {subject && subject.map((item: any, index: number) => {
                    return <Select.Option key={index}>{item.subject_text}</Select.Option>
                  })}
                </Select>
                <p>请选择题目类型</p>
                <Select value={topicType} style={{ width: 120 }} >
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
                  <Editor value={answer} style={{ height: "600px" }} onChange={this.handleChange.bind(this)} />
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
