import  {observable,action} from 'mobx';
import {getexamStudent} from '@/api/index';

class vipCorrect {
    //获取已经分配教室的班级
    @action async getexamStudent(params:any):Promise<any>{
        let result:any = await getexamStudent(params);
        return result
    }

}

export default vipCorrect  