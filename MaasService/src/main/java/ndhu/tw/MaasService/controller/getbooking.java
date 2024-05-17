package ndhu.tw.MaasService.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.model.request.GetBookingRequestModel;
import ndhu.tw.MaasService.service.MaasService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Tag(name = "Get Booking Controller")
@Controller
@RequestMapping(value = "/driver")
public class getbooking {
    private final MaasService maasService;
    public getbooking(MaasService maasService) {
        this.maasService = maasService;
    }
    @Operation(summary = "接單")
    @PostMapping(value = "/getBooking", produces = "application/json")
    public @ResponseBody
    BaseModel getBooking(@RequestBody GetBookingRequestModel request) {
        return maasService.getBooking(request);
    }
}
