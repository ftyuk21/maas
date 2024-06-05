package ndhu.tw.MaasService.model.request;

import lombok.Data;

@Data
public class GetBookingRequestModel {
    private Long driverID;
    private Long orderID;
}
