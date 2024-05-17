package ndhu.tw.MaasService.service;

import org.springframework.data.domain.Example;
import ndhu.tw.MaasService.db.model.Orders;
import ndhu.tw.MaasService.db.repository.OrdersRepository;
import ndhu.tw.MaasService.model.BaseModel;
import ndhu.tw.MaasService.model.response.AvailableBookingsResponseModel;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class MaasService {
    private final OrdersRepository ordersRepository;
    public MaasService(OrdersRepository  ordersRepository) {
        this.ordersRepository = ordersRepository;
    }
    public BaseModel createBooking(Orders request) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 7; i++) {
            sb.append(random.nextInt(10));
        }
        String orderNumber = "ORD"+sb; // 假設生成一個訂單編號
        request.setOrderCode(orderNumber);
        ordersRepository.save(request);
//        ordersRepository.save(request);
        Map<String, Object> order = new HashMap<>();
        order.put("orderNumber", orderNumber);
        order.put("status", "等待接單");

        BaseModel response=new BaseModel();
        response.setData(order);
        return response;
    }

//    private List<AvailableBookingsResponseModel.BookingDetails> availableBookings;
//
//    public void setAvailableBookings(List<AvailableBookingsResponseModel.BookingDetails> availableBookings) {
//        this.availableBookings = availableBookings;
//    }

    public BaseModel getAllAvailableBookings() {
        Orders o= new Orders();
        o.setStatusCode(2L);
        Example<Orders> example=Example.of(o);
        List<Orders> ordersList = ordersRepository.findAll(example);
        BaseModel response=new BaseModel();
        response.setData(ordersList);
        return response;
    }

}


