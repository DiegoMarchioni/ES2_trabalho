package com.pizzaria.backend.model.User;

public record RegisterDTO(String login, String password, UserRole role) {
    
}
