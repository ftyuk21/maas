package ndhu.tw.MaasService.controller;

import jakarta.websocket.CloseReason;
import jakarta.websocket.EndpointConfig;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import java.time.Instant;

import ndhu.tw.MaasService.SpringDocConfig.ChatManager;
import ndhu.tw.MaasService.utility.LogUtility;

import java.io.IOException;

@ServerEndpoint(value = "/customerChat")
public class CustomerChatController {

    private Session session;

    // 監聽客戶端訊息事件
    @OnMessage
    public void onMessage(String message) throws IOException {

        LogUtility.info(getClass(),String.format("[websocket][customer] 收到消息：id={%s}，message={%s}", this.session.getId(), message));

        if (message.equalsIgnoreCase("bye")) {
            // 伺服器主動關閉。狀態碼: NORMAL_CLOSURE（正常關閉）。
            this.session.close(new CloseReason(CloseReason.CloseCodes.NORMAL_CLOSURE, "Bye"));;
            return;
        }
        ChatManager.sendMessageToDriver(message + "   時間:" + Instant.now());
//        this.session.getAsyncRemote().sendText("["+ Instant.now().toEpochMilli() +"] " + message);
    }

    // 連線打開
    @OnOpen
    public void onOpen(Session session, EndpointConfig endpointConfig){
        // 保存session到對象
        this.session = session;
        ChatManager.addCustomerSession(session.getId(), session);
        LogUtility.info(getClass(),String.format("[websocket] 新的连接：id={%s}", this.session.getId()));
//        this.session.getAsyncRemote().sendText("以使用乘車者身份連接聊天室，連線時間:"+ Instant.now());
    }

    // 連線關閉
    @OnClose
    public void onClose(CloseReason closeReason){
        this.session.getAsyncRemote().sendText("連線中斷，中斷時間:"+ Instant.now());
        LogUtility.info(getClass(),String.format("[websocket] 連線斷開：id={%s}，reason={%s}", this.session.getId(),closeReason));
    }

    // 連線異常
    @OnError
    public void onError(Throwable throwable) throws IOException {
        this.session.getAsyncRemote().sendText("連線異常，中斷時間:"+ Instant.now());
        LogUtility.info(getClass(),String.format("[websocket] 連線異常：id={%s}，throwable={%s}", this.session.getId(),throwable.getMessage()));

        // 關閉連線。狀態碼: UNEXPECTED_CONDITION（異常）
        this.session.close(new CloseReason(CloseReason.CloseCodes.UNEXPECTED_CONDITION, throwable.getMessage()));
    }
}
