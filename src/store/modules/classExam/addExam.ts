import  {observable,action} from 'mobx';
import {getexamType} from '@/api/index';

class exam {
    //获取考试类型
    @action async getexamType(params:any):Promise<any>{
        let result:any = await getexamType();
        return result
    }
    
}

export default exam  