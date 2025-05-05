 package com.pizzaria.backend.model;

 import jakarta.persistence.*;
 import lombok.Getter;
 import lombok.Setter;

 @Getter
 @Setter
 @Entity
 @Table(name = "dishes")
 public class Dish {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;

     private String name;

     private String description;

     private Double price;

	 public Long getId() {
		 return id;
	 }

	 public String getName() {
		 return name;
	 }

	 public void setName(String name) {
		 this.name = name;
	 }

	 public String getDescription() {
		 return description;
	 }

	 public void setDescription(String description) {
		 this.description = description;
	 }

	 public Double getPrice() {
		 return price;
	 }

	 public void setPrice(Double price) {
		 this.price = price;
	 }




     

 }