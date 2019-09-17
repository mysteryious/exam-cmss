import * as React from "react";
import { Table, Divider, Tag, Button, Modal,Input ,Form,Select,Radio } from "antd";
const { Option } = Select;
const { Column, ColumnGroup } = Table;
import { observer, inject } from "mobx-react";
import "@/styles/classExam/examList.css";

interface Props {
  grade:any,
  exam:any,
  examlist:any,
  history:any,
  vipCorrect:any
}

@inject("grade","exam",'examlist','vipCorrect')
@observer
class vipCorrect extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public mangergrade = async () => {
    //获取已经分配教室的班级
    const subject = await this.props.grade.getmangergrade();
    subject.data.map((item: any, index: number) => (item.key = index));
    this.setState({ examsubjectArr: subject.data });
  };

  
  public getExamList = async () => {
    //获取试卷列表
    const subject = await this.props.examlist.getexamList();
    subject.exam.map((item: any, index: number) => (item.key = index));
    //获取学生试卷列表
    if(this.props.history.location.query){
      let {id,grade_name} = this.props.history.location.query;
      const Correct = await this.props.vipCorrect.getexamStudent({grade_id:id})
      
      Correct.exam && Correct.exam.map((item:any)=>{
        if(item.status===0){
          return item.status='未阅'
        }else{
          return item.status='已阅'
        }
      })
      Correct.exam && Correct.exam.map((item:any)=>{
        if(item.score===0){
          return item.score='-'
        }else{
          return item.score=item.score
        }
      })
      Correct.exam && Correct.exam.map((item:any,index:number)=>{return item.key=index,item.grade_name = grade_name})
      this.setState({ Examlist: subject.exam ,CorrectList:Correct.exam});
    }else{
      this.props.history.push('/main/vip')
    }
  };
  detail(text:any){
    this.props.history.push({pathname:'/main/detail',query:{id:text.exam_student_id}})
  }
  public componentDidMount() {
    this.getExamList();
    this.mangergrade();
  }

  state = {
    examsubjectArr: [],
    CorrectList: [],
    Examlist:[],
    size: '全部',
  };

  tabChange = (e:any) => {
    this.setState({ size: e.target.value });
  };
  public render() {
    let { examsubjectArr, CorrectList ,size,Examlist} = this.state;
    return (
      <div className="demo-infinite-container">
        <div
          className="main"
          style={{ marginBottom: "20px", background: "#fff" }} 
        >
          <span className="headerIpt">
            状态:&emsp;
          <Select defaultValue="" style={{ width: 150, height: 30 }}>
              {/* {CorrectList &&
                CorrectList.map((item: any, index: any) => {
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
            <Table dataSource={CorrectList} >
              <Column title="班级" dataIndex="grade_name" key="grade_name" />
              <Column title="姓名" dataIndex="student_name" key="student_name" />
              <Column title="阅卷状态" dataIndex="status" key="status" />
              <Column title="开始时间" dataIndex="start_time" key="start_time" />
              <Column title="结束时间" dataIndex="end_time" key="end_time" />
              <Column title="成材率" dataIndex='score' key="score"/>
              <Column title="操作" key="批卷"
                render={(text, record: any) => (
                  <span>
                    <a onClick={this.detail.bind(this,text)}>批卷</a>
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
