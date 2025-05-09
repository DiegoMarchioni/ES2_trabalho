package com.pizzaria.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pizzaria.backend.model.OrderItem;
import com.pizzaria.backend.service.StripeService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/create-checkout-session")
public class StripeController {

    @Autowired
    private StripeService stripeService;

    @PostMapping
    public ResponseEntity createCheckoutSession(@RequestBody List<OrderItem> orderItems) throws Exception {
        String sessionId = stripeService.createCheckoutSession(orderItems);
        return ResponseEntity.ok(Map.of("id", sessionId));
    }
}
