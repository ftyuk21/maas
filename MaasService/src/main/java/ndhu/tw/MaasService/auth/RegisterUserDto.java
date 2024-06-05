package ndhu.tw.MaasService.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {
    private String account;

    private String password;

    private String userName;
}
