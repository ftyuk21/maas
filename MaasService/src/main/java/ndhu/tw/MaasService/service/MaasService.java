package ndhu.tw.MaasService.service;

import ndhu.tw.MaasService.db.model.Order;
import ndhu.tw.MaasService.db.repository.OrderRepository;
import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.model.request.BookingRequestModel;
import ndhu.tw.MaasService.model.response.BookingResponseModel;
import org.springframework.stereotype.Service;
import ndhu.tw.MaasService.model.response.AvailableBookingsResponseModel;

import java.util.*;

@Service
public class MaasService {
    private final OrderRepository orderRepository;
    public MaasService(OrderRepository  orderRepository) {
        this.orderRepository = orderRepository;
    }
    public BaseModel createBooking(Order request) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 7; i++) {
            sb.append(random.nextInt(10));
        }
        String orderNumber = "ORD"+sb; // 假設生成一個訂單編號
        request.setOrderCode(orderNumber);
        orderRepository.save(request);
        Map<String, Object> order = new HashMap<>();
        order.put("orderNumber", orderNumber);
        order.put("status", "等待接單");

        BaseModel response=new BaseModel();
        response.setData(order);
        return response;
    }

    private List<AvailableBookingsResponseModel.BookingDetails> availableBookings;

    public void setAvailableBookings(List<AvailableBookingsResponseModel.BookingDetails> availableBookings) {
        this.availableBookings = availableBookings;
    }

    public AvailableBookingsResponseModel getAllAvailableBookings() {
        return new AvailableBookingsResponseModel(availableBookings);
    }

}


