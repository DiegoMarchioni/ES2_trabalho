package com.pizzaria.backend.repository;

import com.pizzaria.backend.model.Order;
import com.pizzaria.backend.model.OrderItem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
	List<OrderItem> findAllByOrder(Order Order);
}
