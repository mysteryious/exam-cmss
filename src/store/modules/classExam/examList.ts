import  {observable,action} from 'mobx';
import {getexamList} from '@/api/index';

class examlist {
    //获取试卷列表
    @action async getexamList(params:any):Promise<any>{
        let result:any = await getexamList();
        return result
    }
    
}

export default examlist 