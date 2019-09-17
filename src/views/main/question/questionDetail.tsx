import * as React from "react"
import { inject, observer } from "mobx-react"
import { injectIntl } from "react-intl"
import "@/styles/question/questionDetail.css"
const ReactMarkdown = require('react-markdown')


interface PropInto {
  question: any,
  match: any,
  location: any,
  examlist: any
}

@inject("question", "examlist")
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
    let result = []

    if (this.props.location.state.title === "试题详情") {
      result = await this.props.question.questionDetail({
        questions_id: this.props.match.params.id
      });
    } else {
      result = await this.props.examlist.examDetail(this.props.match.params.id);
    }
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
        <div className="detailBox">
          {
            Array.isArray(dataSource) ? <div className="left">
              <p>出题人：{dataSource[0] && dataSource[0].user_name}</p>
              <h3>题目信息</h3>
              <div className="message">
                <div>{dataSource[0] && dataSource[0].questions_type_text}</div>
                <div>{dataSource[0] && dataSource[0].subject_text}</div>
                <div>{dataSource[0] && dataSource[0].exam_name}</div>
              </div>
              <h4>{dataSource[0] && dataSource[0].title}</h4>
              <div>
                <ReactMarkdown source={dataSource[0] && dataSource[0].questions_stem} />
              </div>
            </div>
              : <div className="left">
                {
                  dataSource.questions.map((item: any, i: number) => {
                    return <div key={i} className="left-item">
                      <h4>{i + 1}: {item.title}</h4>
                      <ReactMarkdown source={item.questions_stem} />
                    </div>

                  })
                }

              </div>
          }
          {
            Array.isArray(dataSource) ? <div className="right">
              <h3>答案信息</h3>
              <div>
                <ReactMarkdown source={dataSource[0] && dataSource[0].questions_answer} />
              </div>
            </div>
              : <div className="right-list"></div>
          }

        </div>
      </div>
    )
  }
}

export default questionsType
