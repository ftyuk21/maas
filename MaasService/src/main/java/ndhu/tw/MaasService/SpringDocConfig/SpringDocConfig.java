package ndhu.tw.MaasService.SpringDocConfig;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
	info = @Info(
		title = "MaasService",
		version = "1.0.0",
<<<<<<< HEAD
		description = "流程: 1.1 -> 2.1 -> 2.2 -> 1.2 -> 3.3"
=======
		description = "流程: 1.1 -> 2.1 -> 2.2 -> 1.2 -> 接送者3.3  -> 乘車者3.3  -> 結單"
>>>>>>> 6c32257f99586f8200b205f7bdf408b43b96be07
	),
	servers = {
  	@Server(url = "${server.swagger.url}", description = "Default Server URL")
	}
)
@SecurityScheme(
	name = "Bearer Authentication",
	type = SecuritySchemeType.HTTP,
	bearerFormat = "JWT",
	scheme = "bearer",
	in = SecuritySchemeIn.HEADER
)
@Configuration
public class SpringDocConfig {
}
