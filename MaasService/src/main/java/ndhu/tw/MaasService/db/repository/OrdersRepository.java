package ndhu.tw.MaasService.db.repository;

import ndhu.tw.MaasService.db.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface OrdersRepository extends JpaRepository<Orders, Void>, JpaSpecificationExecutor<Orders> {

}