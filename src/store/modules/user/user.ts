import { observable, action } from "mobx"
import { userLogin, getUserInfo, getViewAuthority,updateUser } from "@/api/user"
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
    @observable avatar: string = '';

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
    // 获取用户信息
    @action async getUserInfo(): Promise<any> {
        let userInfo: any = await getUserInfo();
        this.userInfo = userInfo.data;
        this.avatar = userInfo.data.avatar;
        this.getViewAuthority();
        return userInfo.data
    }

    // 获取用户权限
    @action async getViewAuthority(): Promise<any> {
        let viewAuthority: any = await getViewAuthority();
        this.viewAuthority = viewAuthority.data;
        return viewAuthority.data
    }

    // 更新用户信息
    @action async updateUser(params:any): Promise<any> {
        let result: any = await updateUser(params);
        return result
    }
}

export default User
