package ndhu.tw.MaasService.service;

import ndhu.tw.MaasService.model.request.BookingRequestModel;
import ndhu.tw.MaasService.model.response.BookingResponseModel;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class MaasService {

    public BookingResponseModel createBooking(BookingRequestModel request) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 7; i++) {
            sb.append(random.nextInt(10));
        }
        // 這裡會有實際的邏輯去處理訂單創建
        String orderNumber = "ORD"+sb; // 假設生成一個訂單編號
        String status = "等待接單"; // 設定狀態

        return new BookingResponseModel(orderNumber, status);
    }
}

