import * as React from 'react';
import * as ReactDOM from 'react-dom';
//引入全局样式内部有antd样式
import "./styles/App.css"

import App from './App';

// 引入mobx实例
import {Provider} from 'mobx-react';
import store from './store'



ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  
  document.getElementById('root') as HTMLElement
);
