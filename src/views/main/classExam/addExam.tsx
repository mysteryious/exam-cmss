import * as React from "react";
import * as Moment from 'moment';
import { Table, Button, Input, Form, Select, InputNumber, DatePicker, message } from "antd";

import { observer, inject } from "mobx-react";
import { FormComponentProps } from "antd/lib/form/Form";

import "@/styles/classExam/addExam.css";

const { MonthPicker, RangePicker } = DatePicker;
const { Option } = Select;
const { Column, ColumnGroup } = Table;

interface UserFormProps extends FormComponentProps {
  user: any,
  grade: any,
  exam: any,
  moment: any,
  subject_id: any,
  history: any
}


@inject("grade", "exam")
@observer

class AddExam extends React.Component<UserFormProps, any> {

  public getSubject = async () => {
    //获取所有的课程
    const examsubjectArr = await this.props.grade.getexamsubject();
    //获取所有考试类型
    const examType = await this.props.exam.getexamType();

    this.setState({
      examType: examType.data,
      examsubjectArr: examsubjectArr.data
    });
  };




  handleChange = (value: any, name: string) => {
    this.setState({ [name]: value })
  }


  state = {
    examsubjectArr: [],
    examType: [],
    number: 4,//试卷题量
    subject_id: "",//课程id
    exam_id: "",//考试类型id
    title: "",//试题的标题
    start_time: "",//开始时间
    end_time: ""
  };

  public componentDidMount() {
    this.getSubject();
  }



  public render() {
    let { examsubjectArr, examType, number } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="demo-infinite-container">
        <header>
          <h2 className="logo-title">添加考试</h2>
        </header>

        <div className="main" style={{ marginBottom: "20px", background: "#fff" }} >

          <Form onSubmit={this.handleSubmit} >
            <Form.Item label="试卷名称">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your exam title!'
                  }
                ]
              })(<Input style={{ width: 400, height: 30 }} onChange={e => this.handleChange(e.target.value, "title")}></Input>)}
            </Form.Item>

            <Form.Item label="选择考试类型:">
              {getFieldDecorator('exam_id', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your exam type!'
                  }
                ]
              })(<Select style={{ width: 120 }} onChange={(value: any) => this.handleChange(value, "exam_id")}>
                {examType && examType.map((item: any, index: number) => {
                  return <Select.Option value={item.exam_id} key={index}>{item.exam_name}</Select.Option>
                })}
              </Select>)}
            </Form.Item>

            <Form.Item label="选择课程:">
              {getFieldDecorator('subject_id', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your subject!'
                  }
                ]
              })(<Select style={{ width: 130, height: 30 }} onChange={(value: any) => this.handleChange(value, "subject_id")}>
                {examsubjectArr && examsubjectArr.map((item: any, index: any) => {
                  return <Select.Option value={item.subject_id} key={index}>{item.subject_text}</Select.Option>
                })}
              </Select>)}
            </Form.Item>

            <Form.Item label="设置题量:">
              {getFieldDecorator('number', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your subject_id!'
                  }
                ]
              })(<InputNumber min={3} max={10} onChange={(value: any) => this.handleChange(value, "number")} />)}
            </Form.Item>

            <div className="time">
              <Form.Item label="考试时间">
                {getFieldDecorator('start_time', {
                  rules: [
                    {
                      required: true,
                      message: '请选择考试时间！',
                    }
                  ],
                })(<DatePicker showTime placeholder="开始时间" />)}
                <span className="span">-</span>
                {getFieldDecorator('end_time', {
                  rules: [
                    {
                      required: true,
                      message: '请选择考试时间！',
                    }
                  ],
                })(<DatePicker showTime placeholder="结束时间" />)}
              </Form.Item>
            </div>

            <div className="iptbox">
              <Button type="primary" htmlType="submit">
                创建试卷
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
  public handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        const { start_time, end_time } = values
        values.start_time = new Date(start_time._d).getTime()
        values.end_time = new Date(end_time._d).getTime()
        const data = await this.props.exam.setexamList(values);
        if (data.code === 1) {
          this.props.history.push({ pathname: "/main/editexam", state: { title: "创建试题", exam: data } })
        }
      }
    });
  };

}
function range(start: any, end: any) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current: any) {
  return current && current < Moment().endOf('day');
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}


export default Form.create()(AddExam);
