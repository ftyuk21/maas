package ndhu.tw.MaasService.model.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class GetBookingRequestModel {
    @Schema(description = "司機Id")
    private Long driverID;

    @Schema(description = "訂單Id")
    private Long orderID;
}
