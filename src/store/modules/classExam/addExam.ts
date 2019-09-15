import { observable, action } from 'mobx';
import { getexamType, setexamList, SETexamList } from '@/api/index';

class exam {
    //获取考试类型
    @action async getexamType(params: any): Promise<any> {
        let result: any = await getexamType();
        return result
    }
    //创建试卷
    @action async setexamList(params: any): Promise<any> {
        let result: any = await setexamList(params);
        return result
    }
    //更新试卷
    @action async SETexamList(params: any): Promise<any> {
        let result: any = await SETexamList(params);
        return result
    }
}

export default exam    