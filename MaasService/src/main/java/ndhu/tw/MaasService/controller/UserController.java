package ndhu.tw.MaasService.controller;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import ndhu.tw.MaasService.db.model.UserInfo;
import ndhu.tw.MaasService.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/users")
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<UserInfo> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserInfo currentUser = (UserInfo) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/")
    public ResponseEntity<List<UserInfo>> allUsers() {
        List <UserInfo> users = userService.allUsers();

        return ResponseEntity.ok(users);
    }
}
