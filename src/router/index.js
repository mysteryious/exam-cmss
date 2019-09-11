import React, { Suspense, Component } from "react";
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



// import React, { Suspense, Component } from "react";
// import { Router } from "react-router"
// import RouteConfig from "./RouteConfig"
// import RouteView from "./RouteView"
// const history = require("history").createBrowserHistory()

// // //路由守卫
// // import guard, { filterView } from "@/utils/permission"

// // const myRoutes = filterView(RouteConfig);
// // console.log('myRoutes...', myRoutes);


// // guard(history)


// class RouterIndex extends Component {
//   render() {
//     <Router history={history}>
//       {/* 页面没有加载出来显示loading... */}
//       <Suspense fallback={<div>loading...</div>}>
//         <RouteView children={RouteConfig} />
//       </Suspense>
//     </Router>
//   }
// }


// export default RouterIndex

