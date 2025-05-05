package com.pizzaria.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.pizzaria.backend.model.User.User;



public interface UserRepository extends JpaRepository<User, Long> {
    UserDetails findByLogin(String login);
}
