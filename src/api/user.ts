import * as port from "./port/index"
import request from "../utils/request"



export let userLogin=(data: object)=>{
    return request.post(port.Userlogin,data)
}