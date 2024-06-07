package ndhu.tw.MaasService.controller;

import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import ndhu.tw.MaasService.SpringDocConfig.ChatManager;
import ndhu.tw.MaasService.db.repository.OrdersRepository;
import ndhu.tw.MaasService.model.request.ArrivedRequestModel;
import ndhu.tw.MaasService.service.MaasService;
import ndhu.tw.MaasService.utility.LogUtility;

import java.io.IOException;
import java.time.Instant;

@ServerEndpoint(value = "/driverChat")
public class DriverChatController {

    private Session session;

    // 監聽客戶端訊息事件
    @OnMessage
    public void onMessage(String message) throws IOException {

        LogUtility.info(getClass(),String.format("[websocket][driver] 收到消息：id={%s}，message={%s}", this.session.getId(), message));

        if (message.contains("7Rm5nK9oPq")) {
            // 伺服器主動關閉。狀態碼: NORMAL_CLOSURE（正常關閉）。
            ChatManager.sendMessageToCustomer("[driver]" + message);
            this.session.close(new CloseReason(CloseReason.CloseCodes.NORMAL_CLOSURE, "結單"));
            return;
        }
        ChatManager.sendMessageToCustomer("[driver]" + message);
//        ChatManager.sendMessageToCustomer(message + "   時間:" + Instant.now());
//        this.session.getAsyncRemote().sendText("["+ Instant.now().toEpochMilli() +"] " + message);
    }

    // 連線打開
    @OnOpen
    public void onOpen(Session session, EndpointConfig endpointConfig){
        // 保存session到對象
        this.session = session;
        ChatManager.addDriverSession(session.getId(), session);
        LogUtility.info(getClass(),String.format("[websocket] 新的连接：id={%s}", this.session.getId()));
//        this.session.getAsyncRemote().sendText("以使用接送者身份連接聊天室，連線時間:"+ Instant.now());
    }

    // 連線關閉
    @OnClose
    public void onClose(CloseReason closeReason){
//        this.session.getAsyncRemote().sendText("連線中斷，中斷時間:"+ Instant.now());
//        LogUtility.info(getClass(),String.format("[websocket] 連線斷開：id={%s}，reason={%s}", this.session.getId(),closeReason));

        if (session != null && session.isOpen()) {
            try {
//                session.getAsyncRemote().sendText("連線中斷，中斷時間:" + Instant.now());
                LogUtility.error(getClass(), "連線中斷，中斷時間:" + Instant.now());
            } catch (Exception e) {
                // 發送訊息時發生了異常
                LogUtility.error(getClass(), "Error occurred while sending close message." + e);
            } finally {
                try {
                    session.close(); // 在 finally 块中關閉會話
                } catch (IOException e) {
                    LogUtility.error(getClass(), "Error occurred while closing session." + e);
                }
            }
        }
        LogUtility.info(getClass(), String.format("[websocket] 連線斷開：id={%s}，reason={%s}", session.getId(), closeReason));
    }

    // 連線異常
    @OnError
    public void onError(Throwable throwable) throws IOException {
//        this.session.getAsyncRemote().sendText("連線異常，中斷時間:"+ Instant.now());
        LogUtility.info(getClass(),String.format("[websocket] 連線異常：id={%s}，throwable={%s}", this.session.getId(),throwable.getMessage()));

        // 關閉連線。狀態碼: UNEXPECTED_CONDITION（異常）
        this.session.close(new CloseReason(CloseReason.CloseCodes.UNEXPECTED_CONDITION, throwable.getMessage()));
    }
}
