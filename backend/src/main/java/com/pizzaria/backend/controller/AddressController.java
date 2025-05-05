package com.pizzaria.backend.controller;

import com.pizzaria.backend.model.Address;
import com.pizzaria.backend.service.AddressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addresses")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping
    public ResponseEntity<Address> create(@RequestBody Address address) {
        Address saved = addressService.save(address);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Address>> getAll() {
        List<Address> addresses = addressService.getAllForAuthenticatedUser();
        return ResponseEntity.ok(addresses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Address> getById(@PathVariable Long id) {
        return addressService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Address address) {
        addressService.delete(address);
        return ResponseEntity.noContent().build();
    }
}
