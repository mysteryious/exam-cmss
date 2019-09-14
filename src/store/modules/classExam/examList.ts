import  {observable,action} from 'mobx';
import {getexamList,examDetail} from '@/api/index';

class examlist {
    //获取试卷列表
    @action async getexamList(params:any):Promise<any>{
        let result:any = await getexamList();
        return result
    }
    //获取试卷详情
    @action async examDetail(params:any):Promise<any>{
        let result:any = await examDetail(params);
        return result
    }
}

export default examlist 