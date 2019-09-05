import * as React from "react"
import { Button, Table } from 'antd';
import { array } from 'prop-types';
import { inject, observer } from "mobx-react"
import "@/styles/question/question.css"



const columns = [
  {
    title: '类型ID',
    dataIndex: 'questions_type_id',
    key: 'questions_type_id'
  },
  {
    title: '类型名称',
    dataIndex: 'questions_type_text',
    key: 'questions_type_text'
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'questions_type_sort'
  }
];



interface PropInto {
  question: any
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
    const result = await this.props.question.getQuestion();

    this.setState({
      dataSource: result.data
    })
  }

  public componentDidMount() {
    this.getList()
  }

  public render() {
    const { dataSource } = this.state

    return (
      <div className="question">
        <header>
          <h2 className="logo-title">试题分类</h2>
        </header>


        <div className='main' style={{ marginBottom: '20px', background: '#fff' }}>
          <Button type='primary' icon='plus'>
            添加类型
					</Button>
          <Table columns={columns}  dataSource={dataSource} />
        </div>

      </div>
    )
  }
}

export default questionsType
