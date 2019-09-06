import {observable,action} from 'mobx'
import {getmangerstudentnew} from '@/api/index';

class student {
    //获取没有分配教室的班级
    @action async getmangerstudentnew(params:any):Promise<any>{
        let result:any = await getmangerstudentnew();
        return result
    }
}
export default student