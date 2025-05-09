package com.pizzaria.backend.service;

import com.pizzaria.backend.model.OrderItem;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    public StripeService(@Value("${stripe.api.key}") String secretKey) {
    	System.out.println(secretKey);
        Stripe.apiKey = secretKey;
    }

    public String createCheckoutSession(List<OrderItem> orderItems) throws Exception {
        SessionCreateParams.LineItem.Builder lineItemBuilder = SessionCreateParams.LineItem.builder();

        for (OrderItem orderItem : orderItems) {
            lineItemBuilder.setQuantity((long)orderItem.getQuantity()) // Quantidade de cada prato
                    .setPriceData(
                            SessionCreateParams.LineItem.PriceData.builder()
                                    .setCurrency("brl")
                                    .setUnitAmount((long) (orderItem.getDish().getPrice() * 100)) // Preço em centavos
                                    .setProductData(
                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                    .setName(orderItem.getDish().getName()) // Nome do prato
                                                    .build())
                                    .build());
        }

        // Criação da sessão de pagamento com todos os pratos
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/success?id="+orderItems.get(0).getId())
                .setCancelUrl("http://localhost:3000/")
                .addLineItem(lineItemBuilder.build()) // Adiciona os itens na sessão
                .build();

        Session session = Session.create(params);
        return session.getId();
    }
    
}
