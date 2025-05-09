package com.pizzaria.backend.controller;

import com.pizzaria.backend.model.Order;
import com.pizzaria.backend.model.OrderItem;
import com.pizzaria.backend.repository.OrderItemRepository;
import com.pizzaria.backend.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;
    private final OrderItemRepository orderItemRepository;
    
    public OrderController(OrderService orderService, OrderItemRepository orderItemRepository) {
        this.orderService = orderService;
        this.orderItemRepository = orderItemRepository;
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            Order saved = orderService.save(order);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage()); // ⬅️ Pedido em aberto
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<List<OrderItem>> getOrder() {
    	Order order = orderService.getForAuthenticatedUser();
        return ResponseEntity.ok(orderItemRepository.findAllByOrder(order));
    }
    
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllForAuthenticatedUser());
    }

    @GetMapping("/confirmPay/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        try {
            Order order =orderService.getById(id).orElseThrow();
            order.setPaid(true);
            orderService.update(order);
            return ResponseEntity.ok("Success in payment");
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
}
