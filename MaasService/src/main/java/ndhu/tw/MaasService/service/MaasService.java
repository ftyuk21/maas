package ndhu.tw.MaasService.service;

import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.model.request.PostModel;
import org.springframework.stereotype.Service;

@Service
public class MaasService {
    public BaseModel getApiExample(Integer id,String orderCode){
        BaseModel res = new BaseModel();
//        res.setData(); // 這邊放要回傳的資料  放在()裡面
        return res;
    }

    public BaseModel postApiExample(PostModel request){
        BaseModel res = new BaseModel();
        // 通常要在這邊去跟資料庫要資料
        // 然後處理資料
        // 放入PostResponseModel裡面(但目前還沒串資料庫所以先不用作這一段)
        // 然後放到BaseModel中 return回去
//        res.setData(); // 這邊放要回傳的資料  放在()裡面
        return res;
    }
}
