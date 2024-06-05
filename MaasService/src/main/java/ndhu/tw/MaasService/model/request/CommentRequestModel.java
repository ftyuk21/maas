package ndhu.tw.MaasService.model.request;
import lombok.Data;

@Data
public class CommentRequestModel {
    private Long orderId;
//    private Long driverId;
//    private Long customerId;
    private Long userId;
    private String comment;
    private int star;
    private int identity;
}
