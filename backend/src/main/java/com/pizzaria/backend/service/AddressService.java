package com.pizzaria.backend.service;

import com.pizzaria.backend.model.Address;
import com.pizzaria.backend.model.User.User;
import com.pizzaria.backend.repository.AddressRepository;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Address save(Address address) {
        User user = getAuthenticatedUser();
        address.setResident(user);
        return addressRepository.save(address);
    }

    public List<Address> getAllForAuthenticatedUser() {
        User user = getAuthenticatedUser();
        return addressRepository.findAllByResident(user);
    }

    public Optional<Address> getById(Long id) {
        return addressRepository.findById(id);
    }

    @PreAuthorize("#address.resident.id == authentication.principal.id")
    public void delete(Address address) {
        addressRepository.delete(address);
    }

    private User getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof User user) {
            return user;
        }
        throw new IllegalStateException("Authenticated principal is not a User instance");
    }
}
