package ndhu.tw.MaasService.model.request;


import lombok.Data;

@Data
public class CheckOrderRequestModel {
    private Long customerID;
    private Long statusCode;
    private Long orderID;
}