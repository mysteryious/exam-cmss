import  {observable,action} from 'mobx';
import {getmangerroom} from '@/api/index';

class room {
    //获取已经分配教室的班级
    @action async getmangerroom(params:any):Promise<any>{
        let result:any = await getmangerroom();
        return result
    }
}

export default room