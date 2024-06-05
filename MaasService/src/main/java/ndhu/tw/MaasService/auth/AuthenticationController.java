package ndhu.tw.MaasService.auth;
import ndhu.tw.MaasService.db.model.UserInfo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserInfo> register(@RequestBody RegisterUserDto registerUserDto) {
        UserInfo registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        UserInfo authenticatedUser = authenticationService.authenticate(loginUserDto);

        LoginResponse loginResponse = new LoginResponse();
        if (authenticatedUser == null) {
            loginResponse.setCode("9999");
        }else {
            String jwtToken = jwtService.generateToken(authenticatedUser);
            loginResponse.setToken(jwtToken);
            loginResponse.setExpiresIn(jwtService.getExpirationTime());
            loginResponse.setCode("0000");
        }

        return ResponseEntity.ok(loginResponse);
    }
}
