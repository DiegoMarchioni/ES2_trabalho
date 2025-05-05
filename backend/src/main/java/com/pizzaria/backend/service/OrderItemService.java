package com.pizzaria.backend.service;

import com.pizzaria.backend.model.Order;
import com.pizzaria.backend.model.OrderItem;
import com.pizzaria.backend.model.User.User;
import com.pizzaria.backend.repository.OrderItemRepository;
import com.pizzaria.backend.repository.OrderRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;

    public OrderItemService(OrderItemRepository orderItemRepository, OrderRepository orderRepository) {
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
    }

    public OrderItem save(OrderItem item) {
        User user = getAuthenticatedUser();

        Order order = orderRepository.findByUserAndIsPaidFalse(user)
                .orElseThrow(() -> new IllegalStateException("Usuário não possui um pedido em aberto"));

        item.setOrder(order);
        return orderItemRepository.save(item);
    }

    public List<OrderItem> findAll() {
        return orderItemRepository.findAll();
    }

    public Optional<OrderItem> findById(Long id) {
        return orderItemRepository.findById(id);
    }

    public void delete(Long id) {
        orderItemRepository.deleteById(id);
    }

    private User getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof User user) {
            return user;
        }
        throw new IllegalStateException("Usuário autenticado não encontrado");
    }
}
