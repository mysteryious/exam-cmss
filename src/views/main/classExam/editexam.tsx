import * as React from "react"
import { inject, observer } from "mobx-react"
import { injectIntl } from "react-intl"
import { Button, message } from "antd";
import "@/styles/classExam/editexam.css"
const ReactMarkdown = require('react-markdown')


interface PropInto {
  question: any,
  match: any,
  location: any,
  examlist: any,
  exam: any,
  history: any
}

@inject("question", "examlist", "exam")
@observer


class questionsType extends React.Component<PropInto>{
  constructor(props: any) {
    super(props);
  }

  state = {
    dataSource: []
  }

  public getList = async () => {
    //获取试题分类的数据
    let result = this.props.location.state.exam;
    this.setState({
      dataSource: result.data
    })
  }

  public componentDidMount() {
    //获取数据
    this.getList()
  }


  public render() {
    const { dataSource }: any = this.state
    return (
      <div style={{ marginBottom: '20px' }}>
        <h2>{this.props.location.state.title}</h2>
        <div className="edit-main">
          <Button>添加新题</Button>
          <div className="edit-content">
            <h2>{dataSource.title}</h2>
            {
              dataSource.questions && dataSource.questions.map((item: any, i: number) => {
                return <div key={i} className="content-item">
                  <h4>{i + 1}: {item.title}</h4>
                  <div className="react-markdown">
                    <ReactMarkdown source={item.questions_stem} />
                  </div>
                </div>
              })
            }
            <Button className="ant-btn-primary" onClick={this.handleSubmit}>创建试卷</Button>
          </div>
        </div>
      </div>
    )
  }
  public handleSubmit = async () => {
    const { dataSource }: any = this.state;

    const ids: any = [];
    dataSource.questions.map((item: any) => {
      ids.push(item.questions_id)
    })

    const data = await this.props.exam.SETexamList({
      id: dataSource.exam_exam_id,
      question_ids: JSON.stringify(ids)
    })

    if (data.code != 1) {
      message.error(data.msg, 1)
    } else {
      message.success(data.msg, 1, () => {
        this.props.history.push("/main/examList")
      })
    }
  };
}

export default questionsType
