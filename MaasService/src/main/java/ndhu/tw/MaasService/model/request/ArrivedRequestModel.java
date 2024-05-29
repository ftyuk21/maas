package ndhu.tw.MaasService.model.request;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class ArrivedRequestModel {
        @Schema(description = "使用者ID")
        private Long userId;

        @Schema(description = "訂單ID")
        private Long orderId;

        @Schema(description = "身份")
        private int identity;
}
