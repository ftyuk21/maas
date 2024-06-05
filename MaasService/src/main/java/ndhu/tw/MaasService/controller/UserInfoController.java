package ndhu.tw.MaasService.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import ndhu.tw.MaasService.db.model.UserInfo;
import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.service.MaasService;
import ndhu.tw.MaasService.service.UserInfoService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/userInfo")
public class UserInfoController {

    private final UserInfoService userInfoService;
    public UserInfoController(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
    }

    @GetMapping(value = "/getUserInfo", produces = "application/json")
    @SecurityRequirement(name = "Bearer")
    public @ResponseBody
    BaseModel CheckOrder() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserInfo currentUser = (UserInfo) authentication.getPrincipal();
        BaseModel res = new BaseModel();
        res.setData(currentUser);
        return res;
    }
}
