package ndhu.tw.MaasService.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import ndhu.tw.MaasService.db.model.Order;
import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.model.request.BookingRequestModel;
import ndhu.tw.MaasService.model.response.BookingResponseModel;
import ndhu.tw.MaasService.service.MaasService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Passenger Booking Controller")
@Controller
@RequestMapping(value = "/passenger")
public class BookingController {

    private final MaasService maasService;

    public BookingController(MaasService maasService) {
        this.maasService = maasService;
    }

    @Operation(summary = "Create Booking API")
    @PostMapping(value = "/bookings", produces = "application/json")
    public @ResponseBody
    BaseModel createBooking(@RequestBody Order request) {
        return maasService.createBooking(request);
    }
}

