package ndhu.tw.MaasService.controller;

import ndhu.tw.MaasService.db.model.Orders;
import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.model.request.BookingRequestModel;
import ndhu.tw.MaasService.model.request.ChangeOrderStatusCodeRequest;
import ndhu.tw.MaasService.service.MaasService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/fixed")
public class FixedConstroller {

    private final MaasService maasService;
    public FixedConstroller(MaasService maasService) {
        this.maasService = maasService;
    }

    @PostMapping(value = "/changeOrderStatusCode", produces = "application/json")
    public @ResponseBody
    BaseModel changeOrderStatusCode(@RequestBody Orders request) {
        return maasService.changeOrderStatusCode(request);
    }

    @GetMapping(value = "/getOrderAgreeList", produces = "application/json")
    public @ResponseBody
    BaseModel getOrderAgreeList(Long userId) {
        return maasService.getOrderAgreeList(userId);
    }

    @GetMapping(value = "/getOrderAgreeListCount", produces = "application/json")
    public @ResponseBody
    BaseModel getOrderAgreeListCount(Long userId) {
        return maasService.getOrderAgreeListCount(userId);
    }
}
