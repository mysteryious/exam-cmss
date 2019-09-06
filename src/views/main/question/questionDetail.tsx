import * as React from "react"
import { inject, observer } from "mobx-react"

interface PropInto {
  question: any,
  match: any
}

@inject("question")
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
    const result = await this.props.question.questionDetail({
      questions_id: this.props.match.params.id
    });

    this.setState({
      dataSource: result.data
    })
  }

  public componentDidMount() {
    //获取数据
    this.getList()
  }


  public render() {
    const { dataSource } = this.state

    return (
      <div className="question">
        <header>
          <h2 className="logo-title">试题详情</h2>
        </header>

        <div className='main' style={{ marginBottom: '20px', background: '#fff' }}>

        </div>


      </div>
    )
  }
}

export default questionsType
