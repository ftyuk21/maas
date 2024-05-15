package ndhu.tw.MaasService.service;

import ndhu.tw.MaasService.model.request.BookingRequestModel;
import ndhu.tw.MaasService.model.response.BookingResponseModel;
import org.springframework.stereotype.Service;

@Service
public class MaasService {

    public BookingResponseModel createBooking(BookingRequestModel request) {
        // 這裡會有實際的邏輯去處理訂單創建
        String orderNumber = "ORD123456"; // 假設生成一個訂單編號
        String status = "等待接單"; // 設定狀態

        return new BookingResponseModel(orderNumber, status);
    }
}

