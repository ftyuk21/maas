package ndhu.tw.MaasService.model.request;
import lombok.Data;

@Data
public class ArrivedRequestModel {
        private Long userId;
        private Long orderId;
        private int identity;
}
