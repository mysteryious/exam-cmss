import * as React from 'react';
import RouterIndex from "./router/index";
import { Provider } from "mobx-react"
import store from "./store/index"
import { inject, observer } from "mobx-react"
import { IntlProvider } from "react-intl"
// //引入国际化

import zhCN from "@/lang/zh-US"
import enUS from "@/lang/en-US"

const localDate = {
  en: enUS,
  zh: zhCN
}


@inject('global')
@observer

class App extends React.Component<any> {
  public render() {
    return (
      <IntlProvider locale={this.props.global.locale} messages={localDate[this.props.global.locale]}>
        <RouterIndex />
      </IntlProvider>

    );
  }
}
export default App



