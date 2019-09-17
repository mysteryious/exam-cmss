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
import { FormComponentProps } from "antd/lib/form/Form";
import { observer, inject } from "mobx-react";
import { injectIntl } from "react-intl";
import * as XLSX from "xlsx";
import "@/styles/classMangement/student.css";

const { Column, ColumnGroup } = Table;
const { Option } = Select;

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
    subject.data.map((item: any, index: number) => (item.key = index));

    const subjectAll = await this.props.room.getmangerroom();
    const mangergradeAll = await this.props.grade.getmangergrade();
    mangergradeAll.data.map((item: any, index: number) => (item.key = index));

    this.setState({
      mangerstudentAll: subject.data,
      subjectAll: subjectAll.data,
      mangergradeAll: subject.data
    });
  };


  public componentDidMount() {
    this.getList();
  }
  state = {
    mangerstudentAll: [],
    subjectAll: [],
    mangergradeAll: [],
    student_name: "",
    room_text: "",
    grade_name: ""
  };
  //获取ipt的值
  handleNumberChange = (e: any) => {
    this.setState({ student_name: e.target.value });
  };
  //教室号的下拉菜单
  roomChange = (e: any) => {
    this.setState({ room_text: e });
  };
  //班级号的下拉菜单
  gradeChange = (e: any) => {
    this.setState({ grade_name: e });
  };
  //点击搜索按钮
  handleSubmit = async () => {
    let { student_name, room_text, grade_name } = this.state;

    const subject = await this.props.student.getmangerstudent();
    subject.data.map((item: any, index: number) => (item.key = index));
    let mangerstudentAll = subject.data;
    let filterArr = mangerstudentAll;
    filterArr = mangerstudentAll.filter((item: any, index: any) => {
      if (student_name && room_text && grade_name) {
        return item.grade_name == grade_name && item.room_text == room_text && item.student_name == student_name
      } else if (room_text && grade_name) {
        return item.room_text == room_text && item.grade_name == grade_name
      } else if (student_name && grade_name) {
        return item.student_name == student_name && item.grade_name == grade_name
      } else if (student_name && room_text) {
        return item.student_name == student_name && item.room_text == room_text
      } else if (grade_name) {
        return item.grade_name == grade_name
      } else if (room_text) {
        return item.room_text == room_text
      } else if (student_name) {
        return item.student_name == student_name
      } else {
        return mangerstudentAll
      }
    });
    this.setState({ mangerstudentAll: filterArr });
  };
  //点击重置按钮
  reset = () => {
    this.props.form.resetFields();
    this.setState({ student_name: "", room_text: "", grade_name: "" });
    this.getList();
  };
  //点击删除按钮
  deleteTabble = async (text: any) => {
    const subject = await this.props.student.deletemangerstudent({
      id: text.student_id
    });
    this.getList();
  };

  //点击导出按钮
  exportExcel = () => {
    // 1.把table里面的数据生成worksheet
    let wroksheet = XLSX.utils.json_to_sheet(this.state.mangerstudentAll);

    // 2.把worksheet放到workbook里
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, wroksheet);
    XLSX.utils.book_append_sheet(workbook, wroksheet);
    XLSX.utils.book_append_sheet(workbook, wroksheet);
    XLSX.utils.book_append_sheet(workbook, wroksheet);
    XLSX.utils.book_append_sheet(workbook, wroksheet);

    XLSX.writeFile(workbook, "学生名单.xlsx");
  };

  uploadExcel = (e: any) => {
    let reader = new FileReader();
    reader.onload = function(e: any) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: "array" });

      var ws = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]]
      );
    };

    reader.readAsArrayBuffer(e.target.files[0]);
  };

  public render() {
    let { mangerstudentAll, subjectAll, mangergradeAll } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="demo-infinite-container">
        <header>
          <h2 className="logo-title">学生管理</h2>
        </header>
        <div className="iptbox">
          <Form layout="inline">
            <Form.Item>
              <span>
                {getFieldDecorator("输入学生姓名", {
                  initialValue: ""
                })(
                  <Input
                    type="text"
                    placeholder="输入学生姓名"
                    onChange={this.handleNumberChange}
                    style={{ width: 200, marginRight: "3%" }}
                  />
                )}
              </span>
            </Form.Item>
            <Form.Item>
              <span>
                {getFieldDecorator("请选择教室号", {
                  // initialValue: "请选择教室号"
                })(
                  <Select
                    placeholder="请选择教室号"
                    style={{ width: 200, marginRight: "3%" }}
                    onChange={this.roomChange}
                  >
                    {subjectAll &&
                      subjectAll.map((item: any, index: any) => {
                        return (
                          <Option value={item.room_text} key={item.room_text}>
                            {item.room_text}
                          </Option>
                        );
                      })}
                  </Select>
                )}
              </span>
            </Form.Item>
            <Form.Item>
              <span>
                {getFieldDecorator("班级名", {
                  // initialValue: "班级名"
                })(
                  <Select
                    placeholder="班级名"
                    style={{ width: 200, marginRight: "3%" }}
                    onChange={this.gradeChange}
                  >
                    {mangergradeAll &&
                      mangergradeAll.map((item: any, index: any) => {
                        return (
                          <Option value={item.grade_name} key={item.grade_id}>
                            {item.grade_name}
                          </Option>
                        );
                      })}
                  </Select>
                )}
              </span>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleSubmit}
              >
                搜索
              </Button>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("重置", {
                initialValue: "",
                resetFields: (e: any) => {
                  console.log(e);
                }
              })(<Button onClick={this.reset}>重置</Button>)}
            </Form.Item>
          </Form>
          <Button
            type="primary"
            onClick={this.exportExcel}
            style={{ marginLeft: "10px" }}
          >
            导出学生名单
          </Button>
          <Button type="primary" style={{ marginLeft: "10px" }}>
            <input type="file" accept=".xlsx" onChange={this.uploadExcel} />
          </Button>
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
                  <a onClick={this.deleteTabble.bind(this, text)}>删除</a>
                </span>
              )}
            />
          </Table>
        </div>
      </div>
    );
  }
}

export default Form.create()(ClassMangement);
