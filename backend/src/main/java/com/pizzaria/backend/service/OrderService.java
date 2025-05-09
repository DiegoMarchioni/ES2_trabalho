package com.pizzaria.backend.service;

import com.pizzaria.backend.model.Address;
import com.pizzaria.backend.model.Order;
import com.pizzaria.backend.model.User.User;
import com.pizzaria.backend.repository.AddressRepository;
import com.pizzaria.backend.repository.OrderRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;

    public OrderService(OrderRepository orderRepository, AddressRepository addressRepository) {
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
    }

    public Order save(Order order) {
        User user = getAuthenticatedUser();

        // ✅ Verifica se o usuário já tem uma Order em aberto (não paga)
        Optional<Order> existingUnpaidOrder = orderRepository.findByUserAndIsPaidFalse(user);
        if (existingUnpaidOrder.isPresent()) {
            throw new IllegalStateException("Você já possui um pedido em aberto (não pago). Finalize-o antes de criar outro.");
        }

        // ✅ Verifica se o endereço é do usuário
        Address address = addressRepository.findById(order.getDeliveryAddress().getId())
                .orElseThrow(() -> new IllegalArgumentException("Endereço de entrega não encontrado"));

        if (!address.getResident().getId().equals(user.getId())) {
            throw new AccessDeniedException("O endereço de entrega não pertence ao usuário autenticado");
        }

        order.setUser(user);
        order.setDeliveryAddress(address);
        order.getItems().forEach(item -> item.setOrder(order));
        return orderRepository.save(order);
    }


    public List<Order> getAllForAuthenticatedUser() {
        User user = getAuthenticatedUser();
        return orderRepository.findAllByUser(user);
    }
    public Order getForAuthenticatedUser() {
        User user = getAuthenticatedUser();
        return orderRepository.findByUserAndIsPaidFalse(user).orElseThrow();
    }
    public Optional<Order> getById(Long id) {
        User user = getAuthenticatedUser();
        Optional<Order> orderOpt = orderRepository.findById(id);
        if (orderOpt.isPresent() && !orderOpt.get().getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Você não tem acesso a este pedido");
        }
        return orderOpt;
    }

    private User getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof User user) {
            return user;
        }
        throw new IllegalStateException("Usuário autenticado não encontrado no contexto");
    }
}
