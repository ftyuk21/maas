package ndhu.tw.MaasService.model.request;

import lombok.Data;

@Data
public class PostModel {
    private Integer id;
    private String orderCode;
    private String name;
    // 這邊的東西就是你要要求呼叫API的人傳進來的參數
}
