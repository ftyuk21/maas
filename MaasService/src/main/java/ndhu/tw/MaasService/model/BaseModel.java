package ndhu.tw.MaasService.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BaseModel {
    private Boolean result = true;
    private Object data;
    private String code = "0000";
    private String message = "";
}
