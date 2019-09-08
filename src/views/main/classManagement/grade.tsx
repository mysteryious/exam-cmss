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
  text:any
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
    subject.data.map((item:any,index:number)=>item.key=index)
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
    disabled:false,
    roomtext:'请选择教室号',
    subjecttext:'课程名',
    open:false,
    gradeid:''
    
  };
  //弹出框
  showModal = () => {
    this.setState({
      visible: true,
      disabled:false,
      open:false
    });
  };
//点击提交按钮
  handleOks = async (e: any) => {
    let {gradeVal,subjectVal,bjVal,gradeid,disabled} = this.state;
    if(disabled){
      const gradeupdate = await this.props.grade.mangergradeupdate({grade_id: gradeid,grade_name: bjVal,room_id: gradeVal,subject_id: subjectVal});
      console.log(gradeupdate,"----------------")
    }else{
      const subject = await this.props.grade.addmangergrade({grade_name:bjVal,room_id	:gradeVal,subject_id:subjectVal});
    }
    this.getList()
    Modal.destroyAll();
    this.setState({
      visible: false,
      bjVal:'',
      open:true,
      roomtext:'请选择教室号',
      subjecttext:'课程名',
    });
  };
  //点击删除按钮
  deletegrade = async (text:any)=>{
    const deleteres = await this.props.grade.deletemangergrade({grade_id:text.grade_id});
    console.log(deleteres)
    this.getList()
  }


//点击修改按钮
amend = async (text:any)=>{
  // console.log(text)
  this.setState({visible:true,disabled:true,bjVal:text.grade_name,roomtext:text.room_text,subjecttext:text.subject_text,gradeid:text.grade_id})
}

//点击取消按钮
  handleCancel = (e: any) => {
    Modal.destroyAll();
    this.setState({
      visible: false,
      bjVal:'',
      open:true,
      roomtext:'请选择教室号',
      subjecttext:'课程名',
    });
  };

  //选择教室下拉菜单
  gradeChange = (value:any) => {
    this.setState({gradeVal:value})
  };

   //选择课程下拉菜单
  subjectChange = (value:any) => {
    this.setState({subjectVal:value})
  };
  public render() {
    let { data,examsubjectArr ,subjectAll,disabled,bjVal,roomtext,subjecttext,open} = this.state;
    
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
            onOk={this.handleOks}
            onCancel={this.handleCancel}
            cancelText={"取消"}
            okText={"确定"}
            destroyOnClose={true}
          >
            <p>班级名:</p>


            <Input
              placeholder="班级名"
              disabled={disabled}
              value={bjVal}
              onChange={(e)=>{
                this.setState({bjVal:e.target.value})
              }}
            />
            <p>教室号:</p>
            <Select placeholder="请选择教室号" defaultValue={roomtext} defaultActiveFirstOption={false} style={{ width: "100%"}} onSelect	={this.gradeChange}>
              {
                subjectAll && subjectAll.map((item:any,index:any)=>{
                 return <Option value={item.room_id} key={item.room_text}>{item.room_text}</Option>
                })
              }
            </Select>
            <p>课程名:</p>
            <Select placeholder="课程名" defaultValue={subjecttext} defaultActiveFirstOption={false} style={{ width: "100%" }}  onSelect	={this.subjectChange}  >
              {
                examsubjectArr && examsubjectArr.map((item:any,index:any)=>{
                  return  <Option value={item.subject_id} key={item.subject_text}>{item.subject_text}</Option>
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
              render={(text:any, record: any) => (
                <span>
                  <a onClick={this.amend.bind(this,text)}>修改</a>
                  <Divider type="vertical" />
                  <a onClick={this.deletegrade.bind(this,text)}>删除</a>
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