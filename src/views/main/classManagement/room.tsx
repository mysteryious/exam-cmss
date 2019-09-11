import * as React from "react";
import { Table, Divider, Tag, Button, Modal, Input, Form } from "antd";
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;
import { FormComponentProps } from "antd/lib/form/Form";
import { observer, inject } from "mobx-react";
import "@/styles/classMangement/room.css";

interface Props extends FormComponentProps {
  room: any;
  data: any;
  form: any;
}

@inject("room")
@observer
class ClassMangement extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  //删除教室号
  public deleteRoom = async (text: any, record: any) => {
    let config = {};
    config = {
      title: "您要修改吗？",
      content: "确定要删除此教室吗？",
      onOk: async () => {
        console.log("queding ");
        const subject = await this.props.room.deletemangerroom({
          room_id: text.room_id
        });
        this.getList();
      }
    };
    confirm({
      ...config,
      cancelText: "取消",
      okText: "确定"
    });
  };

  public getList = async () => {
    //获取全部教室
    const subject = await this.props.room.getmangerroom();
    subject.data.map((item: any, index: number) => (item.key = index));
    this.setState({ data: subject.data });
  };

  public componentDidMount() {
    this.getList();
  }
  //弹出框
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  //确认按钮
  handleOk = async (e: any) => {
    let { roomVal } = this.state;
    //添加教室号接口
    const subject = await this.props.room.addmangerroom({ room_text: roomVal });
    this.getList();
    // console.log(subject)
    this.setState({
      visible: false
    });
  };
  //取消按钮
  handleCancel = (e: any) => {
    // console.log(e.target.value);
    this.setState({
      visible: false
    });
  };
  state = {
    data: [],
    visible: false,
    roomVal: ""
  };
  public render() {
    let { data, roomVal } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="demo-infinite-container">
        <header>
          <h2 className="logo-title">教室管理</h2>
        </header>

        <div
          className="main"
          style={{ marginBottom: "20px", background: "#fff" }}
        >
          <Button type="primary" icon="plus" onClick={this.showModal}>
            添加教室
          </Button>
          <Modal
            title="教室号"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            cancelText={"取消"}
            okText={"确定"}
          >
            <Form.Item label="教室号" hasFeedback>
              {getFieldDecorator("room", {
                rules: [
                  {
                    required: true,
                    message: "Please input your room!"
                  }
                ]
              })(
                <Input
                  placeholder="教室名"
                  onChange={e => {
                    this.setState({ roomVal: e.target.value });
                  }}
                />
              )}
            </Form.Item>
          </Modal>
          <Table dataSource={data} pagination={false}>
            <Column title="教室号" dataIndex="room_text" key="room_text" />
            <Column
              title="操作"
              key="操作"
              render={(text, record: any) => (
                <span onClick={this.deleteRoom.bind(this, text, record)}>
                  删除
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
