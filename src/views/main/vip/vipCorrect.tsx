import * as React from "react";
import { Table, Divider, Tag, Button, Modal,Input ,Form,Select,Radio } from "antd";
const { Option } = Select;
const { Column, ColumnGroup } = Table;
import { observer, inject } from "mobx-react";
import "@/styles/classExam/examList.css";

interface Props {
  grade:any,
  exam:any,
  examlist:any
}

@inject("grade","exam",'examlist')
@observer
class vipCorrect extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public mangergrade = async () => {
    //获取已经分配教室的班级
    const subject = await this.props.grade.getmangergrade();
    console.log(subject)
    subject.data.map((item: any, index: number) => (item.key = index));
    this.setState({ examsubjectArr: subject.data });
  };

  
  public getExamList = async () => {
    //获取试卷列表
    const subject = await this.props.examlist.getexamList();
    subject.exam.map((item: any, index: number) => (item.key = index));
    // console.log(subject);
    this.setState({ Examlist: subject.exam });
  };

  public componentDidMount() {
    this.getExamList();
    this.mangergrade();
  }

  state = {
    examsubjectArr: [],
    examType: [],
    Examlist:[],
    size: '全部'
  };

  tabChange = (e:any) => {
    this.setState({ size: e.target.value });
  };
  public render() {
    let { examsubjectArr, examType ,size,Examlist} = this.state;
    
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
            状态:&emsp;
          <Select defaultValue="" style={{ width: 150, height: 30 }}>
              {/* {examType &&
                examType.map((item: any, index: any) => {
                  return (
                    <Option value={item.exam_id} key={item.exam_id}>
                      {item.exam_name}
                    </Option>
                  );
                })} */}
            </Select>
          </span>
          <span className="headerIpt">
            班级:&emsp;
            <Select defaultValue="" style={{ width: 150, height: 30 }}>
              {examsubjectArr &&
                examsubjectArr.map((item: any, index: any) => {
                  return (
                    <Option value={item.grade_id} key={item.grade_name}>
                      {item.grade_name}
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
          </div>
          <div className="dataTable">
            <Table dataSource={Examlist} pagination={false}>
              <Column title="班级" dataIndex="title" key="title" />
              <Column title="姓名" dataIndex="grade_name" key="grade_name" />
              <Column title="阅卷状态" dataIndex="user_name" key="user_name" />
              <Column title="开始时间" dataIndex="start_time" key="start_time" />
              <Column title="结束时间" key="end_time"
                render={(text:any, record: any) => (
                  <span>
                    {text["end_time"]}
                  </span>
                )}
              />
              <Column title="成材率"/>
              <Column title="操作" key="批卷"
                render={(text, record: any) => (
                  <span>
                    <a>详情</a>
                  </span>
                )}
              />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default vipCorrect;
