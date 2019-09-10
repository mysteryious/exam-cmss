import { observable, action } from "mobx"
import { userLogin, getUserInfo, getViewAuthority } from "@/api/user"
import { getocaltion, setocaltion, removeltion } from "@/utils/login"
import { setToken } from "@/utils/cookie"

interface LoginFrom {
    user_name: string,
    user_pwd: string,
    remember: boolean,
    autoLogin: boolean
}


class User {
    @observable isLogin: boolean = false;
    @observable account: any = getocaltion("account") === null ? "" : getocaltion("account")
    @observable userInfo: object = {}
    @observable viewAuthority: object[] = [];


    @action async login(from: LoginFrom): Promise<object> {
        const result: any = await userLogin(from);

        //是否记住密码
        if (result.code === 1) {
            if (from.remember) {
                setocaltion("account", from)
            } else {
                removeltion("account")
            }
        }

        // // 判断是否七天免登录
        if (from.autoLogin) {
            setToken(result.token);
        }
        return { ...result }
    }
    @action async getUserInfo() {
        const userInfo: any = await getUserInfo();
        this.userInfo = userInfo.data;
        this.getViewAuthority();
        return userInfo.data
    }
    // 获取用户权限
    @action async getViewAuthority(): Promise<any> {
        let viewAuthority: any = await getViewAuthority();
        this.viewAuthority = viewAuthority.data;
        return viewAuthority.data
    }

}

export default User
