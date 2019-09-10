import * as React from "react"
import { observable, action } from "mobx"

class Global {
  @observable locale: string = "zh"
  
  @action setGlobal(locale:string){
    this.locale=locale;
  }
}

export default Global