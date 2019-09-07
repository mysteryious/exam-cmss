import * as React from "react";
import { Table, Divider, Tag, Button,Modal,Input,Select } from "antd";
const {Option} = Select;
const { Column, ColumnGroup } = Table;
import { observer, inject } from "mobx-react";
import "@/styles/classMangement/grade.css";
import { array } from 'prop-types';

interface Props {
  grade: any;
  data: any;
  room_text:any;
  grade_name:any;
  subject_id:any;
  buZhouList:any;
  room:any;
}

@inject("grade",'room')
@observer
class ClassMangement extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }


  //更新表格数据
  public getList = async () => {
    //获取已经分配教室的班级
    const subject = await this.props.grade.getmangergrade();
    // console.log(subject)
    this.setState({ data: subject.data });
  };

  public getsubjectAll = async () => {
    //获取全部教室
    const subject = await this.props.room.getmangerroom();
    // console.log(subject)
    this.setState({ subjectAll: subject.data });
  };

  public getSubject = async () => {
    //获取所有的课程
    const subject = await this.props.grade.getexamsubject();
    // console.log(subject)
    this.setState({ examsubjectArr: subject.data });
  };


  public componentDidMount() {
    this.getList();
    this.getSubject();
    this.getsubjectAll()
  }
  state = {
    data: [],
    visible: false,
    subjectArr:[],
    examsubjectArr:[],
    subjectAll:[],
    gradeVal:'',
    subjectVal:'',
    bjVal:'',
    disabled:false
    
  };
  //弹出框
  showModal = () => {
    this.setState({
      visible: true,
      disabled:false
    });
  };

  handleOk = async (e: any) => {
    let {gradeVal,subjectVal,bjVal} = this.state;
    // console.log(gradeVal,subjectVal,bjVal)
    const subject = await this.props.grade.addmangergrade({grade_name:bjVal,room_id	:gradeVal,subject_id:subjectVal});
    // console.log(subject)
    this.getList()
    this.setState({
      visible: false
    });
  };

  handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
      
    });
  };
  //选择教室下拉菜单
  gradeChange = (value:any) => {
    // console.log(`selected ${value}`);
    this.setState({gradeVal:value})
  };
   //选择课程下拉菜单
  subjectChange = (value:any) => {
    // console.log(`selected ${value}`);
    this.setState({subjectVal:value})
  };
  public render() {
    let { data,examsubjectArr ,subjectAll,disabled} = this.state;
    
    return (
      <div className="demo-infinite-container">
        <header>
          <h2 className="logo-title">班级管理</h2>
        </header>

        <div
          className="main"
          style={{ marginBottom: "20px", background: "#fff" }}
        >
          <Button type="primary" icon="plus" onClick={this.showModal}>
            添加班级
          </Button>
          <Modal
            title="添加班级"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            cancelText={"取消"}
            okText={"确定"}
          >
            <p>班级名:</p>
            <Input
              placeholder="班级名"
              disabled={disabled}
              onChange={(e)=>{
                this.setState({bjVal:e.target.value})
              }}
              
            />
            <p>教师号:</p>
            <Select defaultValue="请选择教室号" style={{ width: "100%",color:"#ccc" }} onChange={this.gradeChange} >
              {/* <Option value="lucy">请选择教室号</Option> */}
              {
                subjectAll && subjectAll.map((item:any,index:any)=>{
                  // console.log(item.grade_name)
                 return <Option value={item.room_id} key={item.room_id}>{item.room_text}</Option>
                })
              }
            </Select>
            <p>课程名:</p>
            <Select defaultValue="课程名" style={{ width: "100%",color:"#ccc"  }}  onChange={this.subjectChange}  >
              {
                examsubjectArr && examsubjectArr.map((item:any,index:any)=>{
                  return  <Option value={item.subject_id} key={item.subject_id}>{item.subject_text}</Option>
                })
              }
            </Select>
          </Modal>
          <Table dataSource={data} pagination={false}>
            <Column title="班级名" dataIndex="grade_name" key="grade_name" />
            <Column
              title="课程名"
              dataIndex="subject_text"
              key="subject_text"
            />
            <Column title="教室号" dataIndex="room_text" key="room_text" />
            <Column
              title="操作"
              key="操作"
              render={(text, record: any) => (
                <span>
                  <a onClick={()=>{
                    this.setState({visible:true,disabled:true})
                  }}>修改</a>
                  <Divider type="vertical" />
                  <a>删除</a>
                </span>
              )}
            />
          </Table>
        </div>
      </div>
    );
  }
}

export default ClassMangement;
