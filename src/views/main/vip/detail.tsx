import * as React from "react";
import { Table, Divider, Tag, Button, Modal,Input ,Form,Select,Radio } from "antd";
const { Option } = Select;
const { Column, ColumnGroup } = Table;
import { observer, inject } from "mobx-react";
import "@/styles/classExam/examList.css";

interface Props {
  grade:any,
  exam:any,
  examlist:any,
  history:any,
  vipCorrect:any
}

@inject("grade","exam",'examlist','vipCorrect')
@observer
class vipCorrect extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

 
  public componentDidMount() {

  }

  state = {
    
  };


  public render() {
      let {id} = this.props.history.location.query;
    return (
      <div className="demo-infinite-container">
                详情{id}
      </div>
    );
  }
}

export default vipCorrect;
