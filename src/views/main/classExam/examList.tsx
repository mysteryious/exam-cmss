import * as React from "react";
import { Table, Divider, Tag, Button, Modal,Input ,Form} from "antd";
const { Column, ColumnGroup } = Table;
import { observer, inject } from "mobx-react";
import "@/styles/classMangement/room.css";

interface Props {
  room:any
}

@inject("room")
@observer
class ExamList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
 
  state = {

  };
  public render() {
    return (
      <div className="demo-infinite-container">
        <header>
          <h2 className="logo-title">试卷列表</h2>
        </header>

        <div
          className="main"
          style={{ marginBottom: "20px", background: "#fff" }}
        >
        454
        </div>
      </div>
    );
  }
}

export default ExamList;
