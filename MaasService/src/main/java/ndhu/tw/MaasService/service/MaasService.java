package ndhu.tw.MaasService.service;

import ndhu.tw.MaasService.model.request.CheckOrderRequestModel;
import ndhu.tw.MaasService.model.request.GetBookingRequestModel;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Example;
import ndhu.tw.MaasService.db.model.Orders;
import ndhu.tw.MaasService.db.repository.OrdersRepository;
import ndhu.tw.MaasService.model.BaseModel;
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

    public BaseModel AvailableBookingRequestModel() {
        Orders o= new Orders();
        o.setStatusCode(2L);
        Example<Orders> example=Example.of(o);
        List<Orders> ordersList = ordersRepository.findAll(example);
        BaseModel response=new BaseModel();
        response.setData(ordersList);
        return response;
    }



    public BaseModel getBooking(GetBookingRequestModel request) {
        BaseModel response=new BaseModel();
        try{
            Orders o= new Orders();
            o.setOrderId(request.getOrderID());
            Example<Orders> example=Example.of(o);
            Orders findOrder = ordersRepository.findAll(example).get(0);
            findOrder.setStatusCode(1L);
            findOrder.setDriverId(request.getUserID());
            ordersRepository.save(findOrder);
            response.setData("成功");
        }catch(DataAccessException e){
            response.setMessage(e.getMessage().toString());
            response.setCode("9999");
        }

        return response;
    }

    public BaseModel CheckOrder(CheckOrderRequestModel request) {
        Orders o= new Orders();
        o.setStatusCode(1L);
//        o.setCustomerId();
        Example<Orders> example=Example.of(o);
        List<Orders> ordersList = ordersRepository.findAll(example);
        BaseModel response=new BaseModel();
        response.setData(ordersList);
        return response;
    }
}


