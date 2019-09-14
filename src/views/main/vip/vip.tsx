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
  room:any;
  history:any
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
    subject.data.map((item:any,index:number)=>item.key=index)
    this.setState({ data: subject.data });
  };


  public correct(text:any){
    this.props.history.push({pathname:'/main/vipCorrect',query:{id:text.grade_id}})
  }

  public componentDidMount() {
    this.getList();
  }
  state = {
    data: [],
  };
  public render() {
    let { data } = this.state;
    
    return (
      <div className="demo-infinite-container">
        <header>
          <h2 className="logo-title">待批班级</h2>
        </header>  

        <div
          className="main"
          style={{ marginBottom: "20px", background: "#fff" }}
        >
          <Table dataSource={data}>
            <Column title="班级名" dataIndex="grade_name" key="grade_name" />
            <Column
              title="课程名称"
              dataIndex="subject_text"
              key="subject_text"
            />
            <Column title="批卷状态" dataIndex="" key="" />
            <Column
              title="课程名称"
              dataIndex="subject_text"
              key="key"
            />
            <Column title="成材率" dataIndex="room_text" key="room_text" />
            <Column
              title="操作"
              key="操作"
              render={(text, record: any) => (
                <span>
                  <a onClick={this.correct.bind(this,text)}>批卷</a>
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
