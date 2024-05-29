package ndhu.tw.MaasService.auth;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String account;
    private String password;
}
