import * as React from "react";
import { Table, Divider, Tag,Button } from "antd";
const { Column, ColumnGroup } = Table;
import { observer, inject } from "mobx-react";
import "@/styles/classMangement/room.css"

interface Props {
  room: any;
  data: any,
}

@inject("room")
@observer
class ClassMangement extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public getList = async () => {
    //获取已经分配教室的班级
    const subject = await this.props.room.getmangerroom();
    this.setState({data:subject.data})
  }

  public componentDidMount() {
    this.getList()
  }
  state = {
    data: []
  }
  public render() {
      let {data} = this.state;
    return (
      <div className="demo-infinite-container">
        <header>
          <h2 className="logo-title">教室管理</h2>
        </header>
        
        <div  className='main' style={{ marginBottom: '20px', background: '#fff' }}>
            <Button type='primary' icon='plus'>添加教室</Button>
            <Table dataSource={data} pagination={false} >
            <Column title="教室号" dataIndex="room_text" key="room_text" />
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
        </div>
      </div>
    );
  }
}

export default ClassMangement;
