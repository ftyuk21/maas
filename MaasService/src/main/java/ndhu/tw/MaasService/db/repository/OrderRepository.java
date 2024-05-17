package ndhu.tw.MaasService.db.repository;

import ndhu.tw.MaasService.db.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface OrderRepository extends JpaRepository<Order, Void>, JpaSpecificationExecutor<Order> {

}