package ndhu.tw.MaasService.model.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class GetBookingRequestModel {
    @Schema(description = "使用者Id")
    private Long userId;

    @Schema(description = "訂單Id")
    private Long orderId;
}
