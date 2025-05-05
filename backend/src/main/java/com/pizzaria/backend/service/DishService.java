package com.pizzaria.backend.service;

import com.pizzaria.backend.model.Dish;
import com.pizzaria.backend.repository.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DishService {

    @Autowired
    private DishRepository dishRepository;

    public List<Dish> findAll() {
        return dishRepository.findAll();
    }

    public Optional<Dish> findById(Long id) {
        return dishRepository.findById(id);
    }

    public Dish save(Dish dish) {
        return dishRepository.save(dish);
    }

    public Dish update(Long id, Dish updatedDish) {
        return dishRepository.findById(id).map(dish -> {
            dish.setName(updatedDish.getName());
            dish.setDescription(updatedDish.getDescription());
            dish.setPrice(updatedDish.getPrice());
            return dishRepository.save(dish);
        }).orElseThrow(() -> new RuntimeException("Dish not found"));
    }

    public void delete(Long id) {
        dishRepository.deleteById(id);
    }
}