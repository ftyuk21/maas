package ndhu.tw.MaasService.service;

import ndhu.tw.MaasService.model.BaseModel;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {

    public BaseModel hello(){
        BaseModel res = new BaseModel();
        res.setData("HI!");
        return res;
    }
}
