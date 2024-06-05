package ndhu.tw.MaasService.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import ndhu.tw.MaasService.db.model.Orders;
import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.model.request.BookingRequestModel;
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
    BaseModel createBooking(@RequestBody BookingRequestModel request) {
        return maasService.createBooking(request);
    }


    @Operation(summary = "1.2 乘車者查看訂單")
    @GetMapping(value = "/checkOrder", produces = "application/json")
    public @ResponseBody
    BaseModel checkOrder(@Parameter(description = "使用者ID") @RequestParam(required = false)  Long userId) {
        // 使用 MaasService 中的方法來獲取可接單列表
        return maasService.CheckOrder(userId);
    }


    @Operation(summary = "1.3 查看訂單詳情 - 單筆")
    @GetMapping(value = "/getOrder", produces = "application/json")
    public @ResponseBody
    BaseModel getOrder(@Parameter(description = "訂單ID") @RequestParam(required = false)  Long orderId) {
        // 使用 MaasService 中的方法來獲取可接單列表
        return maasService.getOrder(orderId);
    }
}

