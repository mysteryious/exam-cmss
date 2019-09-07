import * as React from "react";
import { Table, Divider, Tag, Button, Modal,Input ,Form,Select,Radio } from "antd";
const { Option } = Select;
const { Column, ColumnGroup } = Table;
import { observer, inject } from "mobx-react";
import "@/styles/classExam/examList.css";

interface Props {
  grade:any,
  exam:any
}

@inject("grade","exam")
@observer
class ExamList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  public getSubject = async () => {
    //获取所有的课程
    const subject = await this.props.grade.getexamsubject();
    console.log(subject);
    this.setState({ examsubjectArr: subject.data });
  };

  public getExamType = async () => {
    //获取所有考试类型
    const subject = await this.props.exam.getexamType();
    console.log(subject);
    this.setState({ examType: subject.data });
  };


  public componentDidMount() {
    this.getSubject();
    this.getExamType();
  }

  state = {
    examsubjectArr: [],
    examType: [],
    size: '全部'
  };

  tabChange = (e:any) => {
    this.setState({ size: e.target.value });
  };
  public render() {
    let { examsubjectArr, examType ,size} = this.state;
    
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
          <Select defaultValue="" style={{ width: 230, height: 30 }}>
              {examType &&
                examType.map((item: any, index: any) => {
                  return (
                    <Option value={item.exam_id} key={item.exam_id}>
                      {item.exam_name}
                    </Option>
                  );
                })}
            </Select>
          </span>
          <span className="headerIpt">
            课程:&emsp;
            <Select defaultValue="" style={{ width: 230, height: 30 }}>
              {examsubjectArr &&
                examsubjectArr.map((item: any, index: any) => {
                  return (
                    <Option value={item.subject_id} key={item.subject_id}>
                      {item.subject_text}
                    </Option>
                  );
                })}
            </Select>
          </span>
          <span className="headerIpt">
            <Button type="primary" icon="search" >
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
            <Table dataSource={[]} pagination={false}>
              <Column title="试卷信息" dataIndex="room_text" key="room_text" />
              <Column title="班级" dataIndex="room_text" key="room_text" />
              <Column title="创建人" dataIndex="room_text" key="room_text" />
              <Column title="开始时间" dataIndex="room_text" key="room_text" />
              <Column title="结束时间" dataIndex="room_text" key="room_text" />
              <Column title="操作" dataIndex="room_text" key="room_text" />
              
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default ExamList;
