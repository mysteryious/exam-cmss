import * as React from "react";
import { Table, Divider, Tag, Button, Modal, Input, Form, Select, Radio } from "antd";
const { Option } = Select;
const { Column, ColumnGroup } = Table;
import { observer, inject } from "mobx-react";
import "@/styles/classExam/examList.css";

interface Props {
  grade: any,
  exam: any,
  examlist: any,
  history: any
}

@inject("grade", "exam", 'examlist')
@observer
class ExamList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  public getList = async () => {
    //获取所有的课程
    const subject = await this.props.grade.getexamsubject();
    const examType = await this.props.exam.getexamType();
    const examList = await this.props.examlist.getexamList();

    examType.data.map((item: any, index: number) => item.key = index)
    examList.exam.map((item: any, index: number) => {
      item.start_time = new Date(Number(item.start_time)).toLocaleString()
      item.end_time = new Date(Number(item.end_time)).toLocaleString()
      item.key = Math.random()
      item.detail = '详情'
      return item
    })
    this.setState({
      examsubjectArr: subject.data,
      examType: subject.data,
      examList: examList.exam
    });
  };


  public componentDidMount() {
    this.getList()
  }

  state = {
    examsubjectArr: [],
    examType: [],
    examList: [],
    size: '全部',
    columns: [
      {
        title: '试卷信息',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '班级',
        dataIndex: 'grade_name',
        key: 'grade_name',
      },
      {
        title: '创始人',
        dataIndex: 'user_name',
        key: 'user_name',
      },
      {
        title: '开始时间',
        dataIndex: 'start_time',
        key: 'start_time',
      },
      {
        title: '结束时间',
        dataIndex: 'end_time',
        key: 'end_time',
      },
      {
        title: '操作',
        dataIndex: 'detail',
        key: 'detail',
        render: (text: any, record: any) => {
          return <a onClick={() => { this.clickDetail(text, record) }}>{text}</a>
        }
      }
    ]

  };

  clickDetail = (text: any, record: any) => {
    this.props.history.push({ pathname: `/main/question/detail/${record.exam_exam_id}`, state: { title: '试卷详情' } })
  }

  tabChange = (e: any) => {
    this.setState({ size: e.target.value });
  };
  public render() {
    let { examsubjectArr, examType, size, examList,columns } = this.state;

    return (
      <div className="demo-infinite-container">
        <header>
          <h2 className="logo-title">试卷列表</h2>
        </header>

        <div
          className="main"
          style={{ marginBottom: "20px", background: "#fff" }}
        >
          <span className="headerIpt">
            考试类型:&emsp;
          <Select defaultValue="" style={{ width: 150, height: 30 }}>
              {examType && examType.map((item: any, index: any) => {
                return (
                  <Option value={item.exam_id} key={index}>
                    {item.exam_name}
                  </Option>
                );
              })}
            </Select>
          </span>
          <span className="headerIpt">
            课程:&emsp;
            <Select defaultValue="" style={{ width: 150, height: 30 }}>
              {examsubjectArr && examsubjectArr.map((item: any, index: any) => {
                return (
                  <Option value={item.subject_id} key={item.subject_id}>
                    {item.subject_text}
                  </Option>
                );
              })}
            </Select>
          </span>
          <span className="headerIpt">
            <Button type="primary" icon="search">
              查询
            </Button>
          </span>
        </div>
        <div className="main">
          <div className="examlist">
            <span className="examtitle">试卷列表</span>
            <span className="tabbtn">
              <Radio.Group value={size} onChange={this.tabChange} style={{ marginBottom: 16 }}>
                <Radio.Button value="全部">全部</Radio.Button>
                <Radio.Button value="进行中">进行中</Radio.Button>
                <Radio.Button value="已结束">已结束</Radio.Button>
              </Radio.Group>
            </span>
          </div>
          <div className="dataTable">
            <Table columns={columns} dataSource={examList} />
          </div>
        </div>
      </div>
    );
  }
}

export default ExamList;
