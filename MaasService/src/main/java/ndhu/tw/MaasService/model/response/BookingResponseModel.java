package ndhu.tw.MaasService.model.response;

public class BookingResponseModel {
    private String orderNumber;
    private String status;

    public BookingResponseModel(String orderNumber, String status) {
        this.orderNumber = orderNumber;
        this.status = status;
    }

    // Getters and Setters
    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

