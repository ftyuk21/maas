package ndhu.tw.MaasService.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.model.request.PostModel;
import ndhu.tw.MaasService.service.MaasService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Maas Controller")
@Controller
@RequestMapping(value = "/maas")
public class MaasController {
    private MaasService maasService;


    @Operation(summary = "get API")
    @GetMapping(value = "/get", produces = "application/json")  // 這邊的value 是指你要別人輸入的網址  ex. https:xxxxx/maas/"get"
    public @ResponseBody
    BaseModel getAPIExample(Integer id,String orderCode) { // 這邊的括號放要前端輸入的請求參數 ex.Integer id、String orderCode
        return maasService.getApiExample(id,orderCode);
    }

    @Operation(summary = "post API")
    @PostMapping(value = "/post", produces = "application/json")
    public @ResponseBody
    BaseModel postAPIExample(PostModel request) { // 這邊的括號放要前端輸入的請求參數 在post因為是一大串  所以要用一個class把他包起來
        // 這邊的步驟比較繁雜一點
        /*
        * 1. 先新增一個model  因為通常post會傳送一大串的請求參數 ex.{id:5,orderCode:123456,name:XXX} ->參考model/PostModel.java
        * 2. 把整串傳送到service裡面執行
        * */

        return maasService.postApiExample(request);
    }


    // 這邊我後面一點在寫  delete跟get差不多一樣傳一個參數
//    @Operation(summary = "post API")
//    @DeleteMapping(value = "/delete", produces = "application/json")
//    public @ResponseBody
//    BaseModel deleteAPIExample(Integer id,String orderCode) { // 這邊的括號放要前端輸入的請求參數 ex.Integer id、String orderCode
//        return maasService.getApiExample(id,orderCode);
//    }
}
