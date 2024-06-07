package ndhu.tw.MaasService.model.request;

import lombok.Data;

@Data
public class ChangeOrderStatusCodeRequest {
    private Long orderId;
    private Long changeStatus;
}
