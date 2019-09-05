import * as React from 'react';
import RouterIndex from "./router/index";
import { Provider } from "mobx-react"
import store from "./store/index"

class App extends React.Component {
  public render() {
    return (
      <Provider {...store}>
        <RouterIndex />
      </Provider>

    );
  }
}

export default App;
