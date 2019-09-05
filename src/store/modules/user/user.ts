import { observable, action } from "mobx"
import { userLogin } from "@/api/user"
import { getocaltion, setocaltion, removeltion } from "@/utils/login"
import {setToken} from "@/utils/cookie"

interface LoginFrom {
    user_name: string,
    user_pwd: string,
    remember: boolean,
    autoLogin:boolean
}


class User {
    @observable isLogin: boolean = false;
    @observable account: any = getocaltion() === null ? "" : getocaltion()

    @action async login(from: LoginFrom): Promise<object> {
        const result: any = await userLogin(from);

        //是否记住密码
        if (result.code === 1) {
            if (from.remember) {
                setocaltion(from)
            } else {
                removeltion()
            }
        }

        // // 判断是否七天免登录
        if (from.autoLogin){
            setToken(result.token);
        }

        return { ...result }
    }
}

export default User
