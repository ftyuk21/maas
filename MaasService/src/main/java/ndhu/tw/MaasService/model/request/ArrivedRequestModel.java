package ndhu.tw.MaasService.model.request;

import lombok.Data;

import java.util.Date;
@Data
public class ArrivedRequestModel {
        private Long userId;
        private Long orderId;
        private int identity ;
}
