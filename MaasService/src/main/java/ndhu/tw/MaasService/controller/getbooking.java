package ndhu.tw.MaasService.controller;

import io.swagger.v3.oas.annotations.Operation;
import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.model.request.GetBookingRequestModel;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

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
