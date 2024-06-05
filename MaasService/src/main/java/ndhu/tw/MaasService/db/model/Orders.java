package ndhu.tw.MaasService.db.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

/**
 * $table.getTableComment()
 */
@Getter
@Setter
@Data
@Entity
@Table(name = "orders")
public class Orders implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "order_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(name = "pickup_time", nullable = false)
    private Date pickupTime;

    @Column(name = "destination", nullable = false)
    private String destination;

    @Column(name = "start_location", nullable = false)
    private String startLocation;

    @Column(name = "price_range_up", nullable = false)
    private Long priceRangeUp;

    @Column(name = "price_range_down", nullable = false)
    private Long priceRangeDown;

    @Column(name = "driver_id")
    private Long driverId;

    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @Column(name = "order_code", nullable = false)
    private String orderCode;

    @Column(name = "status_code", nullable = false)
    private Long statusCode;
    /**
     * 乘客對司機評論
     */
    @Column(name = "drivercomment")
    private String drivercomment;
    /**
     * 司機對乘客評論
     */
    @Column(name = "customercomment")
    private String customercomment;
    /**
     * 乘客對司機星等
     */
    @Column(name = "driverstar")
    private Long driverstar;
    /**
     * 司機對乘客星等
     */
    @Column(name = "customerstar")
    private Long customerstar;

}
