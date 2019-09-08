import * as React from "react";
import {
  Table,
  Divider,
  Tag,
  Button,
  Pagination,
  Form,
  Input,
  Select
} from "antd";
const { Column, ColumnGroup } = Table;
const { Option } = Select;
import { FormComponentProps } from "antd/lib/form/Form";
import { observer, inject } from "mobx-react";
import "@/styles/classMangement/student.css";

interface Props extends FormComponentProps {
  student: any;
  data: any;
  form: any;
  room: any;
  grade: any;
}

@inject("student", "room", "grade")
@observer
class ClassMangement extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public getList = async () => {
    //获取所有已经分班的学生的接口
    const subject = await this.props.student.getmangerstudent();
    // console.log(subject.data);
    subject.data.map((item: any, index: number) => (item.key = index));
    this.setState({ mangerstudentAll: subject.data });
  };

  public getsubjectAll = async () => {
    //获取全部教室
    const subject = await this.props.room.getmangerroom();
    // console.log(subject)
    this.setState({ subjectAll: subject.data });
  };

  public mangergrade = async () => {
    //获取已经分配教室的班级
    const subject = await this.props.grade.getmangergrade();
    // console.log(subject)
    subject.data.map((item: any, index: number) => (item.key = index));
    this.setState({ mangergradeAll: subject.data });
  };

  public componentDidMount() {
    this.getList();
    this.getsubjectAll();
    this.mangergrade();
  }
  state = {
    mangerstudentAll: [],
    subjectAll: [],
    mangergradeAll: []
  };
  //获取ipt的值
  handleNumberChange = (e: any) => {
    console.log(e.target.value);
  };
  //教室号的下拉菜单
  roomChange = (e: any) => {
    console.log(e);
  };
  //班级号的下拉菜单
  gradeChange = (e: any) => {
    console.log(e);
  };
  //点击搜索按钮
  handleSubmit = (e: any) => {
    console.log(e);
  };
  //点击重置按钮
  reset = ()=>{

  }

  public render() {
    let { mangerstudentAll, subjectAll, mangergradeAll } = this.state;
    return (
      <div className="demo-infinite-container">
        <header>
          <h2 className="logo-title">学生管理</h2>
        </header>
        <div className="iptbox">
          <Form layout="inline">
            <Form.Item>
              <span>
                <Input
                  type="text"
                  placeholder="输入学生姓名"
                  onChange={this.handleNumberChange}
                  style={{ width: 200, marginRight: "3%" }}
                />
              </span>
            </Form.Item>
            <Form.Item>
              <span>
                <Select
                  placeholder="请选择教室号"
                  style={{ width: 200, marginRight: "3%" }}
                  onChange={this.roomChange}
                >
                  {subjectAll &&
                    subjectAll.map((item: any, index: any) => {
                      return (
                        <Option value={item.room_id} key={item.room_text}>
                          {item.room_text}
                        </Option>
                      );
                    })}
                </Select>
              </span>
            </Form.Item>
            <Form.Item>
              <span>
                <Select
                  placeholder="班级名"
                  style={{ width: 200, marginRight: "3%" }}
                  onChange={this.gradeChange}
                >
                  {mangergradeAll &&
                    mangergradeAll.map((item: any, index: any) => {
                      return (
                        <Option value={item.grade_id} key={item.grade_id}>
                          {item.grade_name}
                        </Option>
                      );
                    })}
                </Select>
              </span>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onChange={this.handleSubmit}
              >
                搜索
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onChange={this.reset}>重置</Button>
            </Form.Item>
          </Form>
        </div>
        <div
          className="main"
          style={{ marginBottom: "20px", background: "#fff" }}
        >
          <Table dataSource={mangerstudentAll}>
            <Column title="姓名" dataIndex="student_name" key="student_name" />
            <Column title="学号" dataIndex="student_id" key="student_id" />
            <Column title="班级" dataIndex="grade_name" key="grade_name" />
            <Column title="教室" dataIndex="room_text" key="room_text" />
            <Column title="密码" dataIndex="student_pwd" key="student_pwd" />
            <Column
              title="操作"
              key="操作"
              render={(text, record: any) => (
                <span>
                  <a>删除</a>
                </span>
              )}
            />
          </Table>
          {/* <div>
            <Pagination
              showQuickJumper={true}
              defaultCurrent={1}
              total={data.length}
              onChange={onChange}
            />
          </div> */}
        </div>
      </div>
    );
  }
}

export default Form.create()(ClassMangement);
