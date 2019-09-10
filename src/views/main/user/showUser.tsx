import * as React from "react"
import { Tabs, Table } from 'antd';
import "@/styles/user/showuser.css"
import { inject, observer } from "mobx-react"
const { TabPane } = Tabs;

interface PropInto {
  showuser: any
}


let tabs = [
  {
    id: 1,
    tab: "用户数据",
    dataSource:[],
    columns: [
      {
        title: '用户名',
        dataIndex: 'user_name',
        key: 'user_name'
      },
      {
        title: '密码',
        dataIndex: 'user_pwd',
        key: 'user_pwd'
      },
      {
        title: '身份',
        dataIndex: 'identity_text',
        key: 'identity_text'
      }
    ]
  },
  {
    id: 2,
    tab: "身份数据",
    dataSource:[],
    columns: [
      {
        title: '身份名称',
        dataIndex: 'identity_text',
        key: 'identity_text'
      }
    ]
  },
  {
    id: 3,
    tab: "API接口数据",
    dataSource:[],
    columns: [
      {
        title: 'API权限名称',
        dataIndex: 'api_authority_text',
        key: 'api_authority_text'
      },
      {
        title: 'API权限url',
        dataIndex: 'api_authority_url',
        key: 'api_authority_url'
      },
      {
        title: 'api权限方法',
        dataIndex: 'api_authority_method',
        key: 'api_authority_method'
      }
    ]
  },
  {
    id: 4,
    tab: "身份和API接口关系",
    dataSource:[],
    columns: [
      {
        title: '身份名称',
        dataIndex: 'identity_text',
        key: 'identity_text'
      },
      {
        title: 'API权限名称',
        dataIndex: 'api_authority_text',
        key: 'api_authority_text'
      },
      {
        title: 'API权限url',
        dataIndex: 'api_authority_url',
        key: 'api_authority_url'
      },
      {
        title: 'api权限方法',
        dataIndex: 'api_authority_method',
        key: 'api_authority_method'
      }
    ]
  },
  {
    id: 5,
    tab: "视图接口权限",
    dataSource:[],
    columns: [
      {
        title: '视图权限名称',
        dataIndex: 'view_authority_text',
        key: 'view_authority_text'
      },
      {
        title: '视图id',
        dataIndex: 'view_id',
        key: 'view_id'
      }
    ]
  },
  {
    id: 6,
    tab: "身份和视图权限关系",
    dataSource:[],
    columns: [
      {
        title: '身份',
        dataIndex: 'identity_text',
        key: 'identity_text'
      },
      {
        title: '视图权限名称',
        dataIndex: 'view_authority_text',
        key: 'view_authority_text'
      },
      {
        title: '视图id',
        dataIndex: 'view_id',
        key: 'view_id'
      }
    ]
  }
]



@inject("showuser")
@observer



class questionsType extends React.Component<PropInto>{
  constructor(props: any) {
    super(props);
  }

  state = {
    ind: 0,
    url:['/user','/identity','/api_authority','/identity_api_authority_relation','/view_authority','/identity_view_authority_relation'],
    tabs
  }

  tabClick = async(index:any) =>{
    let {url} = this.state;
    //获取用户展示页面数据
      let data = await this.props.showuser.getShowUserdata(url[index-1]);
      tabs[index-1].dataSource = data
      this.setState({tabs})
  }

  public componentDidMount() {
    //获取数据
    this.tabClick(1)
  }


  public render() {
    const { ind ,tabs} = this.state
    return (
      <div className="question">
        <header>
          <h2 className="logo-title">用户展示</h2>
        </header>

        <div className='main' style={{ marginBottom: '20px', background: '#fff' }}>
          <Tabs type="card" onTabClick={this.tabClick.bind(this)}>
            {
              tabs && tabs.map((item:any) => {
                return <TabPane tab={item.tab} key={JSON.stringify(item.id)}>
                  <h2>{item.tab}</h2>
                  <Table columns={item.columns} dataSource={item.dataSource}  rowKey="user_id" />
                </TabPane>
              })
            }
          </Tabs>
        </div>
      </div>
    )
  }
}

export default questionsType
