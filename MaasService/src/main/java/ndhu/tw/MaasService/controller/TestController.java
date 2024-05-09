package ndhu.tw.MaasService.controller;

import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.service.TestService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "測試Controller")
@Controller
@RequestMapping(value = "/test")
public class TestController {

    private TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @Operation(summary = "hello API")
    @GetMapping(value = "/hello", produces = "application/json")
    public @ResponseBody
    BaseModel hello() {
        return testService.hello();
    }
}
