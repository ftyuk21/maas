package ndhu.tw.MaasService.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import ndhu.tw.MaasService.db.model.Orders;
import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.model.request.BookingRequestModel;
import ndhu.tw.MaasService.model.response.BookingResponseModel;
import ndhu.tw.MaasService.service.MaasService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Tag(name = "乘車者")
@Controller
@RequestMapping(value = "/passenger")
public class BookingController {

    private final MaasService maasService;

    public BookingController(MaasService maasService) {
        this.maasService = maasService;
    }

    @Operation(summary = "1.1 乘車者下單")
    @PostMapping(value = "/bookings", produces = "application/json")
    public @ResponseBody
    BaseModel createBooking(@RequestBody Orders request) {
        return maasService.createBooking(request);
    }


    @Operation(summary = "1.2 乘車者查看訂單")
    @GetMapping(value = "/available-booking", produces = "application/json")
    public @ResponseBody
    BaseModel CheckOrder(@Parameter(description = "乘車者ID") @RequestParam(required = false)  Long custormerID) {
        // 使用 MaasService 中的方法來獲取可接單列表
        return maasService.CheckOrder();
    }
}

