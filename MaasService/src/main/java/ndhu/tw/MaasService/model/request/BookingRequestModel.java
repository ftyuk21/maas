package ndhu.tw.MaasService.model.request;

import lombok.Data;

import java.util.Date;

@Data
public class BookingRequestModel {
    private String phoneNumber;
    private String startLocation;
    private String destination;
    private Date pickupTime;
    private Integer priceRangeUp;
    private Integer priceRangeDown;
    private Integer userID;
}

