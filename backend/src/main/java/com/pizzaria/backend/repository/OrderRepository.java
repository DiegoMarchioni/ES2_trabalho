package com.pizzaria.backend.repository;

import com.pizzaria.backend.model.Order;
import com.pizzaria.backend.model.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByUser(User user);
    
    Optional<Order> findByUserAndIsPaidFalse(User user);
}
