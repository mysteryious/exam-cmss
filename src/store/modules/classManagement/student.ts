import {observable,action} from 'mobx'
import {getmangerstudentnew,getmangerstudent,deletemangerstudent} from '@/api/index';

class student {
    //获取没有分配教室的班级
    @action async getmangerstudentnew(params:any):Promise<any>{
        let result:any = await getmangerstudentnew();
        return result
    }
    //获取所有已经分班的学生的接口
    @action async getmangerstudent(params:any):Promise<any>{
        let result:any = await getmangerstudent();
        return result
    }
    //删除学生接口
    @action async deletemangerstudent(params:any):Promise<any>{
        let result:any = await deletemangerstudent(params.id);
        return result
    }
}
export default student  