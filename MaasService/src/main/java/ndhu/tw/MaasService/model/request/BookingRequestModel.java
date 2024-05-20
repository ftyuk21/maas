package ndhu.tw.MaasService.model.request;

import lombok.Data;

import java.util.Date;

@Data
public class BookingRequestModel {
    private String phoneNumber;
    private String startLocation;
    private String destination;
    private Date pickupTime;
    private Integer priceRangeUp;
    private Integer priceRangeDown;
    private Integer userID;


//    Getters and Setters
//    public String getPhoneNumber() {
//        return phoneNumber;
//    }
//
//    public void setPhoneNumber(String phoneNumber) {
//        this.phoneNumber = phoneNumber;
//    }
//
//    public String getStartLocation() {
//        return startLocation;
//    }
//
//    public void setStartLocation(String startLocation) {
//        this.startLocation = startLocation;
//    }
//
//    public String getDestination() {
//        return destination;
//    }
//
//    public void setDestination(String destination) {
//        this.destination = destination;
//    }
//
//    public String getPickupTime() {
//        return pickupTime;
//    }
//
//    public void setPickupTime(String pickupTime) {
//        this.pickupTime = pickupTime;
//    }
//
//    public String getPriceRange() {
//        return priceRange;
//    }
//
//    public void setPriceRange(String priceRange) {
//        this.priceRange = priceRange;
//    }
}

