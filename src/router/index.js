import React, { Suspense,Component } from "react";
import { BrowserRouter } from 'react-router-dom'
import RouteConfig from "./RouteConfig"
import RouteView from "./RouteView"


class RouterIndex extends Component {
  render() {
    return <BrowserRouter>
      {/* 页面没有加载出来显示loading... */}
      <Suspense fallback={<div>loading...</div>}>
        <RouteView children={RouteConfig} />
      </Suspense>
    </BrowserRouter>
  }
}

export default RouterIndex


