package ndhu.tw.MaasService.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.model.request.GetBookingRequestModel;
import ndhu.tw.MaasService.service.MaasService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
@Tag(name = "接送者")
@Controller
@RequestMapping(value = "/driver")
public class AvailableBookings{

    private final MaasService maasService;

    public AvailableBookings(MaasService maasService) {
        this.maasService = maasService;
    }

    @Operation(summary = "2.1 查看可接訂單")
    @GetMapping(value = "/available-bookings", produces = "application/json")
    public @ResponseBody
    BaseModel getAvailableBookings() {
        // 使用 MaasService 中的方法來獲取可接單列表
        return maasService.getAvailableBookings();
    }


    @Operation(summary = "2.2 接送者接單")
    @PostMapping(value = "/getBooking", produces = "application/json")
    public @ResponseBody
    BaseModel getBooking(@RequestBody GetBookingRequestModel request) {
        return maasService.getBooking(request);
    }
}
