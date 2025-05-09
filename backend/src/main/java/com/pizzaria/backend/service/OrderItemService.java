package com.pizzaria.backend.service;

import com.pizzaria.backend.model.Address;
import com.pizzaria.backend.model.Order;
import com.pizzaria.backend.model.OrderItem;
import com.pizzaria.backend.model.User.User;
import com.pizzaria.backend.repository.AddressRepository;
import com.pizzaria.backend.repository.OrderItemRepository;
import com.pizzaria.backend.repository.OrderRepository;

import jakarta.transaction.Transactional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final OrderService orderService;
    private final AddressRepository addressRepository;

    public OrderItemService(OrderItemRepository orderItemRepository, OrderRepository orderRepository, OrderService orderService, AddressRepository addressRepository) {
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
        this.orderService = orderService;
        this.addressRepository = addressRepository;
    }
    
    @Transactional
    public OrderItem save(OrderItem item) throws Exception {
        User user = getAuthenticatedUser();
        
        List<Address> addresses = addressRepository.findAllByResident(user);
        System.out.println(user.getUsername());
        if(addresses.isEmpty())throw new Exception("Usuário sem enderecos");
        
        Order order = null;
        List<Order> orders = orderRepository.findAllByUser(user);
        for(Order ord: orders) {
        	if(ord.isPaid() == false)order = ord;
        }
        if(order == null)
        order = orderRepository.save(new Order(false, false, user, addresses.get(0)));
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
