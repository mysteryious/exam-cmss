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
  };
  public render() {
    let { data } = this.state;
    // console.log(data)
    
    return (
      <div className="demo-infinite-container">
        <header>
          <h2 className="logo-title">待批班级</h2>
        </header>

        <div
          className="main"
          style={{ marginBottom: "20px", background: "#fff" }}
        >
          <Table dataSource={data} pagination={false} rowKey="grade_name" >
            <Column title="班级名" dataIndex="grade_name" key="grade_name" />
            <Column
              title="课程名称"
              dataIndex="subject_text"
              key="subject_text"
            />
            <Column title="批卷状态" dataIndex="" key="" />
            {/* <Column
              title="课程名称"
              dataIndex="subject_text"
              key="subject_text"
            /> */}
            <Column title="成材率" dataIndex="room_text" key="room_text" />
            <Column
              title="操作"
              key="操作"
              render={(text, record: any) => (
                <span>
                  <a>批卷</a>
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
