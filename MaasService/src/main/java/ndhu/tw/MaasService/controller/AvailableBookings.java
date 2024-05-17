package ndhu.tw.MaasService.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.model.response.AvailableBookingsResponseModel;
import ndhu.tw.MaasService.service.MaasService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Tag(name = "Driver Booking Controller")
@Controller
@RequestMapping(value = "/driver")
public class AvailableBookings{

    private final MaasService maasService;

    public AvailableBookings(MaasService maasService) {
        this.maasService = maasService;
    }

    @Operation(summary = "Get Available Bookings API")
    @GetMapping(value = "/available-bookings", produces = "application/json")
    public @ResponseBody
    BaseModel getAvailableBookings() {
        // 使用 MaasService 中的方法來獲取可接單列表
        return maasService.getAllAvailableBookings();
    }
}
