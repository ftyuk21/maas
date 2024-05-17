package ndhu.tw.MaasService.model.request;

import lombok.Data;

@Data
public class GetBookingRequestModel {
    private Long userID;
    private Long statusCode;
    private Long orderID;
}
