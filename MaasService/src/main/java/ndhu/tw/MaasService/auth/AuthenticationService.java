package ndhu.tw.MaasService.auth;

import ndhu.tw.MaasService.db.model.UserInfo;
import ndhu.tw.MaasService.db.repository.UserInfoRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserInfoRepository userInfoRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserInfoRepository userInfoRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userInfoRepository = userInfoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserInfo signup(RegisterUserDto input) {
        UserInfo user = new UserInfo();
        user.setUserName(input.getUserName());
        user.setAccount(input.getAccount());
        user.setPassword(passwordEncoder.encode(input.getPassword()));

        return userInfoRepository.save(user);
    }

    public UserInfo authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getAccount(),
                        input.getPassword()
                )
        );

        return userInfoRepository.findByAccount(input.getAccount())
                .orElseThrow();
    }
}
