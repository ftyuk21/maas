package ndhu.tw.MaasService.controller;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.model.request.ArrivedRequestModel;
import ndhu.tw.MaasService.model.request.CommentRequestModel;
import ndhu.tw.MaasService.service.MaasService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Tag(name = "共用API")
@Controller
@RequestMapping(value = "/Cloud")
public class ApiCloudController {
    private final MaasService maasService;
    public ApiCloudController(MaasService maasService) {
        this.maasService = maasService;
    }
    @Operation(summary = "3.3 到達目的地")
    @PostMapping(value = "/arrived", produces = "application/json")
    public @ResponseBody
    BaseModel ApiCloud(@RequestBody ArrivedRequestModel request) {
        return maasService.ApiCloud(request);
    }

    @Operation(summary = "3.2 撰寫評論")
    @PostMapping(value = "/comment", produces = "application/json")
    public @ResponseBody
    BaseModel comment(@RequestBody CommentRequestModel request) {
        return maasService.comment(request);
    }

    @Operation(summary = "3.4 查看評價")
    @GetMapping(value = "/checkComment", produces = "application/json")
    public @ResponseBody
    BaseModel checkComment(Long userId, Long identity) {
        return maasService.checkComment(userId, identity);
    }
}
