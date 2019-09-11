import * as React from "react";
import * as Moment from 'moment';
import {
  Table,
  Divider,
  Tag,
  Button,
  Modal,
  Input,
  Form,
  Select,
  InputNumber,
  DatePicker,
} from "antd";
const { MonthPicker, RangePicker } = DatePicker;
const { Option } = Select;
const { Column, ColumnGroup } = Table;
import { observer, inject } from "mobx-react";
import "@/styles/classExam/addExam.css";

interface Props {
  grade: any;
  subject_id: any;
  exam: any;
  moment:any
}

@inject("room", "grade", "exam")
@observer
class AddExam extends React.Component<Props> {
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

  handleNumberChange = (value: any) => {
    console.log(value);
    this.setState({
      number: {
        inputNumber: value
      }
    });
  };
  state = {
    examsubjectArr: [],
    examType: [],
    inputNumber: ""
  };
  public componentDidMount() {
    this.getSubject();
    this.getExamType();
  }



  public render() {
    let { examsubjectArr, examType, inputNumber } = this.state;
    return (
      <div className="demo-infinite-container">
        <header>
          <h2 className="logo-title">添加考试</h2>
        </header>

        <div
          className="main"
          style={{ marginBottom: "20px", background: "#fff" }}
        >
          <div className="iptbox">
            <p>试卷名称:</p>
            <Input style={{ width: 400, height: 30 }}></Input>
          </div>
          <div className="iptbox">
            <p>选择考试类型:</p>
            <Select defaultValue="" style={{ width: 130, height: 30 }}>
              {examType &&
                examType.map((item: any, index: any) => {
                  return (
                    <Option value={item.exam_id} key={item.exam_id}>
                      {item.exam_name}
                    </Option>
                  );
                })}
            </Select>
          </div>
          <div className="iptbox">
            <p>选择课程:</p>
            <Select defaultValue="" style={{ width: 130, height: 30 }}>
              {examsubjectArr &&
                examsubjectArr.map((item: any, index: any) => {
                  return (
                    <Option value={item.subject_id} key={item.subject_id}>
                      {item.subject_text}
                    </Option>
                  );
                })}
            </Select>
          </div>
          <div className="iptbox">
            <p>设置题量:</p>
            <InputNumber min={3} max={10} onChange={this.handleNumberChange} />
          </div>
          <div className="iptbox">
            <p>考试时间:</p>
            <DatePicker
              placeholder="开始时间"
              locale={{
                "lang": {
                  "now": "此刻",
                  "ok": "确定",
                  "timeSelect": "选择时间",
                }
              }}
              showToday={true}
              
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              showTime={{ defaultValue: Moment("00:00:00", "HH:mm:ss") }}
            />
            &nbsp;
            -
            &nbsp;

            <DatePicker
              placeholder="结束时间"
              locale={{
                "lang": {
                  "now": "此刻",
                  "ok": "确定",
                  "timeSelect": "选择时间",
                }
              }}
              showToday={true}
              
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              showTime={{ defaultValue: Moment("00:00:00", "HH:mm:ss") }}
            />
          </div>
          <div className="iptbox">
            <Button type="primary">
              创建试卷
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
}
function range(start:any, end:any) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current:any) {
  return current && current < Moment().endOf('day');
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}


export default AddExam;
