package ndhu.tw.MaasService.model.response;

import java.util.List;

public class AvailableBookingsResponseModel {
    private List<BookingDetails> bookings;

    public AvailableBookingsResponseModel(List<BookingDetails> bookings) {
        this.bookings = bookings;
    }

    public List<BookingDetails> getBookings() {
        return bookings;
    }

    public void setBookings(List<BookingDetails> bookings) {
        this.bookings = bookings;
    }

    public static class BookingDetails {
        private String bookingId;
        private String startLocation;
        private String destination;
        private String pickupTime;
        private Integer priceRangeUp;
        private Integer priceRangeDown;

        public BookingDetails(String bookingId, String startLocation, String destination, String pickupTime, Integer priceRangeUp, Integer priceRangeDown) {
            this.bookingId = bookingId;
            this.startLocation = startLocation;
            this.destination = destination;
            this.pickupTime = pickupTime;
            this.priceRangeUp = priceRangeUp;
            this.priceRangeDown = priceRangeDown;
        }

        // Getters and setters for all properties
    }
}

