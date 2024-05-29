package ndhu.tw.MaasService.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginResponse {

    private String token;
    private String type = "Bearer";
    private Long id;
    private String account;
    private Integer role;
    private Integer isVIP;
    private Integer firstLogin;
    private String name;
}
