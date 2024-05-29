package ndhu.tw.MaasService.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginUserDto {
    private String account;

    private String password;
}
