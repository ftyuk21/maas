package ndhu.tw.MaasService.service;

import ndhu.tw.MaasService.db.model.UserInfo;
import ndhu.tw.MaasService.model.request.*;
import ndhu.tw.MaasService.model.response.CheckCommentResponse;
import org.aspectj.weaver.ast.Or;
import org.hibernate.annotations.Check;
import org.hibernate.query.Order;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Example;
import ndhu.tw.MaasService.db.model.Orders;
import ndhu.tw.MaasService.db.repository.OrdersRepository;
import ndhu.tw.MaasService.model.BaseModel;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MaasService {
    private final OrdersRepository ordersRepository;
    public MaasService(OrdersRepository  ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    /*
    * 1.1 乘車者下單
    * */
    public BaseModel createBooking(BookingRequestModel request) {
        BaseModel res = new BaseModel();
        Orders ord = new Orders();

        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 7; i++) {
            sb.append(random.nextInt(10));
        }
        String orderNumber = "ORD"+sb; // 假設生成一個訂單編號

        ord.setOrderCode(orderNumber);
        ord.setStatusCode(2L);

        ord.setPickupTime(request.getPickupTime());
        ord.setDestination(request.getDestination());
        ord.setStartLocation(request.getStartLocation());
        ord.setPriceRangeUp(Long.valueOf(request.getPriceRangeUp()));
        ord.setPriceRangeDown(Long.valueOf(request.getPriceRangeDown()));
        ord.setCustomerId(Long.valueOf(request.getUserID()));

        ordersRepository.save(ord);
        Map<String, Object> order = new HashMap<>();
        order.put("orderNumber", orderNumber);
        order.put("status", "等待接單");

        res.setData(order);
        return res;
    }


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
            o.setOrderId(request.getOrderId());
            Example<Orders> example=Example.of(o);
            Orders findOrder = ordersRepository.findAll(example).get(0);
            findOrder.setStatusCode(1L);
            findOrder.setDriverId(request.getUserId());
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
    public BaseModel CheckOrder(Long userId) {
        BaseModel res = new BaseModel();

        Orders customerOder = new Orders();
        customerOder.setCustomerId(userId);
        Example<Orders> example=Example.of(customerOder);
        List<Orders> customerOrdersList = ordersRepository.findAll(example);

        Orders driverOder = new Orders();
        driverOder.setDriverId(userId);
        Example<Orders> example2 = Example.of(driverOder);
        List<Orders> driverOrdersList = ordersRepository.findAll(example2);

        HashMap resData = new HashMap();
        resData.put("customer", customerOrdersList);
        resData.put("driver", driverOrdersList);

        res.setData(resData);

        return res;
    }

    /*
     * 1.2 接送者查看訂單
     * */
    public BaseModel getOrder(Long id) {
        BaseModel res = new BaseModel();

        Orders o  = new Orders();
        o.setOrderId(id);
        Example<Orders> example = Example.of(o);
        Orders resData = ordersRepository.findAll(example).get(0);

        res.setData(resData);

        return res;
    }

    /*
     * 3.3 到達目的地
     * */
    public BaseModel ApiCloud(ArrivedRequestModel request) {
        BaseModel response=new BaseModel();
        try{
            Orders o= new Orders();
            o.setOrderId(request.getOrderId());
            Example<Orders> example=Example.of(o);
            Orders findOrder = ordersRepository.findAll(example).get(0);
            if(request.getIdentity()==2)
            {
                findOrder.setStatusCode(3L);
                ordersRepository.save(findOrder);
                response.setData("成功");
            }
            else if(request.getIdentity()==1&&findOrder.getStatusCode()==3)
            {
                findOrder.setStatusCode(99L);
                ordersRepository.save(findOrder);
                response.setData("成功");
            }
        }catch(DataAccessException e){
            response.setMessage(e.getMessage().toString());
            response.setCode("9999");
        }
        return response;
    }

    /*
     * 3.2 撰寫評價
     * */
    public BaseModel comment(CommentRequestModel request) {
        BaseModel response = new BaseModel();
        Optional<Orders> findOrderOpt = ordersRepository.findById(request.getOrderId());
        if (!findOrderOpt.isPresent()) {
            response.setData("訂單不存在");
            return response;
        }
        Orders findOrder = findOrderOpt.get();
        // 根據身份設置評論和星等
        if (request.getIdentity() == 1) { // 乘車者
            findOrder.setDrivercomment(request.getComment());
            findOrder.setDriverstar(Long.valueOf(request.getStar()));
        } else if (request.getIdentity() == 2) { // 接送者
            findOrder.setCustomercomment(request.getComment());
            findOrder.setCustomerstar(Long.valueOf(request.getStar()));
        } else {
            response.setData("身份無效");
            return response;
        }
        ordersRepository.save(findOrder);
        response.setData("成功");
        return response;
    }

    /*
     * 3.4 撰寫評價
     * */
    public BaseModel checkComment(Long userId, Long identity) {
        BaseModel response = new BaseModel();
        Orders o = new Orders();
        if(identity == 1){ // 乘客
            o.setCustomerId(userId);
        } else if (identity == 2) { // 司機
            o.setDriverId(userId);
        }else {
            response.setData("狀態異常");
            return response;
        }
        o.setStatusCode(99L);
        Example<Orders> example = Example.of(o);
        List<Orders> findOrder = ordersRepository.findAll(example);
        response.setData(findOrder);
        return response;
    }


    public BaseModel changeOrderStatusCode(Orders request) {
        BaseModel response = new BaseModel();
        Orders orders = ordersRepository.save(request);
        response.setData(orders);
        return response;
    }

    public BaseModel getOrderAgreeList(Long userId){
        BaseModel res = new BaseModel();
        Orders o = new Orders();
        o.setCustomerId(userId);
        o.setStatusCode(12L);
        Example<Orders> example = Example.of(o);
        List<Orders> resData = ordersRepository.findAll(example);
        res.setData(resData);
        return res;
    }

    public BaseModel getOrderAgreeListCount(Long userId){
        BaseModel res = new BaseModel();
        Orders o = new Orders();
        o.setCustomerId(userId);
        o.setStatusCode(12L);
        Example<Orders> example = Example.of(o);
        List<Orders> resData = ordersRepository.findAll(example);
        res.setData(resData.size());
        return res;
    }
}


