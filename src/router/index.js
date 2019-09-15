import * as React from "react";
import { Router } from "react-router"
import RouteConfig from "./RouteConfig"
import RouteView from "./RouteView"
const history = require("history").createHashHistory()

//路由守卫
import guard, { filterView } from "@/utils/permission"
import { observer } from 'mobx-react';



guard(history)


class RouterIndex extends React.Component {
  render() {
    const myRoutes = filterView(RouteConfig);

    return <Router history={history}>
      {/* 页面没有加载出来显示loading... */}
      <React.Suspense fallback={<div>loading...</div>}>
        <RouteView children={RouteConfig} />
      </React.Suspense>
    </Router>
  }
}


export default observer(RouterIndex)

