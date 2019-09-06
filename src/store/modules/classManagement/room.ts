import  {observable,action} from 'mobx';
import {getmangerroom,addmangerroom,deletemangerroom} from '@/api/index';

class room {
    //获取已经分配教室的班级
    @action async getmangerroom(params:any):Promise<any>{
        let result:any = await getmangerroom();
        return result
    }

    //添加教室号接口
    @action async addmangerroom(params:any):Promise<any>{
        let result:any = await addmangerroom(params);
        return result
    }

    //删除教室号接口
    @action async deletemangerroom(params:any):Promise<any>{
        let result:any = await deletemangerroom(params);
        console.log(params,'params',result,'result')
        return result
    }
}

export default room  