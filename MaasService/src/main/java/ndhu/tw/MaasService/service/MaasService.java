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

    /*
    * 1.1 乘車者下單
    * */
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


    /*
    * 2.1 查看可接訂單
    * */
    public BaseModel getAvailableBookings() {
        Orders o= new Orders();
        o.setStatusCode(2L);
        Example<Orders> example=Example.of(o);
        List<Orders> ordersList = ordersRepository.findAll(example);
        BaseModel response=new BaseModel();
        response.setData(ordersList);
        return response;
    }



    /*
    * 2.2 接送者接單
    * */
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

    /*
    * 1.2 接送者查看訂單
    * */
    public BaseModel CheckOrder(Long customerId) {
        Orders o= new Orders();
        o.setCustomerId(customerId);
        Example<Orders> example=Example.of(o);
        List<Orders> ordersList = ordersRepository.findAll(example);
        BaseModel response=new BaseModel();
        response.setData(ordersList);
        return response;
    }

}


