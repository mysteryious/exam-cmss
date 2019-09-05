import React, { Component } from "react";
import { Redirect, Route, Switch } from 'react-router-dom'


class RouteView extends Component{
  render() {
    return (
<Switch>
  {this.props.children.map((item, index) => {
    if (item.redirect) {
      return <Redirect key={index} from={item.path} to={item.redirect}></Redirect>
    } else {
      return <Route key={index} path={item.path} render={(props) => {
        return <item.component children={item.children} {...props}></item.component>
      }}></Route>
    }
  })}
</Switch>
    )
  }
}
export default RouteView
