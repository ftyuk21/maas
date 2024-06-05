package ndhu.tw.MaasService.SpringDocConfig;

import ndhu.tw.MaasService.controller.CustomerChatController;
import ndhu.tw.MaasService.controller.DriverChatController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

@Configuration
public class WebSocketConfiguration {

    @Bean
    public ServerEndpointExporter customerChatEndpointExporter() {
        ServerEndpointExporter exporter = new ServerEndpointExporter();
        exporter.setAnnotatedEndpointClasses(CustomerChatController.class);
        return exporter;
    }

    @Bean
    public ServerEndpointExporter driverChatEndpointExporter() {
        ServerEndpointExporter exporter = new ServerEndpointExporter();
        exporter.setAnnotatedEndpointClasses(DriverChatController.class);
        return exporter;
    }
}
