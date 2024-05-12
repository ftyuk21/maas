package ndhu.tw.MaasService.model.response;

import lombok.Getter;
import lombok.Setter;

public interface PostResponseModel {
    // 假設我從資料庫拿到完整的資料  但我只想要回傳name跟orderCode回去
    public String name();
    public String orderCode();
}
