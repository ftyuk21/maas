package ndhu.tw.MaasService.SpringDocConfig;
import jakarta.websocket.*;
import ndhu.tw.MaasService.controller.CustomerChatController;
import ndhu.tw.MaasService.controller.DriverChatController;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
public class ChatManager {

    private static Map<String, Session> customerSessions = new ConcurrentHashMap<>();
    private static Map<String, Session> driverSessions = new ConcurrentHashMap<>();

    public static void addCustomerSession(String sessionId, Session session) {
        customerSessions.put(sessionId, session);
    }

    public static void addDriverSession(String sessionId, Session session) {
        driverSessions.put(sessionId, session);
    }

    public static void removeCustomerSession(String sessionId) {
        customerSessions.remove(sessionId);
    }

    public static void removeDriverSession(String sessionId) {
        driverSessions.remove(sessionId);
    }

    public static void sendMessageToCustomer(String message) {
//        for (Session session : customerSessions.values()) {
//            session.getAsyncRemote().sendText(message);
//        }

        if (message != null && !message.isEmpty()) { // 空值檢查
            synchronized (customerSessions) { // 使用 synchronized 同步
                for (Session session : customerSessions.values()) {
                    if (session != null && session.isOpen()) {
                        session.getAsyncRemote().sendText(message);
                    }
                }
            }
        }
    }

    public static void sendMessageToDriver(String message) {
        if (message != null && !message.isEmpty()) { // 空值檢查
            synchronized (driverSessions) { // 使用 synchronized 同步
                for (Session session : driverSessions.values()) {
                    if (session != null && session.isOpen()) {
                        session.getAsyncRemote().sendText(message);
                    }
                }
            }
        }
    }
}